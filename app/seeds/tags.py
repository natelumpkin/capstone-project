from ..models import Question, Tag, db, SCHEMA, environment
from flask import jsonify

def seed_tags():
  question1 = Question.query.filter(Question.title == "What's the best way to integrate a z function in a mongodb backend database?").one()
  question2 = Question.query.filter(Question.title == "What do I do if my computer won't run my scripts?").one()


  tag1 = Tag(tag="python", description="Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax.")
  tag2 = Tag(tag="javascript", description="For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind that JavaScript is NOT the same as Java!")
  tag3 = Tag(tag="reactjs", description="React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.")
  tag4 = Tag(tag="react-router", description="React Router - A complete routing library for React inspired by Ember's routing system")

  db.session.add(tag1)
  db.session.add(tag2)
  db.session.add(tag3)
  db.session.add(tag4)
  question1.tags.append(tag1)
  question1.tags.append(tag2)
  question1.tags.append(tag3)
  question2.tags.append(tag4)
  db.session.commit()

def undo_tags():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM tags")

  db.session.commit()
