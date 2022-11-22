from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Question(db.Model):
  __tablename__ = "questions"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  title = db.Column(db.String(100))
  body = db.Column(db.Text())
  created_at = db.Column(db.DateTime(), default=datetime.utcnow())
  updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

  author = db.relationship('User', back_populates="questions")
  answers = db.relationship('Answer', back_populates="question", cascade="all, delete")
