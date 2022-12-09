from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag
from app.forms import AnswerForm, QuestionForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

question_routes = Blueprint('questions', __name__)

## Get all Questions

@question_routes.route('')
def get_all_questions():
  questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags)).all()
  numQuestions = Question.query.count()

  response = {
    "Questions": [],
    "numQuestions": numQuestions
  }

  for question in questions:
    dict_question = question.to_dict_single()
    dict_question['Tags'] = []

    for tag in question.tags:
      dict_question['Tags'].append(tag.to_dict())

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

  response['Tags'] = []

  for tag in question.tags:
    response['Tags'].append(tag.to_dict())

  response['User'] = {
      "id": question.author.id,
      "username": question.author.username
    }

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
      body=form.data['body'],
      created_at=datetime.utcnow(),
      updated_at=datetime.utcnow()
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

  answers = Answer.query.filter(Answer.question_id == id).options(joinedload(Answer.author)).all()
  # answerCount = Answer.query.filter(Answer.question_id == id).options(joinedload(Answer.author)).count()

  response = {
    "Answers": [],

  }

  for answer in answers:
    dict_answer = answer.to_dict()
    dict_answer['User'] = {
      "id": answer.author.id,
      "username": answer.author.username
    }
    response['Answers'].append(dict_answer)

  return response

## Add Answer to a Question
@question_routes.route('/<int:id>/answers', methods=['POST'])
def add_answer_to_question(id):
  # print('hello from post answers route')
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
      answer=form.data['answer'],
      created_at=datetime.utcnow(),
      updated_at=datetime.utcnow()
    )
    db.session.add(new_answer)
    db.session.commit()
    return new_answer.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Add tag to a question

@question_routes.route('/<int:id>/tags', methods=['POST'])
@login_required
def add_tag_to_question(id):
  try:
    question = Question.query.get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  if current_user.id != question.user_id:
    return {"message": "Not authorized to modify this question"}, 403

  tagId = request.get_json()['tagId']

  try:
    tag = Tag.query.get_or_404(tagId)
  except:
    return { "message": "Tag couldn't be found"}, 404

  if not tag in question.tags:
    question.tags.append(tag)
    db.session.commit()
    return {
      "message": f"tag {tag.tag} added to question {question.id}",
      "Tag": tag.to_dict()
      }
  else:
    return {"message": "Question already has this tag"}, 400

## Remove a tag from a question

@question_routes.route('<int:questionId>/tags/<int:tagId>', methods=['DELETE'])
@login_required
def remove_tag(questionId, tagId):
  try:
    question = Question.query.get_or_404(questionId)
  except:
    return { "message": "Question couldn't be found"}, 404

  if current_user.id != question.user_id:
    return {"message": "Not authorized to modify this question"}, 403

  try:
    tag = Tag.query.get_or_404(tagId)
  except:
    return { "message": "Tag couldn't be found"}, 404

  if tag in question.tags:
    question.tags.remove(tag)
    db.session.commit()
    return {"message": f"tag {tag.tag} removed from question {question.id}"}
  else:
    return {"message": "Question does not have this tag"}, 400
