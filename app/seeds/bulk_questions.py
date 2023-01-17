from ..models import Question, User, Tag, db, SCHEMA, environment
from flask import jsonify
from random import choice

def seed_bulk_questions():
  user1 = User.query.filter(User.username == 'Demo1').one()
  user2 = User.query.filter(User.username == 'Demo2').one()
  user3 = User.query.filter(User.username == 'Demo3').one()

  user_array = [user1,user2,user3]

  tags = Tag.query.all()

  # tag1 = Tag.query.filter(Tag.tag == 'python').one()
  # tag2 = Tag.query.filter(Tag.tag == 'javascript').one()
  # tag3 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag4 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag5 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag6 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag7 = Tag.query.filter(Tag.tag == 'python').one()
  # tag8 = Tag.query.filter(Tag.tag == 'javascript').one()
  # tag9 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag10 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag11 = Tag.query.filter(Tag.tag == 'reactjs').one()
  # tag12 = Tag.query.filter(Tag.tag == 'reactjs').one()


  # question1 = Question(user_id=user1.id, title="How to make_from_tuple on the heap?", body=body1)



  question_array = []

  for user in user_array:
    i = 0
    while i < 200:
      question = Question(
        user_id=user.id,
        title="Lorem ipsum dolor sit amet",
        body=r"""
        {"blocks":[{"key":"a8qum","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"458ti","text":"Orci nulla pellentesque dignissim enim sit amet. Id nibh tortor id aliquet lectus proin nibh. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Malesuada fames ac turpis egestas sed.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fl75r","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ai0h9","text":" Nisi porta lorem mollis aliquam. ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"97n0n","text":"Ultricies mi eget mauris pharetra et ultrices. ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fgmir","text":"Diam maecenas ultricies mi eget. ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2jb0c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"49qh7","text":"Eget aliquet nibh praesent tristique magna sit. Sit amet massa vitae tortor condimentum. Nec tincidunt praesent semper feugiat nibh. Semper viverra nam libero justo. Eu sem integer vitae justo eget magna fermentum. Ut aliquam purus sit amet luctus. Eget mauris pharetra et ultrices. Consectetur lorem donec massa sapien faucibus et molestie ac feugiat. Dui accumsan sit amet nulla facilisi morbi. Ut aliquam purus sit amet luctus venenatis lectus magna fringilla. Viverra maecenas accumsan lacus vel facilisis. Massa enim nec dui nunc mattis enim ut tellus.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"175gt","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5t1fg","text":"Proin sagittis nisl rhoncus mattis rhoncus urna. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Scelerisque in dictum non consectetur a erat nam. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Nibh ipsum consequat nisl vel pretium lectus. Ipsum consequat nisl vel pretium lectus quam id leo. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Pulvinar neque laoreet suspendisse interdum consectetur libero. Scelerisque varius morbi enim nunc faucibus. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Netus et malesuada fames ac turpis. Netus et malesuada fames ac turpis egestas integer.","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5r6vg","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"alpe9","text":"Mattis ullamcorper velit sed ullamcorper morbi. Lacus vel facilisis volutpat est velit egestas dui. Tincidunt tortor aliquam nulla facilisi cras fermentum. Rutrum tellus pellentesque eu tincidunt tortor. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Nulla facilisi cras fermentum odio eu feugiat pretium. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Imperdiet sed euismod nisi porta lorem. Massa tincidunt dui ut ornare lectus sit. Maecenas accumsan lacus vel facilisis volutpat est velit egestas dui.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}
        """
      )
      tag = choice(tags)
      question.tags.append(tag)
      db.session.add(question)
      i += 1

  # db.session.add(question1)
  db.session.commit()

def undo_questions():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM questions")

  db.session.commit()
