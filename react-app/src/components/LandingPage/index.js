import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <div>
        <h2>Find the best answer to your technical question, help others answer theirs</h2>
        <Link to="/sign-up"><button>Join the community</button></Link>
        <p>Or browse <Link to="/questions">questions</Link></p>
      </div>
      <div><h2></h2></div>
    </div>
  )
}

export default LandingPage;
