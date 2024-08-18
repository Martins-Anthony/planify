import React, { useState } from 'react';
import EventEditor from '../EventEditor';
import { useSelector } from 'react-redux';
import { selectDashboard } from '../../App/store/selectors';
import Background from '../Background';

const Planning = () => {
  const { titles, images } = useSelector(selectDashboard);
  const [events, setEvents] = useState([
    { id: 1, title: 'Cours de Yoga', day: 0, time: 1.5, duration: 1 },
    { id: 2, title: 'Pilates', day: 1, time: 11, duration: 1 },
  ]);

  const handleEventUpdate = (id, updates) => {
    setEvents(
      events.map(event => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  return (
    <div className="container border rounded-4 p-0 overflow-hidden position-relative">
      <Background />
      <header className="py-3 row justify-content-between align-items-center">
        <div className="row col-auto align-items-center ps-5">
          {images.logos.oneLogo && (
            <img
              src={images.logos.oneLogo}
              alt="oneLogo"
              className="logoOne col-auto"
            />
          )}
          {images.logos.twoLogo && (
            <img
              src={images.logos.twoLogo}
              alt="twoLogo"
              className="logoTwo col-auto"
            />
          )}
        </div>
        {titles.mainTitle && (
          <h2 className="text-uppercase fst-italic fw-bold col-auto m-0 pe-5">
            {titles.mainTitle}
          </h2>
        )}
      </header>
      <div className="position-relative">
        <div className="banner-red"></div>
        <div className="planning-container">
          {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(
            (dayName, index) => (
              <div key={index} className="day-column">
                <div className="day-title">{dayName}</div>
                {events
                  .filter(event => event.day === index)
                  .map(event => (
                    <EventEditor
                      key={event.id}
                      event={event}
                      onUpdate={handleEventUpdate}
                    />
                  ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Planning;
