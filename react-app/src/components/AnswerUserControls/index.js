import { Link } from "react-router-dom";
import { useState } from "react";
import DeleteAnswer from "../DeleteAnswer";


const AnswerUserControls = ({answer}) => {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div>
      <Link to={`/answers/${answer.id}/edit`}><button>Edit</button></Link>
      <button onClick={() => {
        setShowDelete(true)
        window.scrollTo(0,0)
        }}>Delete</button>
      {showDelete && (
        <DeleteAnswer answer={answer} setShowDelete={setShowDelete}/>
      )}
    </div>
  )
}

export default AnswerUserControls;
