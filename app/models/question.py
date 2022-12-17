from .db import db, environment, SCHEMA, add_prefix_for_prod
from .question_tags import question_tags
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
  tags = db.relationship('Tag', secondary=question_tags, back_populates='questions')
  question_votes = db.relationship('Question_Vote', back_populates='question')


  def to_dict_single(self):
      return {
            "id": self.id,
            "userId": self.user_id,
            "title": self.title,
            "body": self.body,
            "numAnswers": len(self.answers),
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "User": {
                  "id": self.author.id,
                  "username": self.author.username
            }
      }

  def to_dict_all(self):
      return {
            "id": self.id,
            "userId": self.user_id,
            "title": self.title,
            "numAnswers": len(self.answers),
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
      }
