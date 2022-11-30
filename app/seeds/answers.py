from ..models import Answer, Question, User, db, SCHEMA, environment
from flask import jsonify

def seed_answers():
  user1 = User.query.filter(User.username == 'Demo1').first()
  user2 = User.query.filter(User.username == 'Demo2').first()
  user3 = User.query.filter(User.username == 'Demo3').first()
  question1 = Question.query.filter(Question.user_id == user1.id).one()
  question2 = Question.query.filter(Question.user_id == user2.id).one()
  question1id = question1.id
  question2id = question2.id

  body1 = """{"blocks":[{"key":"e7j5a","text":"Hey don't worry man, just try to scrub your harddrive with scent-free dish-soap. I like to use mister soap brand, it works great","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body2 = """{"blocks":[{"key":"3rone","text":"Just delete your database and try again without one, it's actually easier to hold data without a database","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body3 = """{"blocks":[{"key":"5dn3d","text":"You've got a typo on line 1094, you need to replace to the lowercase m with a M","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""

  question1 = Answer(user_id=user1.id, question_id=question1id, answer=body1)
  question2 = Answer(user_id=user2.id, question_id=question2id, answer=body2)
  question3 = Answer(user_id=user3.id, question_id=question2id, answer=body3)

  db.session.add(question1)
  db.session.add(question2)
  db.session.add(question3)
  db.session.commit()

def undo_answers():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM answers")

  db.session.commit()
