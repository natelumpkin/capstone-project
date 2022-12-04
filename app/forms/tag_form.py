from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Optional

class TagForm(FlaskForm):
  tag = StringField('tag', validators=[DataRequired(), Length(min=1, max=30)])
  description = StringField('description', validators=[Length(min=10, max=500), Optional()])
