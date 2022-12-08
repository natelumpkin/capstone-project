from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Optional, ValidationError
from app.models import Tag

def tag_exists(form, field):
  # Check if exact tag already exists
  tagName = field.data
  tag = Tag.query.filter(Tag.tag == tagName).first()
  if tag:
    raise ValidationError('This tag already exists')

class TagForm(FlaskForm):
  tag = StringField('tag', validators=[DataRequired(), Length(min=1, max=30), tag_exists])
  description = StringField('description', validators=[Length(min=10, max=500), Optional()])
