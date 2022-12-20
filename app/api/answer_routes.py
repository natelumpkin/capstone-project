from flask import Blueprint, request
from app.models import Question, Answer, User, db, Answer_Vote
from app.forms import AnswerForm, QuestionForm, VoteForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

answer_routes = Blueprint("answers", __name__)

## Get a single answer

@answer_routes.route('/<int:id>')
def get_answer(id):
  try:
    answer = Answer.query.options(joinedload(Answer.votes)).get_or_404(id)
  except:
    return {"message": "Answer couldn't be found"}, 404

  response = answer.to_dict()
  response['Votes'] = []
  for vote in answer.votes:
    response['Votes'].append(answer.votes)

  return answer.to_dict()

## Edit an Answer
@answer_routes.route('/<int:id>', methods=['PUT'])
def edit_answer(id):

  try:
    answer = Answer.query.options(joinedload(Answer.votes)).get_or_404(id)
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

    response = answer.to_dict()
    response['Votes'] = []
    for vote in answer.votes:
      response['Votes'].append(vote.to_dict())

    return response
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

## Add vote to answer

@answer_routes.route('/<int:id>/votes', methods=['POST'])
@login_required
def add_vote_to_answer(id):
  try:
    answer = Answer.query.options(joinedload(Answer.votes)).get_or_404(id)
  except:
    return { "message": "Answer couldn't be found"}, 404

  if current_user.id == answer.user_id:
    return { "message": "Cannot vote on your own answer"}, 403

  ## If user already has a vote in answer.votes
  ## return a forbidden message

  voteIds = [ vote.user_id for vote in answer.votes ]
  # print("voteIds: ", voteIds)
  # print("currentuserid: ", current_user.id)
  if current_user.id in voteIds:
    return { "message": "User has already voted on this answer"}, 403

  form = VoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  print(form.data)

  if form.validate_on_submit():
    new_vote = Answer_Vote(
      answer_id=answer.id,
      user_id=current_user.id,
      vote=form.data['vote']
    )
    db.session.add(new_vote)
    db.session.commit()
    return new_vote.to_dict(), 201
  else:
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
