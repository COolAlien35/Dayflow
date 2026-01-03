"""Add advanced features schema

Revision ID: 002
Revises: 001
Create Date: 2026-01-03

"""
from alembic import op
import sqlalchemy as sa
# from sqlalchemy.dialects.postgresql import JSONB


# revision identifiers, used by Alembic.
revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add deleted_at column to existing tables
    op.add_column('users', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_users_deleted_at'), 'users', ['deleted_at'], unique=False)
    
    op.add_column('profiles', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_profiles_deleted_at'), 'profiles', ['deleted_at'], unique=False)
    
    op.add_column('attendance', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_attendance_deleted_at'), 'attendance', ['deleted_at'], unique=False)
    
    op.add_column('leave_requests', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_leave_requests_deleted_at'), 'leave_requests', ['deleted_at'], unique=False)
    
    op.add_column('payroll', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index(op.f('ix_payroll_deleted_at'), 'payroll', ['deleted_at'], unique=False)

    # Create salary_history table
    op.create_table(
        'salary_history',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('basic_salary', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('hra', sa.DECIMAL(precision=10, scale=2), nullable=True),
        sa.Column('transport_allowance', sa.DECIMAL(precision=10, scale=2), nullable=True),
        sa.Column('medical_allowance', sa.DECIMAL(precision=10, scale=2), nullable=True),
        sa.Column('tax_deduction', sa.DECIMAL(precision=10, scale=2), nullable=True),
        sa.Column('insurance_deduction', sa.DECIMAL(precision=10, scale=2), nullable=True),
        sa.Column('effective_date', sa.Date(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('created_by', sa.Integer(), nullable=True),
        sa.CheckConstraint('basic_salary >= 0', name='check_salary_history_basic_positive'),
        sa.CheckConstraint('hra >= 0', name='check_salary_history_hra_positive'),
        sa.CheckConstraint('transport_allowance >= 0', name='check_salary_history_transport_positive'),
        sa.CheckConstraint('medical_allowance >= 0', name='check_salary_history_medical_positive'),
        sa.CheckConstraint('tax_deduction >= 0', name='check_salary_history_tax_positive'),
        sa.CheckConstraint('insurance_deduction >= 0', name='check_salary_history_insurance_positive'),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'effective_date', name='unique_user_effective_date')
    )
    op.create_index(op.f('ix_salary_history_id'), 'salary_history', ['id'], unique=False)
    op.create_index(op.f('ix_salary_history_user_id'), 'salary_history', ['user_id'], unique=False)
    op.create_index('idx_salary_history_effective_date', 'salary_history', ['user_id', 'effective_date'], unique=False)

    # Create payslips table
    op.create_table(
        'payslips',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('month', sa.Integer(), nullable=False),
        sa.Column('year', sa.Integer(), nullable=False),
        sa.Column('basic_salary', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('total_allowances', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('total_deductions', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('tax_amount', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('net_pay', sa.DECIMAL(precision=10, scale=2), nullable=False),
        sa.Column('generated_at', sa.DateTime(), nullable=True),
        sa.Column('generated_by', sa.Integer(), nullable=True),
        sa.CheckConstraint('month BETWEEN 1 AND 12', name='check_month_range'),
        sa.CheckConstraint('year >= 2020', name='check_year_range'),
        sa.ForeignKeyConstraint(['generated_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'month', 'year', name='unique_user_month_year')
    )
    op.create_index(op.f('ix_payslips_id'), 'payslips', ['id'], unique=False)
    op.create_index(op.f('ix_payslips_user_id'), 'payslips', ['user_id'], unique=False)
    op.create_index('idx_payslips_period', 'payslips', ['year', 'month'], unique=False)

    # Create tax_config table
    op.create_table(
        'tax_config',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('config_type', sa.String(length=20), nullable=False),
        sa.Column('flat_rate', sa.DECIMAL(precision=5, scale=2), nullable=True),
        sa.Column('brackets', sa.JSON, nullable=True),
        sa.Column('effective_date', sa.Date(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.CheckConstraint("config_type IN ('flat_rate', 'progressive')", name='check_config_type'),
        sa.CheckConstraint('flat_rate IS NULL OR (flat_rate >= 0 AND flat_rate <= 100)', name='check_flat_rate_range'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tax_config_id'), 'tax_config', ['id'], unique=False)
    op.create_index('idx_tax_config_effective_date', 'tax_config', ['effective_date'], unique=False)

    # Create notifications table
    op.create_table(
        'notifications',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('notification_type', sa.String(length=50), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('related_entity_type', sa.String(length=50), nullable=True),
        sa.Column('related_entity_id', sa.Integer(), nullable=True),
        sa.Column('is_read', sa.Boolean(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_notifications_id'), 'notifications', ['id'], unique=False)
    op.create_index(op.f('ix_notifications_user_id'), 'notifications', ['user_id'], unique=False)
    op.create_index(op.f('ix_notifications_is_read'), 'notifications', ['is_read'], unique=False)
    op.create_index('idx_notifications_unread', 'notifications', ['user_id', 'is_read'], unique=False)

    # Create role_change_log table
    op.create_table(
        'role_change_log',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('old_role', sa.String(length=20), nullable=False),
        sa.Column('new_role', sa.String(length=20), nullable=False),
        sa.Column('changed_by', sa.Integer(), nullable=False),
        sa.Column('changed_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['changed_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_role_change_log_id'), 'role_change_log', ['id'], unique=False)
    op.create_index(op.f('ix_role_change_log_user_id'), 'role_change_log', ['user_id'], unique=False)

    # Create feature_flags table
    op.create_table(
        'feature_flags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('feature_name', sa.String(length=50), nullable=False),
        sa.Column('enabled', sa.Boolean(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('feature_name')
    )
    op.create_index(op.f('ix_feature_flags_id'), 'feature_flags', ['id'], unique=False)


def downgrade() -> None:
    # Drop new tables
    op.drop_index(op.f('ix_feature_flags_id'), table_name='feature_flags')
    op.drop_table('feature_flags')
    
    op.drop_index(op.f('ix_role_change_log_user_id'), table_name='role_change_log')
    op.drop_index(op.f('ix_role_change_log_id'), table_name='role_change_log')
    op.drop_table('role_change_log')
    
    op.drop_index('idx_notifications_unread', table_name='notifications')
    op.drop_index(op.f('ix_notifications_is_read'), table_name='notifications')
    op.drop_index(op.f('ix_notifications_user_id'), table_name='notifications')
    op.drop_index(op.f('ix_notifications_id'), table_name='notifications')
    op.drop_table('notifications')
    
    op.drop_index('idx_tax_config_effective_date', table_name='tax_config')
    op.drop_index(op.f('ix_tax_config_id'), table_name='tax_config')
    op.drop_table('tax_config')
    
    op.drop_index('idx_payslips_period', table_name='payslips')
    op.drop_index(op.f('ix_payslips_user_id'), table_name='payslips')
    op.drop_index(op.f('ix_payslips_id'), table_name='payslips')
    op.drop_table('payslips')
    
    op.drop_index('idx_salary_history_effective_date', table_name='salary_history')
    op.drop_index(op.f('ix_salary_history_user_id'), table_name='salary_history')
    op.drop_index(op.f('ix_salary_history_id'), table_name='salary_history')
    op.drop_table('salary_history')
    
    # Remove deleted_at columns from existing tables
    op.drop_index(op.f('ix_payroll_deleted_at'), table_name='payroll')
    op.drop_column('payroll', 'deleted_at')
    
    op.drop_index(op.f('ix_leave_requests_deleted_at'), table_name='leave_requests')
    op.drop_column('leave_requests', 'deleted_at')
    
    op.drop_index(op.f('ix_attendance_deleted_at'), table_name='attendance')
    op.drop_column('attendance', 'deleted_at')
    
    op.drop_index(op.f('ix_profiles_deleted_at'), table_name='profiles')
    op.drop_column('profiles', 'deleted_at')
    
    op.drop_index(op.f('ix_users_deleted_at'), table_name='users')
    op.drop_column('users', 'deleted_at')
