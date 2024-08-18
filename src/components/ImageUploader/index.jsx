import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  updateNestedFields,
  deleteData,
} from '../../containers/Dashboard/dashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboard } from '../../App/store/selectors';
import { formattedText } from '../../utils/formattedText';

function ImageUploader({ label }) {
  const { images } = useSelector(selectDashboard);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dynamicKey = `images.logos.${formattedText(event.target.name, 'firstLetterLowercase')}`;
        const resultKeyPatch =
          label === 'Background' ? ['images.background.image'] : [dynamicKey];
        dispatch(updateNestedFields({ [resultKeyPatch]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  let labelKey;
  if (label === 'Background') {
    labelKey = images.background.image;
  } else {
    labelKey = images.logos[formattedText(label, 'firstLetterLowercase')];
  }

  const handleDelete = label => event => {
    event.preventDefault();
    const dynamicKey = `images.logos.${formattedText(label, 'firstLetterLowercase')}`;
    const resultKeyPatch =
      label === 'Background' ? ['images.background.image'] : [dynamicKey];
    dispatch(deleteData(resultKeyPatch));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="row">
        <label htmlFor={`${label}Input`} className="form-label d-block col-10">
          {label} :{' '}
          <span className="btn align-bottom p-0 ms-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-in-down"
              viewBox="0 0 16 16"
              aria-label="Choisir un fichier"
              role={'icon'}
            >
              <path
                fillRule="evenodd"
                d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
              />
            </svg>
          </span>
        </label>
      </div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .svg"
        onChange={handleImageChange}
        name={label}
        id={`${label}Input`}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {labelKey && (
        <div className="container-image-logo">
          <div className="background-hovered rounded-3">
            <span className="delete-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
                onClick={handleDelete(label)}
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </span>
          </div>
          <img
            src={labelKey}
            alt={`Selected ${label}`}
            className="visualization-logo rounded-3"
          />
        </div>
      )}
    </>
  );
}

ImageUploader.propTypes = {
  label: PropTypes.string.isRequired,
  onDataChange: PropTypes.func,
};

export default ImageUploader;
