import { Route, Switch, Link } from "react-router-dom";
import AllQuestions from "../AllQuestions";
import SingleQuestion from "../SingleQuestion";
import EditAnswer from "../EditAnswer";

import './InterfaceContainer.css'

const InterfaceContainer = () => {
  return (
    <div id="content-container">
      <div id="left-column">
      </div>
      <div id="content-column">
        <Route path='/questions' exact={true}>
          <AllQuestions/>
        </Route>
        <Route path='/questions/:questionId'>
          <SingleQuestion/>
        </Route>
        <Route path='/answers/:answerId/edit'>
          <EditAnswer/>
        </Route>
      </div>
    </div>
  )
}

export default InterfaceContainer;
