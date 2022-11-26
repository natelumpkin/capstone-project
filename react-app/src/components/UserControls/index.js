import { Link } from "react-router-dom";
import { useState } from "react";

import DeleteQuestion from "../DeleteQuestion";

const UserControls = ({question}) => {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div>
      <Link to={`/questions/${question.id}/edit`}><button>Edit</button></Link>
      <button onClick={() => setShowDelete(true)}>Delete</button>
      {showDelete && (
        <DeleteQuestion question={question} setShowDelete={setShowDelete}/>
      )}
    </div>
  )
}

export default UserControls;
