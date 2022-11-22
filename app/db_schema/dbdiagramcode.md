Table users {
  id int [pk]
  username varchar
  hashedPassword varchar
  fullName varchar
  about varchar
  location varchar
  title varchar
  profileImg varchar
  websiteLink varchar
}

Table user_profile {
  id int [pk]
  user_id int
  about varchar
  location varchar
  title varchar
  profileImg varchar
}

Table questions {
  id int [pk]
  user_id int
  title varchar
  body varchar
}

Table answers {
  id int [pk]
  user_id int
  question_id int
  answer varchar
}

Table tags {
  id int [pk]
  tag varchar
}

Table question_tags {
  id int [pk]
  tag_id int
  question_id int
}

Table user_votes {
  id int [pk]
  vote boolean
  question_id int
  user_id int
}

Ref: "users"."id" < "questions"."user_id"

Ref: "answers"."question_id" > "questions"."id"

Ref: "users"."id" < "answers"."user_id"

Ref: "questions"."id" < "question_tags"."question_id"

Ref: "tags"."id" < "question_tags"."tag_id"

Ref: "users"."id" - "user_profile"."id"

Ref: "users"."id" < "user_votes"."user_id"

Ref: "questions"."id" < "user_votes"."question_id"
