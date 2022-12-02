# CRUD OVERGROWTH

## Project Summary

Crud Overgrowth is a full-stack, stateful web app that draws functionality and design inspiration from stackoverflow.com. The current build of Crud Overgrowth offers two key features of interaction: questions and answers. Users are able to sign up, log in, and ask programming-related questions, as well as answer the questions of other users, all with rich text formatting. When logged out, any user is able to view the questions and answers other users have posted, in order to help them find the solution to a programming problem they might have.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
