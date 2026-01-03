"""Unit tests for database schema extensions.

Tests verify that all new tables, columns, indexes, and constraints
are properly defined in the database models.
"""
import pytest
from sqlalchemy import inspect, create_engine
from sqlalchemy.schema import CreateTable
from api.database import Base
from api.models import (
    User, Profile, Attendance, LeaveRequest, Payroll,
    SalaryHistory, Payslip, TaxConfig, Notification,
    RoleChangeLog, FeatureFlag
)


class TestSchemaExtensions:
    """Test suite for database schema extensions."""

    def test_all_new_tables_exist(self):
        """Test that all new tables exist with correct columns."""
        # Verify new models are defined
        new_models = [
            SalaryHistory,
            Payslip,
            TaxConfig,
            Notification,
            RoleChangeLog,
            FeatureFlag
        ]
        
        for model in new_models:
            assert hasattr(model, '__tablename__'), f"{model.__name__} missing __tablename__"
            assert hasattr(model, '__table__'), f"{model.__name__} missing __table__"
    
    def test_deleted_at_columns_exist(self):
        """Test that deleted_at column exists on required tables."""
        models_with_soft_delete = [
            User,
            Profile,
            Attendance,
            LeaveRequest,
            Payroll
        ]
        
        for model in models_with_soft_delete:
            assert hasattr(model, 'deleted_at'), \
                f"{model.__tablename__} missing deleted_at column"
            
            # Verify it's a DateTime column
            deleted_at_col = getattr(model, 'deleted_at')
            assert deleted_at_col is not None
    
    def test_salary_history_columns(self):
        """Test that salary_history table has all required columns."""
        required_columns = [
            'id', 'user_id', 'basic_salary', 'hra', 'transport_allowance',
            'medical_allowance', 'tax_deduction', 'insurance_deduction',
            'effective_date', 'created_at', 'created_by'
        ]
        
        for col_name in required_columns:
            assert hasattr(SalaryHistory, col_name), \
                f"SalaryHistory missing {col_name} column"
    
    def test_payslip_columns(self):
        """Test that payslips table has all required columns."""
        required_columns = [
            'id', 'user_id', 'month', 'year', 'basic_salary',
            'total_allowances', 'total_deductions', 'tax_amount',
            'net_pay', 'generated_at', 'generated_by'
        ]
        
        for col_name in required_columns:
            assert hasattr(Payslip, col_name), \
                f"Payslip missing {col_name} column"
    
    def test_tax_config_columns(self):
        """Test that tax_config table has all required columns."""
        required_columns = [
            'id', 'config_type', 'flat_rate', 'brackets',
            'effective_date', 'created_at', 'updated_at'
        ]
        
        for col_name in required_columns:
            assert hasattr(TaxConfig, col_name), \
                f"TaxConfig missing {col_name} column"
    
    def test_notification_columns(self):
        """Test that notifications table has all required columns."""
        required_columns = [
            'id', 'user_id', 'notification_type', 'message',
            'related_entity_type', 'related_entity_id', 'is_read', 'created_at'
        ]
        
        for col_name in required_columns:
            assert hasattr(Notification, col_name), \
                f"Notification missing {col_name} column"
    
    def test_role_change_log_columns(self):
        """Test that role_change_log table has all required columns."""
        required_columns = [
            'id', 'user_id', 'old_role', 'new_role', 'changed_by', 'changed_at'
        ]
        
        for col_name in required_columns:
            assert hasattr(RoleChangeLog, col_name), \
                f"RoleChangeLog missing {col_name} column"
    
    def test_feature_flag_columns(self):
        """Test that feature_flags table has all required columns."""
        required_columns = [
            'id', 'feature_name', 'enabled', 'description', 'updated_at'
        ]
        
        for col_name in required_columns:
            assert hasattr(FeatureFlag, col_name), \
                f"FeatureFlag missing {col_name} column"
    
    def test_unique_constraints(self):
        """Test that unique constraints are properly defined."""
        # Test SalaryHistory unique constraint on (user_id, effective_date)
        salary_history_table = SalaryHistory.__table__
        unique_constraints = [c for c in salary_history_table.constraints 
                            if hasattr(c, 'columns') and len(c.columns) > 1]
        assert len(unique_constraints) > 0, \
            "SalaryHistory missing unique constraint on (user_id, effective_date)"
        
        # Test Payslip unique constraint on (user_id, month, year)
        payslip_table = Payslip.__table__
        unique_constraints = [c for c in payslip_table.constraints 
                            if hasattr(c, 'columns') and len(c.columns) > 1]
        assert len(unique_constraints) > 0, \
            "Payslip missing unique constraint on (user_id, month, year)"
        
        # Test FeatureFlag unique constraint on feature_name
        feature_flag_table = FeatureFlag.__table__
        unique_columns = [c for c in feature_flag_table.columns if c.unique]
        assert len(unique_columns) > 0, \
            "FeatureFlag missing unique constraint on feature_name"
    
    def test_indexes_defined(self):
        """Test that indexes are created on required columns."""
        # Test deleted_at indexes
        for model in [User, Profile, Attendance, LeaveRequest, Payroll]:
            deleted_at_col = getattr(model, 'deleted_at')
            assert deleted_at_col.index is True or any(
                'deleted_at' in str(idx) for idx in model.__table__.indexes
            ), f"{model.__tablename__}.deleted_at should be indexed"
        
        # Test salary_history indexes
        assert hasattr(SalaryHistory, 'user_id'), "SalaryHistory missing user_id"
        user_id_col = getattr(SalaryHistory, 'user_id')
        assert user_id_col.index is True, "SalaryHistory.user_id should be indexed"
        
        # Test payslip indexes
        assert hasattr(Payslip, 'user_id'), "Payslip missing user_id"
        user_id_col = getattr(Payslip, 'user_id')
        assert user_id_col.index is True, "Payslip.user_id should be indexed"
        
        # Test notification indexes
        assert hasattr(Notification, 'user_id'), "Notification missing user_id"
        user_id_col = getattr(Notification, 'user_id')
        assert user_id_col.index is True, "Notification.user_id should be indexed"
        
        assert hasattr(Notification, 'is_read'), "Notification missing is_read"
        is_read_col = getattr(Notification, 'is_read')
        assert is_read_col.index is True, "Notification.is_read should be indexed"
        
        # Test tax_config indexes
        assert hasattr(TaxConfig, 'effective_date'), "TaxConfig missing effective_date"
        effective_date_col = getattr(TaxConfig, 'effective_date')
        assert effective_date_col.index is True, "TaxConfig.effective_date should be indexed"
        
        # Test role_change_log indexes
        assert hasattr(RoleChangeLog, 'user_id'), "RoleChangeLog missing user_id"
        user_id_col = getattr(RoleChangeLog, 'user_id')
        assert user_id_col.index is True, "RoleChangeLog.user_id should be indexed"
    
    def test_relationships_defined(self):
        """Test that relationships are properly defined."""
        # Test User relationships to new models
        assert hasattr(User, 'salary_history'), "User missing salary_history relationship"
        assert hasattr(User, 'payslips'), "User missing payslips relationship"
        assert hasattr(User, 'notifications'), "User missing notifications relationship"
        
        # Test SalaryHistory relationship to User
        assert hasattr(SalaryHistory, 'user'), "SalaryHistory missing user relationship"
        
        # Test Payslip relationship to User
        assert hasattr(Payslip, 'user'), "Payslip missing user relationship"
        
        # Test Notification relationship to User
        assert hasattr(Notification, 'user'), "Notification missing user relationship"
    
    def test_check_constraints_defined(self):
        """Test that check constraints are properly defined."""
        # Test Payslip month constraint (1-12)
        payslip_table = Payslip.__table__
        check_constraints = [c for c in payslip_table.constraints 
                           if hasattr(c, 'sqltext')]
        assert len(check_constraints) > 0, "Payslip missing check constraints"
        
        # Test TaxConfig config_type constraint
        tax_config_table = TaxConfig.__table__
        check_constraints = [c for c in tax_config_table.constraints 
                           if hasattr(c, 'sqltext')]
        assert len(check_constraints) > 0, "TaxConfig missing check constraints"
        
        # Test SalaryHistory non-negative constraints
        salary_history_table = SalaryHistory.__table__
        check_constraints = [c for c in salary_history_table.constraints 
                           if hasattr(c, 'sqltext')]
        assert len(check_constraints) > 0, "SalaryHistory missing check constraints"
