import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteAnswerModal from "../DeleteAnswer/DeleteAnswerModal";

import './AnswerUserControls.css'



const AnswerUserControls = ({answer}) => {


  return (
    <div className="answercard-user-controls">
      <Link to={`/answers/${answer.id}/edit`}>Edit</Link>
      <DeleteAnswerModal answer={answer}/>
    </div>
  )
}

export default AnswerUserControls;
