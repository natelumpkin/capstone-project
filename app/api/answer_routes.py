from flask import Blueprint, request
from app.models import Question, Answer, User, db
from app.forms import AnswerForm, QuestionForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

answer_routes = Blueprint("answers", __name__)

## Edit an Answer
@answer_routes.route('/<int:id>', methods=['PUT'])
def edit_answer(id):

  try:
    answer = Answer.query.get_or_404(id)
  except:
    return { "message": "Answer couldn't be found"}, 404

  if answer.user_id != current_user.id:
    return {"message": "Forbidden"}

  form = AnswerForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    answer.answer = form.data['answer']
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
    return {"message": "Forbidden"}

  db.session.delete(answer)
  db.session.commit()
  return {"message": "Successfully deleted"}
