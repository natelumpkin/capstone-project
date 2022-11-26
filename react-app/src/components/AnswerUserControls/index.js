import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteAnswerModal from "../DeleteAnswer/DeleteAnswerModal";




const AnswerUserControls = ({answer}) => {


  return (
    <div>
      <Link to={`/answers/${answer.id}/edit`}><button>Edit</button></Link>
      <DeleteAnswerModal answer={answer}/>
    </div>
  )
}

export default AnswerUserControls;
