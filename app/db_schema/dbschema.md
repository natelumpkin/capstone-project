users

id int primary key
username varchar30
password varchar30

questions

id int pk
user_id int fk (users.id)
title varchar100
body text

author = users.id
answers = answers.id

answers

id int pk
user_id int
question_id int
answer text

author = users.id
question = questions.id
