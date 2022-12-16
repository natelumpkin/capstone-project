import { Route, Switch, Link } from "react-router-dom";
import AllQuestions from "../AllQuestions";
import SingleQuestion from "../SingleQuestion";
import EditAnswer from "../EditAnswer";
import LeftNavBar from "../LeftNavbar";
import AboutPage from "../AboutPage";
import TagQuestionsPage from "../TagQuestionsPage";
import TagListPage from "../TagListPage";

import './InterfaceContainer.css'

const InterfaceContainer = () => {
  return (
    <div id="content-container">
      <div id="left-column">
        <LeftNavBar/>
      </div>
      <div id="content-column">
        <Route path='/questions' exact={true}>
          <AllQuestions/>
        </Route>
        <Route path='/questions/:questionId'>
          <SingleQuestion/>
        </Route>
        <Route path='/tags' exact={true}>
          <TagListPage/>
        </Route>
        <Route path='/tags/:tagId'>
          <TagQuestionsPage/>
        </Route>
        <Route path='/answers/:answerId/edit'>
          <EditAnswer/>
        </Route>
        <Route path='/about'>
          <AboutPage/>
        </Route>
      </div>
    </div>
  )
}

export default InterfaceContainer;
