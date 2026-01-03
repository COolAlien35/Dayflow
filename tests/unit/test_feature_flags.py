"""Unit tests for feature flag functionality."""
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from api.database import Base
from api.models import FeatureFlag
from api.feature_flags import (
    is_feature_enabled,
    get_all_feature_flags,
    seed_default_feature_flags
)


@pytest.fixture
def db_session():
    """Create a test database session with only feature_flags table."""
    engine = create_engine("sqlite:///:memory:")
    
    # Create only the feature_flags table
    FeatureFlag.__table__.create(engine)
    
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    yield session
    session.close()


class TestFeatureFlagStorage:
    """Test feature flag storage and retrieval."""
    
    def test_is_feature_enabled_returns_false_for_nonexistent_flag(self, db_session):
        """Test that is_feature_enabled returns False for non-existent flags."""
        result = is_feature_enabled(db_session, "nonexistent_feature")
        assert result is False
    
    def test_is_feature_enabled_returns_correct_status(self, db_session):
        """Test that is_feature_enabled returns correct status for existing flags."""
        # Create a feature flag
        flag = FeatureFlag(
            feature_name="test_feature",
            enabled=True,
            description="Test feature"
        )
        db_session.add(flag)
        db_session.commit()
        
        # Check enabled flag
        result = is_feature_enabled(db_session, "test_feature")
        assert result is True
        
        # Update to disabled
        flag.enabled = False
        db_session.commit()
        
        # Check disabled flag
        result = is_feature_enabled(db_session, "test_feature")
        assert result is False
    
    def test_get_all_feature_flags_returns_empty_dict_when_no_flags(self, db_session):
        """Test that get_all_feature_flags returns empty dict when no flags exist."""
        result = get_all_feature_flags(db_session)
        assert result == {}
    
    def test_get_all_feature_flags_returns_all_flags(self, db_session):
        """Test that get_all_feature_flags returns all feature flags."""
        # Create multiple feature flags
        flags = [
            FeatureFlag(feature_name="feature1", enabled=True),
            FeatureFlag(feature_name="feature2", enabled=False),
            FeatureFlag(feature_name="feature3", enabled=True),
        ]
        for flag in flags:
            db_session.add(flag)
        db_session.commit()
        
        # Get all flags
        result = get_all_feature_flags(db_session)
        
        assert len(result) == 3
        assert result["feature1"] is True
        assert result["feature2"] is False
        assert result["feature3"] is True
    
    def test_seed_default_feature_flags_creates_all_flags(self, db_session):
        """Test that seed_default_feature_flags creates all default flags."""
        # Seed default flags
        seed_default_feature_flags(db_session)
        
        # Check that all default flags were created
        flags = get_all_feature_flags(db_session)
        
        expected_flags = [
            "analytics",
            "exports",
            "payroll_engine",
            "real_time_updates",
            "bulk_import",
            "soft_deletes",
            "role_management"
        ]
        
        for flag_name in expected_flags:
            assert flag_name in flags
            assert flags[flag_name] is False  # All should be disabled by default
    
    def test_seed_default_feature_flags_is_idempotent(self, db_session):
        """Test that seed_default_feature_flags can be called multiple times safely."""
        # Seed once
        seed_default_feature_flags(db_session)
        flags_count_1 = len(get_all_feature_flags(db_session))
        
        # Seed again
        seed_default_feature_flags(db_session)
        flags_count_2 = len(get_all_feature_flags(db_session))
        
        # Should have same count (no duplicates)
        assert flags_count_1 == flags_count_2
    
    def test_seed_default_feature_flags_preserves_existing_state(self, db_session):
        """Test that seed_default_feature_flags doesn't overwrite existing flags."""
        # Seed default flags
        seed_default_feature_flags(db_session)
        
        # Enable one flag
        flag = db_session.query(FeatureFlag).filter(
            FeatureFlag.feature_name == "analytics"
        ).first()
        flag.enabled = True
        db_session.commit()
        
        # Seed again
        seed_default_feature_flags(db_session)
        
        # Check that the enabled flag is still enabled
        flag = db_session.query(FeatureFlag).filter(
            FeatureFlag.feature_name == "analytics"
        ).first()
        assert flag.enabled is True
