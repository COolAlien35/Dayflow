"""Script to seed default feature flags."""
import sys
import os

# Add parent directory to path to import api modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from api.database import SessionLocal
from api.feature_flags import seed_default_feature_flags


def main():
    """Seed default feature flags."""
    db = SessionLocal()
    try:
        print("Seeding default feature flags...")
        seed_default_feature_flags(db)
        print("Feature flags seeded successfully!")
    except Exception as e:
        print(f"Error seeding feature flags: {e}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    main()
