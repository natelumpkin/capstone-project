import { Link } from "react-router-dom";

const UserControls = ({question}) => {
  return (
    <div>
      <Link to={`/questions/${question.id}/edit`}><button>Edit</button></Link>
      <button>Delete</button>
    </div>
  )
}

export default UserControls;
