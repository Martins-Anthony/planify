import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';

const EventEditor = ({ event, onUpdate }) => {
  const { title, day, time, duration } = event;

  return (
    <Rnd
      default={{
        x: day * 150,
        y: time * 60,
        width: 100,
        height: duration * 60,
      }}
      bounds="parent"
      onDragStop={(e, d) => {
        const newDay = Math.round(d.x / 120);
        const newTime = Math.round(d.y / 60);
        onUpdate(event.id, { day: newDay, time: newTime });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newDuration = Math.round(ref.offsetHeight / 60);
        onUpdate(event.id, { duration: newDuration });
      }}
    >
      <div
        style={{
          backgroundColor: 'lightblue',
          border: '1px solid #ccc',
          padding: '10px',
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
        }}
      >
        {title}
      </div>
    </Rnd>
  );
};

EventEditor.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    day: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventEditor;
