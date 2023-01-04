import { Link } from "react-router-dom";
import { useState } from "react";

import { Modal } from '../../context/Modal'
import TagForm from "../TagForm";
import './TagDescriptionCard.css'

const TagDescriptionCard = ({tag}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="tag-description-card"
    >
      <div className='tag-info tag-name-card all-tags'>

      <Link to={`/tags/${tag.id}`}>
      {tag.tag}
      </Link>

    </div>
    <div className="tag-info-description">
      <p>{tag.description ? tag.description : 'This lonely tag doesn\'t have a description yet!'}</p>
      {!tag.description && (
        <button className="tag-description-button" onClick={() => setShowModal(true)}>Add description</button>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <TagForm tag={tag} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
    </div>
  )
}

export default TagDescriptionCard;
