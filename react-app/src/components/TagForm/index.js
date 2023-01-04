import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import * as tagActions from '../../store/tag'

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
    <form onSubmit={onSubmit}>
      <input
      maxLength={500}
      minLength={10}
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}></input>
      <button
      disabled={disableSubmit}>Submit Description</button>
      {tagErrors.map(error => (
        <div key={error}>{error}</div>
      ))}
    </form>
  )
}

export default TagForm;
