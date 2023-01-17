from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag, question_tags
from app.forms import TagForm
from sqlalchemy.orm import joinedload, Session
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime

tag_routes = Blueprint('tags', __name__)

## Get all tags

@tag_routes.route('/')
def get_all_tags():
  # tags = Tag.query.all()

  # print(request.args.get('tag'))

  if request.args.get('tag'):
    search_word = request.args.get('tag')
    # print(search_word)

    tags = Tag.query.filter(Tag.tag.ilike(f'%{search_word}%')).all()
  else:
    tags = Tag.query.all()

  if request.args.get('exactTag'):
    search_word = request.args.get('exactTag').lower()

    print(search_word)

    try:
      tag = Tag.query.filter(Tag.tag == search_word).one()
    except:
      # print(e)
      return {"message": "Tag with this name does not exist"}, 404
    else:
      return tag.to_dict()

  response = {
    "Tags": []
  }

  for tag in tags:
    response['Tags'].append(tag.to_dict())

  return response

## Get a single tag by ID

@tag_routes.route('/<int:id>')
def get_one_tag(id):
  try:
    tag = Tag.query.get_or_404(id)
  except:
    return {"message": "Couldn't find tag"}, 404

  return tag.to_dict()



## Get all questions with this tag

@tag_routes.route('/<int:id>/questions')
def get_questions_for_tags(id):
  try:
    tag = Tag.query.get_or_404(id)
  except:
    return {"message": "Couldn't find tag"}, 404

  # response = {
  #   'Tag': tag.to_dict(),
  #   'Questions': [],
  #   'numQuestions': 0
  # }

  page = None
  size = None

  if request.args.get('page'):
    page = int(request.args.get('page'))

  if request.args.get('size'):
    size = int(request.args.get('size'))

  if not page:
    page = 1
  elif page <= 0:
    page = 1
  else:
    page = int(page)

  if not size:
    size = 10
  elif size <= 0:
    size = 10
  else:
    size = int(size)

  # print('score: ', score)

  limit = size
  offset = size * (page - 1)

  questions = Question.query.join(question_tags).join(Tag).filter(Tag.id == id).limit(limit).offset(offset).all()
  # questions = Session.query(Question, Tag).filter(Question.tags.includes(tag)).limit(limit).offset(offset).all()
  num_questions = Question.query.join(question_tags).join(Tag).filter(Tag.id == id).count()

  response = {
    "numQuestions": num_questions,
    "Tag": tag.to_dict(),
    "Questions": [],
    "Page": page,
    "Size": size
  }

  for question in questions:
    dict_question = question.to_dict_single()
    dict_question['Tags'] = []
    response['Questions'].append(dict_question)
    for tag in question.tags:
      dict_question['Tags'].append(tag.to_dict())


  # for question in tag.questions:
  #   dict_question = question.to_dict_single()
  #   dict_question['Tags'] = []
  #   for tag in question.tags:
  #     dict_question['Tags'].append(tag.to_dict())
  #   response['numQuestions'] += 1

  #   response['Questions'].append(dict_question)



  ## to-do: load the tags in with this response

  return response

## Post a new tag

@tag_routes.route('/', methods=['POST'])
def post_tag():
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_tag = Tag(
      tag=form.data['tag'].lower(),
      description=form.data['description']
    )
    db.session.add(new_tag)
    db.session.commit()
    return new_tag.to_dict(), 201
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

## Update a tag

@tag_routes.route('/<int:id>', methods=['PUT'])
def update_tag(id):
  try:
    tag = Tag.query.get_or_404(id)
  except:
    return {"message": "Couldn't find tag"}, 404

  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    tag.description = form.data['description']
    db.session.commit()
    return tag.to_dict()
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
