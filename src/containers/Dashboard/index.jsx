import React, { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from '../../components/ImageUploader';
import { selectDashboard } from '../../App/store/selectors';
import {
  updateNestedFields,
  resetData,
  deleteLabel,
} from '../../containers/Dashboard/dashboardSlice';
import { hideModal, showModal } from '../Modal/modalSlice';
import { resetEvents } from '../../containers/EventForm/eventFormSlice';
import Modal from '../Modal';
import DeleteLogo from '../../components/DeleteLogo';
import { useEffect } from 'react';
import { formattedText } from '../../utils/formattedText';

function Dashboard() {
  const dispatch = useDispatch();
  const dashboardData = useSelector(selectDashboard);
  const { titles, labelList } = dashboardData;

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
    dispatch(resetEvents());
  };

  useEffect(() => {
    dispatch(hideModal());
  }, []);

  const dashboardObject = [
    {
      liClassName: 'text-center',
      fieldName: 'button',
      fieldClassName: 'btn-primary',
      label: 'create event',
      onClick: event => {
        event.preventDefault();
        dispatch(
          showModal({
            title: 'create event',
            body: 'EventForm',
            id: 'addEvent',
          })
        );
      },
    },
    {
      fieldName: 'input',
      label: 'title',
      name: 'titles.mainTitle',
    },
    {
      fieldName: 'component',
      component: ImageUploader,
      label: 'oneLogo',
    },
    {
      fieldName: 'component',
      component: ImageUploader,
      label: 'twoLogo',
    },
    {
      fieldName: 'component',
      component: ImageUploader,
      label: 'background',
    },
    {
      fieldName: 'input',
      label: 'group label title',
      name: 'titles.groupLabelTitle',
    },
  ];

  const getNestedProperty = (path, obj) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const mapDashboardObject = data => {
    let component;

    switch (data.fieldName) {
      case 'button':
        component = (
          <li
            className={`list-group-item ${data.liClassName ? data.liClassName : ''}`}
          >
            <button
              className={`btn ${data.fieldClassName ? data.fieldClassName : ''}`}
              onClick={data.onClick}
            >
              {formattedText(data.label, 'firstLetterUppercase')}
            </button>
          </li>
        );
        break;
      case 'input':
        component = (
          <li
            className={`list-group-item ${data.liClassName ? data.liClassName : ''}`}
          >
            <label
              htmlFor={`${formattedText(data.label, 'camelCase')}Input`}
              className="form-label"
            >
              {formattedText(data.label, 'firstLetterUppercase')} :
            </label>
            <input
              type="text"
              id={`${formattedText(data.label, 'camelCase')}Input`}
              name={data.name}
              className="form-control"
              value={getNestedProperty(data.name, dashboardData)}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            ></input>
          </li>
        );
        break;
      case 'component':
        component = (
          <li
            className={`list-group-item ${data.liClassName ? data.liClassName : ''}`}
          >
            <data.component
              label={formattedText(data.label, 'firstLetterUppercase')}
            />
          </li>
        );
        break;
      default:
        break;
    }
    return component;
  };

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <legend>Planify</legend>
        <ul className="list-group">
          {dashboardObject.map((item, index) => {
            return <Fragment key={index}>{mapDashboardObject(item)}</Fragment>;
          })}
          <li className="list-group-item text-center">
            {labelList.length <= 4 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={event => {
                  event.preventDefault();
                  dispatch(
                    showModal({
                      title: 'Créer label',
                      body: 'LabelForm',
                      id: 'addLabel',
                    })
                  );
                }}
              >
                Add label
              </button>
            )}
          </li>
          {labelList.length > 0 && (
            <li className="list-group-item">
              <ul className="list-group">
                {labelList.map((label, index) => (
                  <li className="list-group-item" key={index}>
                    <div className="d-flex container ps-0">
                      <div
                        style={{ background: label.color }}
                        className="p-1 col-auto w-100 text-white text-truncate ps-3 text-uppercase"
                      >
                        {label.name}
                      </div>
                      <div className="">
                        <DeleteLogo
                          handleDelete={event => {
                            event.preventDefault();
                            dispatch(deleteLabel(label.id));
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <span className="list-group fs-6">max 5 labels</span>
            </li>
          )}
          <li className="list-group-item text-center">
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
      <Modal id="addEvent" />
      <Modal id="addLabel" />
    </>
  );
}

export default Dashboard;
