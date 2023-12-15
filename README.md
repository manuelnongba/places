## Places

## Configuration

### Environment Variables

Create a .env file in the root directory with the following environment variables:

```sh
DATABASE
DATABASE_PORT
DATABASE_USER
DATABASE_HOST

SESSION_SECRET
```

- Create a PostgresSQL server and database, and retrieve your database name, port, username and host name.
- Create your unique session secret.

### Database Migration

After installing all dependencies, run the pg migration command from your terminal (MAC):

```sh
DATABASE_URL=postgres://USERNAME@localhost:PORT/DATABASE_NAME npm run migrate up 1691927643843_users-table
```

This is going to create the users table in your PG database.

```sh
DATABASE_URL=postgres://USERNAME@localhost:PORT/DATABASE_NAME npm run migrate up 1691926873304_places-table
```

This is going to create the places table in your PG database.

`Note: Replace USERNAME, PORT, and DATABASE_NAME with your actual database credentials.`

## Getting Started

From your terminal :

```sh
npm run dev
```
