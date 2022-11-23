from flask import Blueprint, request
from app.models import Question, Answer, User, db
from app.forms import AnswerForm, QuestionForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

question_routes = Blueprint('questions', __name__)

## Get all Questions

@question_routes.route('')
def get_all_questions():
  questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers)).all()

  response = {
    "Questions": []
  }

  for question in questions:
    dict_question = question.to_dict_all()
    response['Questions'].append(dict_question)

  return response

## Get Single Question

@question_routes.route('/<int:id>')
def get_single_question(id):
  try:
    question = Question.query.get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  response = question.to_dict_single()

  return response

## Post a Question

@question_routes.route('', methods=['POST'])
@login_required
def post_question():
  print('hello from post questions')
  form = QuestionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_question = Question(
      user_id=current_user.id,
      title=form.data['title'],
      body=form.data['body']
    )
    db.session.add(new_question)
    db.session.commit()
    return new_question.to_dict_single(), 201
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Edit a Question
@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_question(id):
  try:
    question = Question.query.get_or_404(id)

  except:
    return { "message": "Question couldn't be found"}, 404

  if current_user.id != question.user_id:
    return {"message": "Not authorized to edit this question"}, 403
  else:
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      if form.data['title']:
        question.title = form.data['title']
      if form.data['body']:
        question.body = form.data['body']
      question.updated_at = datetime.utcnow()
      db.session.commit()
      return question.to_dict_single()
    else:
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Delete a Question
@question_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_question(id):
  try:
    question = Question.query.get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  if current_user.id != question.user_id:
    return {"message": "Not authorized to delete this question"}, 403
  else:
    db.session.delete(question)
    db.session.commit()
    return {"message": "Successfully deleted"}

## Get Answers to a Question
@question_routes.route('/<int:id>/answers')
def get_answers_by_question(id):

  try:
    Question.query.get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  answers = Answer.query.filter(Answer.question_id == id).all()

  response = {
    "Answers": []
  }

  for answer in answers:
    response['Answers'].append(answer.to_dict())

  return response

## Add Answer to a Question
@question_routes.route('/<int:id>/answers', methods=['POST'])
def add_answer_to_question(id):
  print('hello from post answers route')
  try:
    Question.query.get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  form = AnswerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_answer = Answer(
      user_id=current_user.id,
      question_id=id,
      answer=form.data['answer']
    )
    db.session.add(new_answer)
    db.session.commit()
    return new_answer.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
