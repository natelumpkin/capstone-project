import { Route, Switch, Link } from "react-router-dom";
import AllQuestions from "../AllQuestions";
import SingleQuestion from "../SingleQuestion";

const InterfaceContainer = () => {
  return (
    <div id="content-container">
      <div id="left-column">
      </div>
      <div id="content-column">
        <h1>Hello from Interface Container!</h1>
        <Route path='/questions' exact={true}>
          <AllQuestions/>
        </Route>
        <Route path='/questions/:questionId'>
          <SingleQuestion/>
        </Route>
      </div>
    </div>
  )
}

export default InterfaceContainer;
