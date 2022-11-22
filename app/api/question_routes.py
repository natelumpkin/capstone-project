from flask import Blueprint, request
from app.models import Question, Answer, User, db
from app.forms import AnswerForm, QuestionForm
from flask_login import current_user

question_routes = Blueprint('questions', __name__)

## Get all Questions

@question_routes.router('')
def get_all_questions():
  return 'Hello from questions router!'

## Get Single Question

## Edit a Question

## Delete a Question

## Get Answers to a Question

## Add Answer to a Question
