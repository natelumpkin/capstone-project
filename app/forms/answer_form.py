from flask_wtf import FlaskForm
from wtforms import TextField
from wtforms.validators import DataRequired

class AnswerForm(FlaskForm):
  answer = TextField('answer', validators=[DataRequired()])
