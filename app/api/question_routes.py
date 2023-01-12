from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag, Question_Vote
from app.forms import AnswerForm, QuestionForm, VoteForm
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

question_routes = Blueprint('questions', __name__)

## Get all Questions

@question_routes.route('')
def get_all_questions():

  page = None
  size = None
  author = None
  score = None
  keywords = None
  exact_phrase = None

  if request.args.get('page'):
    page = int(request.args.get('page'))

  if request.args.get('size'):
    size = int(request.args.get('size'))

  if request.args.get('author'):
    author = request.args.get(('author'))

  if request.args.get('score'):
    try:
      score = int(request.args.get(('score')))
    except:
      score = None

  if request.args.get('keywords'):
    keywords = request.args.get(('keywords'))

  if request.args.get('exact_phrase'):
    exact_phrase = request.args.get('exact_phrase')

  if not page:
    page = 1
  elif page <= 0:
    page = 1
  else:
    page = int(page)

  if not size:
    size = 100
  elif size <= 0:
    size = 5
  else:
    size = int(size)

  print('score: ', score)

  limit = size
  offset = size * (page - 1)

  if author and not keywords and not score:
    questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags), joinedload(Question.votes)).join(User).filter(User.username.ilike(f'%{author}%')).limit(limit).offset(offset).all()
  elif keywords and not author and not score:
    questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags), joinedload(Question.votes)).filter(Question.body.ilike(f'%{keywords}%')).limit(limit).offset(offset).all()
  elif keywords and author and not score:
    questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags), joinedload(Question.votes)).join(User).filter(Question.body.ilike(f'%{keywords}%'), User.username.ilike(f'%{author}%')).limit(limit).offset(offset).all()
  elif score and not author and not keywords:
    questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags), joinedload(Question.votes)).join(User).filter(Question.totalScore >= score).limit(limit).offset(offset).all()
  else:
    questions = Question.query.order_by(Question.created_at.desc()).options(joinedload(Question.author), joinedload(Question.answers), joinedload(Question.tags), joinedload(Question.votes)).limit(limit).offset(offset).all()

  numQuestions = Question.query.count()

  response = {
    "Questions": [],
    "numQuestions": numQuestions,
    "Page": page,
    "Size": size
  }

  for question in questions:
    dict_question = question.to_dict_single()
    dict_question['Tags'] = []
    # dict_question['totalScore'] = 0

    # for vote in question.votes:
    #   if vote.vote:
    #     dict_question['totalScore'] += 1
    #   else:
    #     dict_question['totalScore'] -= 1

    for tag in question.tags:
      dict_question['Tags'].append(tag.to_dict())

    response['Questions'].append(dict_question)

  return response

## Get Single Question

@question_routes.route('/<int:id>')
def get_single_question(id):
  try:
    question = Question.query.options(joinedload(Question.tags), joinedload(Question.votes)).get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  response = question.to_dict_single()

  response['Tags'] = []
  # response['totalScore'] = 0

  # for vote in question.votes:
  #   if vote.vote:
  #     response['totalScore'] += 1
  #   else:
  #     response['totalScore'] -= 1

  for tag in question.tags:
    response['Tags'].append(tag.to_dict())

  response['Votes'] = []
  for vote in question.votes:
    response['Votes'].append(vote.to_dict())

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
    dict_question = new_question.to_dict_single()
    dict_question['Tags'] = []
    dict_question['Votes'] = []
    # dict_question['totalScore'] = 0
    return dict_question, 201
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Edit a Question
@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_question(id):
  try:
    question = Question.query.options(joinedload(Question.tags), joinedload(Question.votes)).get_or_404(id)

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

      response = question.to_dict_single()
      response['Tags'] = []
      response['Votes'] = []
      for vote in question.votes:
        response['Votes'].append(vote.to_dict())


      for tag in question.tags:
        response['Tags'].append(tag.to_dict())

      return response
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

  answers = Answer.query.filter(Answer.question_id == id).options(joinedload(Answer.author), joinedload(Answer.votes)).all()
  # answerCount = Answer.query.filter(Answer.question_id == id).options(joinedload(Answer.author)).count()

  response = {
    "Answers": [],

  }

  for answer in answers:
    dict_answer = answer.to_dict()

    dict_answer['Votes'] = []
    for vote in answer.votes:
      dict_answer['Votes'].append(vote.to_dict())

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
    response = new_answer.to_dict()
    response['Votes'] = []
    return response
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

## Get all votes for a question

@question_routes.route('/<int:id>/votes')
def get_votes_for_question(id):
  try:
    question = Question.query.options(joinedload(Question.votes)).get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  response = {
    "Votes": [],
    "totalScore": question.totalScore
  }

  for vote in question.votes:
    response['Votes'].append(vote.to_dict())

  return response

## Add vote to question

@question_routes.route('/<int:id>/votes', methods=['POST'])
@login_required
def add_vote_to_question(id):
  try:
    question = Question.query.options(joinedload(Question.votes)).get_or_404(id)
  except:
    return { "message": "Question couldn't be found"}, 404

  if current_user.id == question.user_id:
    return { "message": "Cannot vote on your own question"}, 403

  ## If user already has a vote in question.votes
  ## return a forbidden message

  voteIds = [ vote.user_id for vote in question.votes ]
  # print("voteIds: ", voteIds)
  # print("currentuserid: ", current_user.id)
  if current_user.id in voteIds:
    return { "message": "User has already voted on this question"}, 403

  form = VoteForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  # print(form.data)

  if form.validate_on_submit():
    # Add new vote
    new_vote = Question_Vote(
      question_id=question.id,
      user_id=current_user.id,
      vote=form.data['vote']
    )
    db.session.add(new_vote)
    db.session.commit()

    question = Question.query.options(joinedload(Question.votes)).get_or_404(id)

    # Tabulate total votes on question and recalcuate total score

    new_score = 0
    for vote in question.votes:
      if (vote.vote):
        new_score += 1
      else:
        new_score -= 1

    # Update total score on question
    question.totalScore = new_score
    # print(question.to_dict_single())

    db.session.commit()
    return new_vote.to_dict(), 201
  else:
    print(form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
