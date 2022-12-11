from flask import Blueprint, request
from app.models import Question, Answer, User, db, Tag
from app.forms import TagForm
from sqlalchemy.orm import joinedload
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
    print(search_word)

    tags = Tag.query.filter(Tag.tag.ilike(f'%{search_word}%')).all()
  else:
    tags = Tag.query.all()

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

  response = {
    'Tag': tag.to_dict(),
    'Questions': [],
    'numQuestions': 0
  }



  for question in tag.questions:
    dict_question = question.to_dict_single()
    dict_question['Tags'] = []
    for tag in question.tags:
      dict_question['Tags'].append(tag.to_dict())
    response['numQuestions'] += 1

    response['Questions'].append(dict_question)



  ## to-do: load the tags in with this response

  return response

## Post a new tag

@tag_routes.route('/', methods=['POST'])
def post_tag():
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_tag = Tag(
      tag=form.data['tag'],
      description=form.data['description']
    )
    db.session.add(new_tag)
    db.session.commit()
    return new_tag.to_dict(), 201
  else:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
