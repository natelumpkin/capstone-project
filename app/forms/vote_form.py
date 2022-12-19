from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired, Length, Optional, ValidationError
from app.models import Tag

class VoteForm(FlaskForm):
  vote = BooleanField('vote', validators=[DataRequired()])
