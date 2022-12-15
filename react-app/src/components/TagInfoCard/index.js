import { Link } from "react-router-dom";

import './TagInfoCard.css'

// Displays a single tag's name and description,
// and calls addTag from grandparent component when it's clicked

const TagInfoCard = ({tag, setTagSearch, setTagChoice, addTag, setTagDropdown}) => {

  console.log('tag in tagInfoCard: ', tag)

  return (
    <div className="tag-info-card"
    onClick={() => {
      addTag(tag)
      setTagDropdown(false)
      setTagSearch('')
      setTagChoice('')
    }}>
      <div className='tag-info tag-name-card'>

      {tag.tag}

    </div>
    <div className="tag-info-description">
      <p>{tag.description}</p>
    </div>
    </div>
  )
}

export default TagInfoCard;
