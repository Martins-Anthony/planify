import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from '../../components/ImageUploader';
import { selectDashboard } from '../../App/store/selectors';
import {
  updateNestedFields,
  resetData,
} from '../../containers/Dashboard/dashboardSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { titles } = useSelector(selectDashboard);

  const inputRef = useRef(null);

  const handleDataChange = (key, value) => {
    dispatch(updateNestedFields({ [key]: value }));
  };

  const handleChange = event => {
    handleDataChange(event.target.name, event.target.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleReset = () => {
    dispatch(resetData());
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <legend>Planify</legend>
        <ul className="list-group ">
          <li className="list-group-item">
            <label htmlFor="titleInput" className="form-label">
              Title :
            </label>
            <input
              type="text"
              id="titleInput"
              name="titles.mainTitle"
              className="form-control"
              value={titles.mainTitle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            ></input>
          </li>
          <li className="list-group-item">
            <ImageUploader label={'OneLogo'} />
          </li>
          <li className="list-group-item">
            <ImageUploader label={'TwoLogo'} />
          </li>
          <li className="list-group-item">
            <ImageUploader label={'Background'} />
          </li>
          <li className="list-group-item">
            <label htmlFor="groupLabelTitleInput" className="form-label">
              Group label title :
            </label>
            <input
              type="text"
              id="groupLabelTitleInput"
              name="tiltes.groupLabelTitle"
              className="form-control"
              value={titles.groupLabelTitle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            ></input>
          </li>
          <li className="list-group-item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleReset}
            >
              Reset
            </button>
          </li>
        </ul>
      </form>
    </>
  );
}

export default Dashboard;
