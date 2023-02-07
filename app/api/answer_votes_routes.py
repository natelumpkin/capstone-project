from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag, Question_Vote, Answer_Vote
from app.forms import AnswerForm, QuestionForm, VoteForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

answer_vote_routes = Blueprint('answerVotes', __name__)

## Update answer_vote

@answer_vote_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_answer_vote(id):
  try:
    vote = Answer_Vote.query.get_or_404(id)
  except:
    return { "message": "Answer_Vote couldn't be found"}, 404

  if current_user.id != vote.user_id:
    return { "message": "Forbidden"}, 403

  form = VoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    vote.vote = form.data['vote']

    answer = Answer.query.options(joinedload(Answer.votes)).get(vote.answer_id)

    new_score = 0
    for vote in answer.votes:
      if vote.vote:
        new_score += 1
      else:
        new_score -= 1

    answer.totalScore = new_score

    db.session.commit()
    return vote.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Delete question_vote

@answer_vote_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_answer_vote(id):
  try:
    vote = Answer_Vote.query.get_or_404(id)
  except:
    return { "message": "Answer_Vote couldn't be found"}, 404

  if current_user.id != vote.user_id:
    return { "message": "Forbidden"}, 403

  db.session.delete(vote)

  answer = Answer.query.options(joinedload(Answer.votes)).get(vote.answer_id)

  new_score = 0
  for vote in answer.votes:
    if vote.vote:
      new_score += 1
    else:
      new_score -= 1

  answer.totalScore = new_score

  db.session.commit()
  # print(vote)
  return { "message": "Successfully deleted"}
