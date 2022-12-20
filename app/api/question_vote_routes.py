from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag, Question_Vote
from app.forms import AnswerForm, QuestionForm, VoteForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

question_vote_routes = Blueprint('questionVotes', __name__)

## Update question_vote

# @question_vote_routes.route('/<int:id>', methods=['PUT'])
# def update_question_vote(id):
#   pass

## Delete question_vote

@question_vote_routes.route('/<int:id>', methods=['DELETE'])
def delete_question_vote(id):
  try:
    vote = Question_Vote.query.get_or_404(id)
  except:
    return { "message": "Question_Vote couldn't be found"}, 404

  if current_user.id != vote.user_id:
    return { "message": "Forbidden"}, 403

  db.session.delete(vote)
  db.session.commit()
  # print(vote)
  return { "message": "Successfully deleted"}
