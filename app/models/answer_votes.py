from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .answer import Answer
from .user import User

class Answer_Vote(db.Model):
  __tablename__ = 'answer_votes'

  if environment == "production":
          __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  answer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("answers.id")), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  vote = db.Column(db.Boolean(), nullable=False)
  created_at = db.Column(db.DateTime(), default=datetime.utcnow())
  updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

  answer = db.relationship('Answer', back_populates='votes')
  user = db.relationship('User', back_populates='answer_votes')

  def to_dict(self):
        return {
                "id": self.id,
                "answer_id": self.answer_id,
                "user_id": self.user_id,
                "vote": self.vote,
                "created_at": self.created_at,
                "updated_at": self.updated_at
        }
