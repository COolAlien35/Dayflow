# Dayflow HRMS API

FastAPI backend for Dayflow HRMS, deployed as Vercel serverless functions.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Run database migrations:**
   ```bash
   alembic upgrade head
   ```

4. **Run development server:**
   ```bash
   uvicorn api.index:app --reload
   ```

## Database Schema

The system uses PostgreSQL with the following tables:

- **users**: User authentication and role management
- **profiles**: Employee profile information
- **attendance**: Daily check-in/check-out records
- **leave_requests**: Leave applications and approvals
- **payroll**: Salary structure and payment information

All tables include proper indexes, foreign key constraints, and check constraints as specified in the design document.

## Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback migration:
```bash
alembic downgrade -1
```

## Deployment

The API is configured for Vercel serverless deployment:

1. Set environment variables in Vercel dashboard
2. Deploy using `vercel` CLI or GitHub integration
3. Database migrations should be run manually before deployment

## Environment Variables

Required environment variables (see `.env.example`):

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `JWT_ALGORITHM`: JWT algorithm (default: HS256)
- `JWT_EXPIRATION_HOURS`: Token expiration time (default: 24)
- `CORS_ORIGINS`: Comma-separated list of allowed origins
