<h1 align="center">
  BookBridge
</h1>

<p align="center">
  <img style="border-radius: 4px;" src="https://github.com/Zyelixify/BookBridge/assets/49106310/7c958361-da3b-46fb-a77f-447d1b1afb7a " />
</p>

<h3 align="center">BookBridge is a moden web application for accessing library services.</h3>

BookBridge aims to provide a modern and user-friendly interface for library users to browse books, save them to their account, order them, and review them. BookBridge achieves this through a dynamic and responsive web application that is easy to use and provides a seamless experience for users, allowing them to easily access and manage library services while on the go.

## Features
- Automatically fetches book data (by default from OpenLibrary API) and stores it in a separate database used by the application.
- Users can browse books, view details, and save them to their account.
- Users can order books and view their owned books and review them.
- A dynamic "events" system, that can be used to notify users of various events, such as when a book is ordered, or when a book is reviewed.

## Technologies
Project was bootstrapped using [sidebase](https://sidebase.io).
- TypeScript
- Frontend:
  - Nuxt 3/Vue 3
  - Tailwind CSS
  - [NaiveUI](https://www.naiveui.com/en-US/os-theme)
- Backend:
  - tRPC
  - PostgreSQL (in production builds), SQLite (locally in development server)
  - Prisma ORM

## Demo
A live demo of the application can be found [here](https://lms-ashy-ten.vercel.app). The demo is deployed on Vercel. To access the demo, you must use these credentials:
- Email: `demo@bookbridge.com`
- Password: `demo`

*You can sign up by using a different email and password, but this is the pre-registered account for the demo.*

## Setup

- Make sure to install the dependencies:

```bash
npm install
```

- Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

- Production

Build the application for production:

```bash
npm run build
```
