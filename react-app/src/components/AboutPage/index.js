
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Editor, convertFromRaw, EditorState } from 'draft-js'

import * as questionActions from '../../store/question'

import UserControls from "../UserControls";
import UserInfoCard from "../UserInfoCard";
import QuestionAnswers from "../QuestionAnswers";

import getSpecificTimeAgo from "../../utils/getSpecificTimeAgo.js";

import './AboutPage.css'

const AboutPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const currentUser = useSelector(state => state.session.user)
  const currentQuestion = {
    title: "Welcome to Crud Overgrowth!",
    body: JSON.stringify({"blocks":[{"key":"9rnaf","text":"Thanks for checking out Crud Overgrowth!","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4nitd","text":"This is a simple clone of a well known question asking site, designed to show off my skills as a developer. Feel free to browse through the questions using the links on the left, or use the demo user at the top to log in and try asking and answering questions. This site has a few features in progress, so check back soon and there may be more to discover!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}),
    User: {
      id: 'A',
      username: 'Nate'
    },
    createdAt: "2022-11-29 02:51:30.000000",
    updatedAt: "2022-11-29 02:51:30.000000"
  }

  let bodyContent
  let stateToDisplay
  // console.log(JSON.parse(currentQuestion.body))
  if (currentQuestion.body) bodyContent = convertFromRaw(JSON.parse(currentQuestion.body))
  if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)

  // console.log(currentQuestion.body);


  if (currentQuestion) {
    // console.log('currentQuestion in singleQuestion component: ', currentQuestion)

  return (
    <div id="single-question-top-container">
      <div id="single-question-header">
        <div id="single-question-header-top">
          <div id="single-question-title">
            {/* <Link to={`/questions/${currentQuestion.id}`}> */}
              <h2>{currentQuestion.title}</h2>
              {/* </Link> */}
          </div>
          <div id="single-question-ask-button">
            <Link to={currentUser ? "/questions/new" : "/login"}><button>Ask Question</button></Link>
          </div>
        </div>
        <div id="single-question-header-bottom">
          <div id="created-time">Asked {getSpecificTimeAgo(currentQuestion.createdAt)}</div>
          <div id="modified-time">Modified {getSpecificTimeAgo(currentQuestion.updatedAt)}</div>
        </div>
        <div id="header-bottom-border-div"></div>
      </div>
      <div id="content-column">
        <div id="question-content-container">
          <div className="vote-container">

          </div>
          <div id="single-question-content-right">
            <div id="single-question-body">
                {/* <p>{currentQuestion.body}</p> */}
                <Editor
                  editorState={stateToDisplay}
                  readOnly
                />
            </div>
            <div id="single-question-bottom-container">
              <div id="single-question-user-controls-container">
                {currentUser && currentQuestion.User && (currentUser.id === currentQuestion.User.id) && (
                  <UserControls question={currentQuestion}/>
                )}
              </div>
              <div id="user-information-holder">
                  <UserInfoCard user={currentQuestion.User} response={currentQuestion} responseType={'question'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
          } else {
            return (
              <h1>Hey can't find this question! Are you sure you have the right URL?</h1>
            )
          }
}

export default AboutPage;
