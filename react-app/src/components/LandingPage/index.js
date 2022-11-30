import { Link } from "react-router-dom";

import './LandingPage.css'

const LandingPage = () => {
  return (
    <div id="landing-page-container">
      <div id="landing-page-inner-box">
        <div id="landing-page-orange-quote">
          <i class="fa-solid fa-magnifying-glass orange"></i>
          <h2>Find the best answer to your technical question, help others answer theirs</h2>
          <Link to="/sign-up"><button className="orange-button">Join the community</button></Link>
          <p>Or browse <Link to="/questions">questions</Link></p>
        <div><div id="orange-quote-polygon"></div>
        </div>
        </div>
      <div id="slogan-container"><h2 className="slogan-quote">Ask a question, <span className="orange">clear the pipes!</span></h2></div>
      </div>
    </div>
  )
}

export default LandingPage;
