from flask import Blueprint, request
from app.models import Question, Answer, User, db
from app.forms import AnswerForm, QuestionForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

answer_routes = Blueprint("answers", __name__)

## Get a single answer

@answer_routes.route('/<int:id>')
def get_answer(id):
  try:
    answer = Answer.query.get_or_404(id)
  except:
    return {"message": "Answer couldn't be found"}, 404

  return answer.to_dict()

## Edit an Answer
@answer_routes.route('/<int:id>', methods=['PUT'])
def edit_answer(id):

  try:
    answer = Answer.query.get_or_404(id)
  except:
    return { "message": "Answer couldn't be found"}, 404

  if answer.user_id != current_user.id:
    return {"message": "Forbidden"}, 403

  form = AnswerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    answer.answer = form.data['answer']
    answer.updated_at = datetime.utcnow()
    db.session.commit()
    return answer.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Delete an Answer
@answer_routes.route('/<int:id>', methods=['DELETE'])
def delete_answer(id):
  try:
    answer = Answer.query.get_or_404(id)
  except:
    return { "message": "Answer couldn't be found"}, 404

  if answer.user_id != current_user.id:
    return {"message": "Forbidden"}, 403

  db.session.delete(answer)
  db.session.commit()
  return {"message": "Successfully deleted"}

## Get all votes for an answer

@answer_routes.route('/<int:id>/votes')
def get_votes_for_answer(id):
  try:
    answer = Answer.query.options(joinedload(Answer.votes)).get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  response = {
    "Votes": [],
    "totalScore": answer.to_dict()['totalScore']
  }

  for vote in answer.votes:
    response['Votes'].append(vote.to_dict())

  return response
