import { Link } from "react-router-dom";
import { useState } from "react";

import DeleteQuestion from "../DeleteQuestion";
import DeleteQuestionModal from "../DeleteQuestion/DeleteQuestionModal";

const UserControls = ({question}) => {

  return (
    <div>
      <Link to={`/questions/${question.id}/edit`}><button>Edit</button></Link>
      <DeleteQuestionModal question={question}/>
    </div>
  )
}

export default UserControls;
