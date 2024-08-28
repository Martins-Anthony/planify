import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '../../App/store/selectors';
import { hideModal } from './modalSlice';
import { useEffect } from 'react';
import EventForm from '../EventForm';
import LabelForm from '../LabelForm';

function Modal({ id }) {
  const { show, id: modalId, title, body, footer } = useSelector(selectModal);
  const dispatch = useDispatch();

  const handleClickHideModal = () => {
    dispatch(hideModal());
  };

  useEffect(() => {
    const modal = document.getElementById(id);
    if (modal) {
      if (show && id === modalId) {
        modal.classList.add('show');
        modal.style.display = 'block';
      } else {
        modal.classList.remove('show');
        modal.style.display = 'none';
      }
    }
  }, [id, show, modalId]);

  const renderBodyComponent = () => {
    switch (body) {
      case 'EventForm':
        return <EventForm />;
      case 'LabelForm':
        return <LabelForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-dark" id={`${id}Label`}>
              {title}
            </h1>
            <button
              type={'button'}
              className={'btn-close'}
              onClick={handleClickHideModal}
            />
          </div>
          <div className="modal-body">{renderBodyComponent()}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Modal;
