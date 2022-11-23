from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired, Length

class QuestionForm(FlaskForm):
  title = StringField('title', validators=[DataRequired(), Length(min=15, max=150)])
  body = TextField('body', validators=[DataRequired(), Length(min=30, max=30000)])
