import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';

import DeleteQuestion from '.';
import './DeleteQuestionModal.css';

const DeleteQuestionModal = ({question}) => {
  const [showModal, setShowModal] = useState(false);

  if (showModal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    }
  })

  console.log('ShowModal: ', showModal)

  return (
    <>
      <button onClick={(e) => {
        setShowModal(true)
      }}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteQuestion question={question} setShowDelete={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default DeleteQuestionModal;
