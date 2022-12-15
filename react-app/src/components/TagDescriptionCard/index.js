import { Link } from "react-router-dom";

import './TagDescriptionCard.css'

const TagDescriptionCard = ({tag}) => {
  return (
    <div className="tag-description-card"
    >
      <div className='tag-info tag-name-card all-tags'>

      <Link to={`/tags/${tag.id}`}>
      {tag.tag}
      </Link>

    </div>
    <div className="tag-info-description">
      <p>{tag.description}</p>
    </div>
    </div>
  )
}

export default TagDescriptionCard;
