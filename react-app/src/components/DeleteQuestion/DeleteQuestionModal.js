import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';

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
      <Link onClick={(e) => {
        setShowModal(true)
      }}>Delete</Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteQuestion question={question} setShowDelete={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default DeleteQuestionModal;
