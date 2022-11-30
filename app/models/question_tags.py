from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

question_tags = db.Table(
  'question_tags',
  db.Model.metadata,
  db.Column('question_id', db.Integer, db.ForeignKey(add_prefix_for_prod("questions.id")), primary_key=True),
  db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True),
  db.Column('created_at', db.DateTime, default=datetime.utcnow()),
  schema=SCHEMA if environment == "production" else None
)
