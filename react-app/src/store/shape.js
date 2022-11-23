
let state = {
    questions: {
      allQuestions: {
        [questionId]: {
          id,
          userId,
          title,
          numAnswers,
          createdAt,
          updatedAt,
          User: {
            id,
            username
          }
        }
      },
      singleQuestion: {
        [questionId]: {
          id,
          userId,
          title,
          body,
          numAnswers,
          createdAt,
          updatedAt,
          User: {
            id,
            username
          }
        }
      }
    },
    answers: {
      [answerId]: {
        id,
        userId,
        answer,
        createdAt,
        updatedAt,
        User: {
          id,
          username
        }
      }
    }
  }
