# CRUD OVERGROWTH

## Table of Contents
1. [Project Summary](#project-summary)
2. [Core Features](#core-features)
3. [Technologies Used](#technologies-used)
4. [App Screenshots](#app-screenshots)
5. [Local Run Instructions](#local-run-instructions)
6. [Future Features](#future-features)

## Project Summary

Crud Overgrowth is a full-stack, stateful web app that draws functionality and design inspiration from stackoverflow.com. The current build of Crud Overgrowth offers two key features of interaction: questions and answers. Users are able to sign up, log in, and ask programming-related questions, as well as answer the questions of other users, all with rich text formatting. When logged out, any user is able to view the questions and answers other users have posted, in order to help them find the solution to any programming-related problem they might have.

[Check out the live site!](https://crud-overgrowth.onrender.com/)

## Core Features

### Questions

Users can post programming-related questions for other users to read and respond to. Users are guided through the process of asking a good question with a dynamic form. Posting has rich-text support. Questions can be editted and deleted by the user who created them.

### Answers

Users can answer each other's questions and are guided through the process of responding with a dynamic form. Answers also have rich-text support. Answers can be editted and deleted by the user who created them.



## **Technologies Used**

### Backend:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

**| [WTForms](https://wtforms.readthedocs.io/en/3.0.x/) | [SQLAlchemy](https://www.sqlalchemy.org/) | [Alembic](https://alembic.sqlalchemy.org/en/latest/) |**

### Frontend:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

**| [Draft JS](https://www.npmjs.com/package/draft-js) |**

## App Screenshots

### Splash Page![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.12.05%20PM.png)

### Questions Page![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.12.27%20PM.png)

### Single Question Page![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.12.43%20PM.png)

### Create Question Form![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.13.57%20PM.png)

### Create Answer Form![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.15.30%20PM.png)

### Sign Up Form![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.15.54%20PM.png)

### Log In Form![Alt text](screenshots/Screen%20Shot%202022-12-02%20at%202.16.04%20PM.png)

## Local Run Instructions
1. Clone the repository to a local directory.
2. In the root directory, copy the contents of the `.env.example` to a `.env` file.
    - Assign `DATABASE_URL` to `sqlite:///dev.db`
    - Assign `SECRET_KEY` to anything (but keep it a secret!)
    - `SCHEMA` is only used for live deployments and can be set to anything
3. In `./app`, install the backend dependencies:
```
pipenv install
pipenv install email_validator
```
4. Still in `./app`, activate the virtual shell:

```
pipenv shell
```

5. run the Alembic migration:
```
flask db upgrade
```
6. Then, seed the database:
```
flask seed all
```
7. Start the backend server:
```
flask run
```
8. In a separate terminal, navigate to `./react-app` and install the frontend dependencies:
```
npm install
```
9. Start the frontend server:
```
npm start
```
---

## Future Features

* Ability to add up and down votes to both questions and answers, to help users find helpful questions and answers and give feedback to each other

* Ability to tag questions and search by tags, to help users find topics related to their interests

* Search functionality by question title, question and answer contents, and tag

* Customizable user profile with profile image and links to personal websites
