import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import * as tagActions from '../../store/tag'
import './TagForm.css'

const TagForm = ({tag, setShowModal}) => {

  const dispatch = useDispatch()

  const [description, setDescription] = useState('')
  const [tagErrors, setTagErrors] = useState([])
  const [disableSubmit, setDisableSubmit] = useState(true)

  useEffect(() => {
    let errors = []
    if (description.length < 10) {
      errors.push('Description must be 10 characters or more')
      setDisableSubmit(true)
    }
    else if (description.length > 500) {
      errors.push('Description must be 500 characters or less')
      setDisableSubmit(true)
    }
    else {
      setDisableSubmit(false)
    }
    setTagErrors(errors)
  },[description])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!tagErrors.length) {
      let tagBody = {
        tag: 'tag',
        description: description
      }
      const response = await fetch(`/api/tags/${tag.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(tagBody)
      })
      if (response.ok) {
        dispatch(tagActions.getTags())
        setShowModal(false)
      }
    }

  }

  return (
    <div className="delete-modal">
      <form onSubmit={onSubmit}>
        <h2>Add a description to tag [{tag.tag}]</h2>
        <textarea
        className="tag-description-input"
        maxLength={500}
        minLength={10}
        type="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}></textarea>
        <div className="delete-button-container tag-update-container">
          <button
            className="cancel-modal"
            type="button"
            onClick={() => setShowModal(false)}>
              Cancel
            </button>
          <button
          className="submit-tag-description"
          disabled={disableSubmit}>Submit Description</button>
        </div>
        <div className="list-errors-parent">
          {tagErrors.map(error => (
            <div className="list-errors" key={error}>{error}</div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default TagForm;
