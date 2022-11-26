import { Link } from "react-router-dom";
import { useState } from "react";



const AnswerUserControls = ({answer}) => {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div>
      <Link to={`/answers/${answer.id}/edit`}><button>Edit</button></Link>
      <button onClick={() => setShowDelete(true)}>Delete</button>
      {/* {showDelete && (
        <DeleteQuestion question={question} setShowDelete={setShowDelete}/>
      )} */}
    </div>
  )
}

export default AnswerUserControls;
