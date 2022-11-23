from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Answer(db.Model):
  __tablename__ = "answers"

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")))
  answer = db.Column(db.Text())
  created_at = db.Column(db.DateTime(), default=datetime.utcnow())
  updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

  author = db.relationship('User', back_populates="answers")
  question = db.relationship('Question', back_populates="answers")

  def to_dict(self):
      return {
            "id": self.id,
            "userId": self.user_id,
            "questionId": self.question_id,
            "answer": self.answer,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
      }
