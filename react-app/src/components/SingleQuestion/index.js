import { useParams } from "react-router-dom";

const SingleQuestion = () => {
  const {questionId} = useParams();

  console.log(questionId)

  return (
    <h1>Hello from Single Question</h1>
  )
}

export default SingleQuestion;
