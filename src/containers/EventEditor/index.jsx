import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import { useSelector } from 'react-redux';
import { selectDashboard } from '../../App/store/selectors';
import { generateTimeOptionsObject } from '../../utils/generateTimeOptions';

const EventEditor = ({ event, onUpdate }) => {
  const {
    eventLabel,
    eventDays,
    eventStartTime,
    eventDuration,
    eventSubLabelOne,
    eventSubLabelTwo,
  } = event;

  const { labelList } = useSelector(selectDashboard);

  const labelColor = labelList.filter(label => label.name === eventLabel);

  const timeOptionsEvent = (timeEvent, type) => {
    const timeOptions = generateTimeOptionsObject();
    const value = timeOptions.filter(
      eventValue => eventValue.timeNumber === timeEvent
    );
    return value[0][type];
  };
  const valueEnd =
    timeOptionsEvent(eventStartTime, 'timeNumber') + eventDuration;

  return (
    <Rnd
      default={{
        x: eventDays,
        y: 40 + eventStartTime * 60,
        width: '100%',
        height: eventDuration * 60,
      }}
      bounds="parent"
      onResizeStop={(e, direction, ref, delta, position) => {
        const newDuration = Math.round(ref.offsetHeight / 60);
        onUpdate(event.id, { eventDuration: newDuration });
      }}
    >
      <div
        style={{
          color: labelColor[0].color,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        {timeOptionsEvent(eventStartTime, 'timeString') +
          ' - ' +
          timeOptionsEvent(valueEnd, 'timeString')}
      </div>
      <div
        style={{
          backgroundColor: labelColor[0].color,
          border: '1px solid #ccc',
          padding: '10px',
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h5>{eventLabel}</h5>
        <div>{eventSubLabelOne}</div>
        <div>{eventSubLabelTwo}</div>
      </div>
    </Rnd>
  );
};

EventEditor.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventLabel: PropTypes.string.isRequired,
    eventDays: PropTypes.number.isRequired,
    eventStartTime: PropTypes.number.isRequired,
    eventDuration: PropTypes.number.isRequired,
    eventSubLabelOne: PropTypes.string,
    eventSubLabelTwo: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventEditor;
