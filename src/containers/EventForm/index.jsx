import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboard } from '../../App/store/selectors';
import { generateTimeOptionsObject } from '../../utils/generateTimeOptions';
import { hideModal } from '../Modal/modalSlice';
import { addEvent } from './eventFormSlice';
import { v4 as uuidv4 } from 'uuid';

const EventForm = () => {
  const { labelList, days } = useSelector(selectDashboard);
  const [formData, setFormData] = useState({
    id: uuidv4(),
    eventLabel: labelList[0]?.name,
    eventDays: 0,
    eventStartTime: 0,
    eventDuration: 1,
    eventSubLabelOne: '',
    eventSubLabelTwo: '',
  });

  const dispatch = useDispatch();

  const timeOptions = generateTimeOptionsObject();
  const handleChange = event => {
    const { name, value } = event.target;
    let parsedValue = value;
    if (
      name === 'eventDays' ||
      name === 'eventStartTime' ||
      name === 'eventDuration'
    ) {
      parsedValue = Number(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addEvent(formData));
    dispatch(hideModal());
  };

  const formatValue = value => {
    const hours = Math.floor(value);
    const minutes = (value - hours) * 60;

    if (hours === 0 && minutes === 0) {
      return '';
    }

    if (hours === 0) {
      return `${minutes} min`;
    }

    if (minutes === 0) {
      return `${hours} h`;
    }

    return `${hours} h ${minutes} min`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="list-group">
        {labelList.length > 0 && (
          <li className="mb-3 list-group">
            <label htmlFor="eventLabel" className="form-label">
              Label
            </label>
            <select
              className="form-select"
              onChange={handleChange}
              name="eventLabel"
            >
              {labelList.map(label => {
                return (
                  <option key={label.id} value={label.name}>
                    {label.name}
                  </option>
                );
              })}
            </select>
          </li>
        )}
        <li className="mb-3 list-group">
          <label className="form-label">Days</label>
          <select
            className="form-select"
            aria-label="select label"
            onChange={handleChange}
            name="eventDays"
          >
            {days.map((eventDays, index) => {
              return (
                <option key={eventDays} value={index}>
                  {eventDays}
                </option>
              );
            })}
          </select>
        </li>
        <li className="mb-3 list-group">
          <label htmlFor="eventStartTime" className="form-label">
            Start time
          </label>
          <select
            className="form-control"
            id="eventStartTime"
            name="eventStartTime"
            value={formData.eventStartTime}
            onChange={handleChange}
            required
          >
            {Object.keys(timeOptions).map((time, index) => (
              <option key={index} value={timeOptions[time].timeNumber}>
                {timeOptions[time].timeString}
              </option>
            ))}
          </select>
        </li>
        <li className="mb-3 list-group">
          <label htmlFor="duration" className="form-label">
            Duration {formatValue(formData.eventDuration)}
            <input
              type="number"
              className="form-control"
              id="duration"
              name="eventDuration"
              value={formData.eventDuration}
              onChange={handleChange}
              step={0.25}
              min={0.25}
              max={12}
              required
            />
          </label>
        </li>
        <li className="mb-3 list-group">
          <label htmlFor="subLabelOne" className="form-label">
            SubLabelOne
            <input
              type="text"
              className="form-control"
              id="subLabelOne"
              name="eventSubLabelOne"
              value={formData.eventSubLabelOne}
              onChange={handleChange}
              required
            />
          </label>
        </li>
        <li className="mb-3 list-group">
          <label htmlFor="subLabelTwo" className="form-label">
            SubLabelTwo
            <input
              type="text"
              className="form-control"
              id="subLabelTwo"
              name="eventSubLabelTwo"
              value={formData.eventSubLabelTwo}
              onChange={handleChange}
              required
            />
          </label>
        </li>
      </ul>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          Add event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
