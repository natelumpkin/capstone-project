from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .question import Question
from .user import User

class Question_Vote(db.Model):
  __tablename__ = 'question_votes'

  if environment == "production":
          __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), nullable=False)
  vote = db.Column(db.Boolean(), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.utcnow())
  updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

  question = db.relationship('Question', back_populates='question_votes', cascade='all, delete')
  user = db.relationship('User', back_populates='question_votes', cascade='all, delete')
