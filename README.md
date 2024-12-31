# Newsletter Management Tool

This is a Next.js project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The application allows users to subscribe to newsletters, manage subscriber information, and will eventually include features for creating and sending newsletters.

## Getting Started

First, run the development server:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend

The backend of this application is built using **PostgreSQL**. To connect to your PostgreSQL database, you need to set up an environment variable.

### Environment Variables

Create a `.env` file in the root of your project and add the following variable:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name
```
Replace `user`, `password`, and `your_database_name` with your actual PostgreSQL credentials and database name.


## Features

- **Subscriber Management**: Add, edit, and delete subscribers.
- **Loading Skeletons**: Provides a better user experience while data is being fetched.
- **Notifications**: Uses `sonner` for toast notifications on actions like adding, updating, or deleting subscribers.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Future Updates

### Newsletter Creation

In future updates, the application will include features for:

- **Creating Newsletters**: Users will be able to create new newsletters with customizable templates.
- **Sending Newsletters**: Integration with email services to send newsletters directly to subscribers.
- **Tracking Engagement**: Features to track open rates and engagement metrics for sent newsletters.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
