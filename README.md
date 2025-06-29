# Habit Tracker

A modern, intuitive habit tracking application built with Next.js, React, and Prisma.

## 🌟 Features

- **Track Daily Habits**: Create and monitor your daily habits with ease
- **Customizable Goals**: Set personalized goals for each habit
- **Visual Progress**: View your progress with intuitive color-coded calendars
- **Streak Tracking**: Stay motivated by tracking your current and best streaks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (development), PostgreSQL (production) with Prisma ORM
- **Testing**: Vitest for unit and integration tests
- **Validation**: Zod for type-safe schema validation

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a .env file in the root directory with the following content:

```bash
DATABASE_URL=file:dev.db
```

3. Push the database

```bash
npx prisma db push
```

4. Seed the database with initial data

```bash
npx prisma db seed
```

5. Start the development server

```bash
npm run dev
```

6. Open http://localhost:3000 with your browser to see the application.
