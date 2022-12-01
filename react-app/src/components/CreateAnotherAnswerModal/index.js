import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';

const CreateAnotherAnswerModal = ({setWantsToAddAnotherAnswer}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showModal])

  return (
    <>
      <button
        id="post-question-button"
        className="ask-question-button"
        onClick={() => setShowModal(true)}>
          Add Another Answer
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="delete-modal">
            <h2>crudovergrowth.com says</h2>
            <p>Are you sure you want to add another answer?</p>
            <p>You could use the edit link to refine and improve your existing
answer, instead.</p>
            <div className="delete-button-container">
              <button id="cancel-delete" type="button" onClick={() => setShowModal(false)}>Cancel</button>
              <button id="confirm-delete" type="button" onClick={() => setWantsToAddAnotherAnswer(true)}>OK</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CreateAnotherAnswerModal;
