import { Link } from "react-router-dom";
// import { useState } from "react";

// import DeleteQuestion from "../DeleteQuestion";
import DeleteQuestionModal from "../DeleteQuestion/DeleteQuestionModal";

import './UserControls.css'

const UserControls = ({question}) => {

  return (
    <div className="questioncard-user-controls">
      <Link to={`/questions/${question.id}/edit`}>Edit</Link>
      <DeleteQuestionModal question={question}/>
    </div>
  )
}

export default UserControls;
