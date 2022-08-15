
## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called mvp: `create database mvp`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=pethotel
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'applicants', 'posts' and a junction table called 'posts_applicants' in your database.

### Development

- Run `npm start` in project directory to start the Express server on port 5001
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Database Design

https://dbdesigner.page.link/x34KbLjiFiUTLJmM9

## Future Features

- Login (user, professional and company)
- Chat (connected with a random professional in chosen field)
- Filter posts (by profession)
- View your applications (code started in components/UserApplied)

## Technologies Used

- Bootstrap
- React
- Node.js
- Express
- MySQL
- dbdesigner
- Postman

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
