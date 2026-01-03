"""Initial schema

Revision ID: 001
Revises: 
Create Date: 2026-01-03

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.CheckConstraint("role IN ('Admin', 'Employee')", name='check_role'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_role'), 'users', ['role'], unique=False)

    # Create profiles table
    op.create_table(
        'profiles',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('employee_id', sa.String(length=50), nullable=True),
        sa.Column('first_name', sa.String(length=100), nullable=False),
        sa.Column('last_name', sa.String(length=100), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('department', sa.String(length=100), nullable=True),
        sa.Column('position', sa.String(length=100), nullable=True),
        sa.Column('date_of_joining', sa.Date(), nullable=True),
        sa.Column('emergency_contact', sa.String(length=100), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('employee_id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_profiles_department'), 'profiles', ['department'], unique=False)
    op.create_index(op.f('ix_profiles_id'), 'profiles', ['id'], unique=False)
    op.create_index(op.f('ix_profiles_user_id'), 'profiles', ['user_id'], unique=False)

    # Create attendance table
    op.create_table(
        'attendance',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('date', sa.Date(), nullable=False),
        sa.Column('check_in', sa.DateTime(), nullable=True),
        sa.Column('check_out', sa.DateTime(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'date', name='unique_user_date')
    )
    op.create_index(op.f('ix_attendance_date'), 'attendance', ['date'], unique=False)
    op.create_index(op.f('ix_attendance_id'), 'attendance', ['id'], unique=False)
    op.create_index(op.f('ix_attendance_status'), 'attendance', ['status'], unique=False)

    # Create leave_requests table
    op.create_table(
        'leave_requests',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('leave_type', sa.String(length=50), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('days_count', sa.Integer(), nullable=False),
        sa.Column('remarks', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=20), nullable=True),
        sa.Column('reviewed_by', sa.Integer(), nullable=True),
        sa.Column('reviewed_at', sa.DateTime(), nullable=True),
        sa.Column('admin_comments', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.CheckConstraint("leave_type IN ('Sick', 'Casual', 'Vacation', 'Unpaid')", name='check_leave_type'),
        sa.CheckConstraint("status IN ('Pending', 'Approved', 'Rejected')", name='check_status'),
        sa.ForeignKeyConstraint(['reviewed_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_leave_requests_id'), 'leave_requests', ['id'], unique=False)
    op.create_index(op.f('ix_leave_requests_status'), 'leave_requests', ['status'], unique=False)
    op.create_index(op.f('ix_leave_requests_user_id'), 'leave_requests', ['user_id'], unique=False)

    # Create payroll table
    op.create_table(
        'payroll',
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
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.CheckConstraint('basic_salary >= 0', name='check_basic_salary_positive'),
        sa.CheckConstraint('hra >= 0', name='check_hra_positive'),
        sa.CheckConstraint('transport_allowance >= 0', name='check_transport_positive'),
        sa.CheckConstraint('medical_allowance >= 0', name='check_medical_positive'),
        sa.CheckConstraint('tax_deduction >= 0', name='check_tax_positive'),
        sa.CheckConstraint('insurance_deduction >= 0', name='check_insurance_positive'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id')
    )
    op.create_index(op.f('ix_payroll_id'), 'payroll', ['id'], unique=False)
    op.create_index(op.f('ix_payroll_user_id'), 'payroll', ['user_id'], unique=False)


def downgrade() -> None:
    # Drop tables in reverse order
    op.drop_index(op.f('ix_payroll_user_id'), table_name='payroll')
    op.drop_index(op.f('ix_payroll_id'), table_name='payroll')
    op.drop_table('payroll')
    
    op.drop_index(op.f('ix_leave_requests_user_id'), table_name='leave_requests')
    op.drop_index(op.f('ix_leave_requests_status'), table_name='leave_requests')
    op.drop_index(op.f('ix_leave_requests_id'), table_name='leave_requests')
    op.drop_table('leave_requests')
    
    op.drop_index(op.f('ix_attendance_status'), table_name='attendance')
    op.drop_index(op.f('ix_attendance_id'), table_name='attendance')
    op.drop_index(op.f('ix_attendance_date'), table_name='attendance')
    op.drop_table('attendance')
    
    op.drop_index(op.f('ix_profiles_user_id'), table_name='profiles')
    op.drop_index(op.f('ix_profiles_id'), table_name='profiles')
    op.drop_index(op.f('ix_profiles_department'), table_name='profiles')
    op.drop_table('profiles')
    
    op.drop_index(op.f('ix_users_role'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
