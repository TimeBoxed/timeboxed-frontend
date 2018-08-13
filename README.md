# timeboxed-frontend

Front end for Timeboxed

## Getting Started

In order to run locally, clone repo, and enter ```npm i``` in your terminal at the project's root level to install dependencies. Create a ```.env``` file that will be gitignored. This file will need to look like the following:

``` env

API_URL=http://localhost:3000
NODE_ENV=development

```

To start, enter the following command in your terminal: ```npm run watch```, and the application should open on [http://localhost:8080](http://localhost:8080).

You will also need to start the backend server and database for full functionality. See instructions here: [https://github.com/TimeBoxed/timeboxed-backend](https://github.com/TimeBoxed/timeboxed-backend)