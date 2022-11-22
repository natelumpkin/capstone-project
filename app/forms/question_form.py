from flask_wtf import FlaskForm
from wtforms import StringField, TextField
from wtforms.validators import DataRequired

class QuestionForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  body = TextField('body', validators=[DataRequired()])
