import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import TagDescriptionCard from "../TagDescriptionCard";

import * as tagActions from '../../store/tag'

import './TagListPage.css'

const TagListPage = () => {

  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  // const officialTags = tags.filter(tag => tag.description)
  // console.log(officialTags)
  // const numQuestions = useSelector(state => state.questions.numQuestions)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(tagActions.getTags());
  }, [dispatch])




  return (

    <div id="single-question-top-container">
      <div id="single-question-header">
        <div id="single-question-header-top">
          <div id="single-question-title">
            <h1>Tags</h1>
          </div>
          <div>
              <Link to={currentUser ? "questions/new" : "/login"}>
                <button className="ask-question-button pointer">Ask Question</button>
              </Link>
          </div>
        </div>
        <div>

          <p className="tag-description">A tag is a keyword or label that categorizes your question with other, similar questions.<br/>Using the right tags makes it easier for others to find and answer your question.</p>
        </div>
        <div id="all-questions-header-lower">

        </div>
      </div>
      <div id="all-tags-display">
        {tags.map(tag => (
          <TagDescriptionCard key={tag.tag} tag={tag}/>
        ))}
      </div>
    </div>

  )
}

export default TagListPage;
