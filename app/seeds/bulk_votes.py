from ..models import Question, Answer, User, Answer_Vote, Question_Vote, db, environment, SCHEMA
from random import choice

def seed_bulk_votes():
  user1 = User.query.filter(User.username == 'Demo1').first()
  user2 = User.query.filter(User.username == 'Demo2').first()
  user3 = User.query.filter(User.username == 'Demo3').first()
  users = [user1, user2, user3]
  all_questions = Question.query.all()
  # print('----------------------')
  # print(all_questions)
  # print('.......................')
  # user1_answers = Answer.query.filter(Answer.user_id == user1.id).all()
  # user2_answers = Answer.query.filter(Answer.user_id == user2.id).all()
  # user3_answers = Answer.query.filter(Answer.user_id == user3.id).all()
  # all_answers = [user1_answers, user2_answers, user3_answers]
  all_answers = Answer.query.all()

  for question in all_questions:
    for user in users:
      if question.user_id != user.id:
        vote = Question_Vote(user_id=user.id, question_id=question.id, vote=choice([0,1]))
        score = question.totalScore
        if vote.vote:
          score += 1
        else:
          score -= 1
        question.totalScore = score
        db.session.add(vote)
  for answer in all_answers:
    for user in users:
      if answer.user_id != user.id:
        vote = Answer_Vote(user_id=user.id, answer_id=answer.id, vote=choice([0,1]))
        score = answer.totalScore
        if vote.vote:
          score += 1
        else:
          score -= 1
        answer.totalScore = score
        db.session.add(vote)

  db.session.commit()


  # question1 = Question.query.filter(Question.title == "How to make_from_tuple on the heap?").one()
  # question2 = Question.query.filter(Question.title == "yield from vs yield in for-loop").one()
  # question3 = Question.query.filter(Question.title == "How to solve error 'numpy' has no attribute 'float' in Python?").one()
  # question4 = Question.query.filter(Question.title == "Why are there two ways of expressing NULL in C?").one()
  # question5 = Question.query.filter(Question.title == "Difference between INT_MAX and __INT_MAX__ in C").one()
  # question6 = Question.query.filter(Question.title == "Can't push from Git Bash: Could not find UI helper 'GitHub.UI'").one()
  # question7 = Question.query.filter(Question.title == "What is the meaning of char foo(|10|) in C?").one()
  # question8 = Question.query.filter(Question.title == "Why is log(inf + inf j) equal to (inf + 0.785398 j), In C++/Python/NumPy?").one()
  # question9 = Question.query.filter(Question.title == "Better way to check if an element only exists in one array").one()
  # question10 = Question.query.filter(Question.title == "Can't deploy firebase functions (Failed to fetch Run service undefined)").one()
  # question11 = Question.query.filter(Question.title == "DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default").one()
  # question12 = Question.query.filter(Question.title == "Is it possible in C (not invoking UB) to check if two objects overlap?").one()
  # questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12]
  # question1id = question1.id
  # question2id = question2.id
  # question3id = question3.id

  # answer1id = answer1.id
  # answer2id = answer2.id
  # answer3id = answer3.id

  # for user in users:
  #   for question in questions:
  #     vote = Question_Vote(user_id=user.id, question_id=question.id, vote=1)
  #     db.session.add(vote)
  #   for user_answers in all_answers:
  #     for answer in user_answers:
  #       vote = Answer_Vote(user_id=user.id, answer_id=answer.id, vote=1)
  #       db.session.add(vote)


  # vote1 = Question_Vote(user_id=user1.id, question_id=question1id, vote=1)
  # vote2 = Question_Vote(user_id=user2.id, question_id=question2id, vote=0)
  # vote3 = Question_Vote(user_id=user3.id, question_id=question3id, vote=1)
  # vote4 = Answer_Vote(user_id=user1.id, answer_id=answer1id, vote=1)
  # vote5 = Answer_Vote(user_id=user2.id, answer_id=answer2id, vote=0)
  # vote6 = Answer_Vote(user_id=user3.id, answer_id=answer3id, vote=1)



  # db.session.add(vote1)
  # db.session.add(vote2)
  # db.session.add(vote3)
  # db.session.add(vote4)
  # db.session.add(vote5)
  # db.session.add(vote6)
  # db.session.commit()

  for question in all_questions:
    new_score = 0
    for vote in question.votes:
      if vote.vote:
        new_score += 1
      else:
        new_score -= 1
    question.totalScore = new_score

  db.session.commit()

def undo_votes():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.question_votes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.answer_votes RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM question_votes")
      db.session.execute("DELETE FROM answer_votes")

  db.session.commit()
