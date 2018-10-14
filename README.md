# TimeBoxed-Frontend

Client-side repo for TimeBoxed

## Technical Implementations

* Google OAuth2.0 for user registration
* Material UI
* React and Redux Store

## Getting Started

clone repo

    https://github.com/TimeBoxed/timeboxed-frontend.git

ensure that Node.js is installed

    node --version

if installed the response should look like "v8.6.0"

install all dependencies

    npm i

At your project's root level add a .env file containg the following:

    API_URL=http://localhost:3000
    NODE_ENV=development

## Running Application

    npm run watch

The application should open on [http://localhost:8080](http://localhost:8080). If not, redirect url to [http://localhost:8080](http://localhost:8080).

You will also need to start the backend server and database for full functionality.

See instructions here: [TimeBoxed-Backend](https://github.com/TimeBoxed/timeboxed-backend)