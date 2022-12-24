from ..models import Question, Answer, User, Answer_Vote, Question_Vote, db, environment, SCHEMA

def seed_votes():
  user1 = User.query.filter(User.username == 'Demo1').first()
  user2 = User.query.filter(User.username == 'Demo2').first()
  user3 = User.query.filter(User.username == 'Demo3').first()
  question1 = Question.query.filter(Question.user_id == user1.id).one()
  question2 = Question.query.filter(Question.user_id == user2.id).one()
  question3 = Question.query.filter(Question.user_id == user3.id).one()
  question1id = question1.id
  question2id = question2.id
  question3id = question3.id
  answer1 = Answer.query.filter(Answer.user_id == user1.id).one()
  answer2 = Answer.query.filter(Answer.user_id == user2.id).one()
  answer3 = Answer.query.filter(Answer.user_id == user3.id).one()
  answer1id = answer1.id
  answer2id = answer2.id
  answer3id = answer3.id


  vote1 = Question_Vote(user_id=user1.id, question_id=question1id, vote=1)
  vote2 = Question_Vote(user_id=user2.id, question_id=question2id, vote=0)
  vote3 = Question_Vote(user_id=user3.id, question_id=question3id, vote=1)
  vote4 = Answer_Vote(user_id=user1.id, answer_id=answer1id, vote=1)
  vote5 = Answer_Vote(user_id=user2.id, answer_id=answer2id, vote=0)
  vote6 = Answer_Vote(user_id=user3.id, answer_id=answer3id, vote=1)



  db.session.add(vote1)
  db.session.add(vote2)
  db.session.add(vote3)
  db.session.add(vote4)
  db.session.add(vote5)
  db.session.add(vote6)
  db.session.commit()

def undo_votes():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_votes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.answer_votes RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM question_votes")
      db.session.execute("DELETE FROM answer_votes")

  db.session.commit()
