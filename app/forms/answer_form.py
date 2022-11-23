from flask_wtf import FlaskForm
from wtforms import TextField
from wtforms.validators import DataRequired, Length

class AnswerForm(FlaskForm):
  answer = TextField('answer', validators=[DataRequired(), Length(min=30, max=30000)])
