import { Link } from 'react-router-dom';

import './TagNameCard.css'

const TagNameCard = ({tag}) => {
  return (
    <div className='tag-name-card'>
      <Link to={`/tags/${tag.id}`}>
      {tag.tag}
      </Link>
    </div>
  )
}

export default TagNameCard;
