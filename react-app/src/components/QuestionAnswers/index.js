import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as answerActions from '../../store/answer'

import AnswerCard from "../AnswerCard";
import CreateAnswer from "../CreateAnswer";

const QuestionAnswers = ({question, currentUser}) => {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const answers = useSelector(state => state.answers)

  useEffect(() => {
    dispatch(answerActions.getAnswersToQuestion(question.id))
      .then(setLoaded(true))
  },[dispatch])

  const answersArr = [];
  for (let answerId in answers) {
    answersArr.push(answers[answerId])
  }

  if (!loaded) {
    return null
  }

  // console.log('question in QuestionAnswers: ', question)


  return (
    <>
    <div>
      <h4>{question.numAnswers} answers</h4>
    </div>
    <div>
      {answersArr.map(answer => (
        <AnswerCard answer={answer} currentUser={currentUser}/>
      ))}
    </div>
    <div>
        <CreateAnswer questionId={question.id}/>
    </div>
    </>
  )
}

export default QuestionAnswers;
