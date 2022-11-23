from ..models import Question, User, db, SCHEMA, environment

def seed_questions():
  user1 = User.query.filter(User.username == 'Demo1').one()
  user2 = User.query.filter(User.username == 'Demo2').one()
  user3 = User.query.filter(User.username == 'Demo3').one()

  question1 = Question(user_id=user1.id, title="What's the best way to integrate a z function in a mongodb backend database?", body="This doesn't make any sense to me and I'm about to cry. Someone please help")
  question2 = Question(user_id=user2.id, title="What do I do if my computer won't run my scripts?", body="My computer isn't running any of my scripts and I'm freaking out. How can I figure this out?")
  question3 = Question(user_id=user3.id, title="I'm making $175,000 a year but I think I'm work 300k. What gives?", body="I need to convince my boss of my worth. The only way I can think to do this is refactoring our entire codebase from python to C+. Is this a good idea?")

  db.session.add(question1)
  db.session.add(question2)
  db.session.add(question3)
  db.session.commit()

def undo_questions():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM questions")

  db.session.commit()
