from .db import db, environment, SCHEMA, add_prefix_for_prod
from .question_tags import question_tags
from datetime import datetime

class Tag(db.Model):
  __tablename__ = "tags"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  tag = db.Column(db.String(30), nullable=False)
  description = db.Column(db.String())

  questions = db.relationship('Question', secondary=question_tags, back_populates='tags')

  @property
  def created_at(self):
    return self.created_at

  @created_at.setter
  def created_at(self):
    self.created_at = datetime.datetime.now(datetime.timezone.utc)

  @property
  def updated_at(self):
    return self.updated_at

  @updated_at.setter
  def updated_at(self):
    self.updated_at = datetime.datetime.now(datetime.timezone.utc)

  def to_dict(self):
    return {
      "id": self.id,
      "question_id": self.question_id,
      "tag": self.tag,
      "description": self.description
    }
