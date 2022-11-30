import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';

import DeleteAnswer from '.';
import './DeleteAnswerModal.css';

const DeleteAnswerModal = ({answer}) => {
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

  // console.log('ShowModal: ', showModal)

  return (
    <>
      <Link onClick={(e) => {
        setShowModal(true)
      }}>Delete</Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteAnswer answer={answer} setShowDelete={setShowModal}/>
        </Modal>
      )}
    </>
  )
}

export default DeleteAnswerModal;
