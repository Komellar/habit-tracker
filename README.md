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
- **Database**: Prisma ORM with SQLite
- **Authentication**: Custom JWT + Redis session management
- **Testing**: Vitest for unit and integration tests
- **Validation**: Zod for type-safe schema validation

## 🛠️ Getting Started

### 📋 Prerequisites

- Node.js 18.x or later
- npm
- Docker and Docker Compose

### 🔧 Installation

1. Clone the repository

```bash
git clone https://github.com/Komellar/habit-tracker.git
cd habit-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with the following content:

```bash
DATABASE_URL=file:dev.db
```

4. Set up the database (apply migrations)

```bash
npx prisma migrate deploy
```

5. Seed the database with initial data

```bash
npx prisma db seed
```

6. Start Redis using Docker (This will start a Redis instance that the application will use for session management.)

```bash
docker-compose up -d
```

7. Start the development server

```bash
npm run dev
```

6. Open http://localhost:3000 with your browser to see the application.

## 📝 Usage

- **Sign Up/Login**: Create an account or login with the demo account (mail: test@test.com, pwd: password1)
- **Create Habits**: Add new habits you want to track
- **Track Progress**: Mark habits as complete each day
- **View Statistics**: See your progress and streaks on the dashboard
