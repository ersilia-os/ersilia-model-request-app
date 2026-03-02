# Ersilia model request app

A Next.js web application for managing and submitting AI/ML model metadata to the Ersilia Model Hub. This platform enables researchers and contributors to submit, review, and manage biomedical machine learning models.

---

## 🚀 Features

- **Model Submission**: Submit new AI/ML models with comprehensive metadata
- **AI-Powered Analysis**: Automatic extraction of model information from publications
- **Admin Dashboard**: Review and manage submitted models
- **User Authentication**: Secure authentication via Auth0
- **GitHub Integration**: Connect models with GitHub repositories
- **Database Management**: PostgreSQL with Prisma ORM
- **Deployment Ready**: Configured for Fly.io deployment with Docker

---

## 🛠 Tech Stack

### Frontend

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Radix UI**
- **React Hook Form**
- **Zod**
- **Tanstack Table**
- **GSAP**

### Backend

- **Prisma**
- **PostgreSQL**
- **Auth0**
- **Vercel AI SDK**

### Development Tools

- **ESLint**
- **Prettier**
- **Husky**
- **Docker**
- **Fly.io**

---

## 📋 Prerequisites

- **Node.js** 20+
- **Yarn** 1.22.22+
- **PostgreSQL** database
- **Auth0** account
- **OpenAI** or **Google AI** API key (for AI features)
- **Github APP**
- **Google**

---

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/arol-dev/ersilia.git
cd ersilia
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ersilia"

# Auth0
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'

# AI Services (choose one or both)
OPENAI_API_KEY='your-openai-key'
GOOGLE_GENERATIVE_AI_API_KEY='your-google-ai-key'

# Google Drive (for file storage)
GOOGLE_SERVICE_CLIENT_EMAIL='your-service-account-email@project.iam.gserviceaccount.com'
GOOGLE_SERVICE_PRIVATE_KEY='your-service-account-private-key-keep-it-with-quote'
GOOGLE_SERVICE_SHARED_DRIVE_ID='your-shared-drive-id'
GOOGLE_SERVICE_ACCOUNT_CLIENT_ID='account-client-id'

NEXT_PUBLIC_GITHUB_OWNER='owner--of-repository-for-issue'
NEXT_PUBLIC_GITHUB_REPO='repository-to-add-issues'

# GitHub (for repository integration)
GITHUB_APP_ID='your-github-app-id'
GITHUB_INSTALLATION_ID='your-github-installation-id'
GITHUB_PRIVATE_KEY='your-github-private-key-keep-it-with-quote'
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

### 5. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

---

## 📜 Available Scripts

```bash
# Development
yarn dev              # Start development server with Turbopack

# Production
yarn build            # Build for production
yarn start            # Start production server

# Database
npx prisma generate   # Generate Prisma Client
npx prisma migrate dev # Run migrations in development
npx prisma studio     # Open Prisma Studio

# Linting & Formatting
yarn lint             # Run ESLint
yarn format           # Format code with Prettier
yarn format:check     # Check code formatting
```

---

## 📁 Project Structure

```
ersilia/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── api/          # API routes
│   │   ├── new-model/    # Model submission form
│   │   └── submissions/  # User submissions
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── schema/           # Zod schemas
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── public/               # Static assets
└── generated/            # Generated Prisma Client
```

---

## 🗄 Database Schema

The application uses PostgreSQL with the following main models:

- **User** - User accounts (Auth0 integration) with GitHub account linking
- **ModelMetadata** - ML model submissions with comprehensive metadata including:
  - Model description, interpretation, and tags
  - Task, input/output specifications
  - Publication details and source information
  - Biomedical area and target organism
  - Deployment and licensing information
- **ErsiliaIssue** - GitHub issue tracking for submitted models
- **FormStatus** - Enum for submission status (DRAFT, SUBMITTED)

---

## 🔐 Authentication

This application uses **Auth0** for authentication. Users must sign in to:

- Submit new models
- View their submissions
- Access admin features (admin role required)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is part of the Ersilia Open Source Initiative.

---

## 🔗 Links

- [Ersilia Model Hub](https://ersilia.io)
- [Documentation](https://ersilia.gitbook.io/ersilia-book/)
- [GitHub Organization](https://github.com/ersilia-os)

---
