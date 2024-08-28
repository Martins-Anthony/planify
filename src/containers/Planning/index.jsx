import React from 'react';
import EventEditor from '../EventEditor';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboard, selectEvents } from '../../App/store/selectors';
import Background from '../Background';
import DraggableResizableBox from '../DraggableResizableBox';
import Line from '../../components/Line';
import { updateEvent } from '../EventForm/eventFormSlice';

const Planning = () => {
  const { titles, images, labelList, days } = useSelector(selectDashboard);
  const events = useSelector(selectEvents);
  const dispatch = useDispatch();

  const handleEventUpdate = (id, updates) => {
    if (updates.eventDays >= 0 && updates.eventStartTime >= 0) {
      dispatch(updateEvent({ id, updates }));
    }
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
        <div className="planning-container border w-100">
          {days.map((dayName, index) => (
            <div key={index} className="day-column">
              <div className="day-title">{dayName}</div>
              {events
                .filter(event => event.eventDays === index)
                .map(event => (
                  <EventEditor
                    key={event.id}
                    event={event}
                    onUpdate={handleEventUpdate}
                    onClick={e => e.preventDefault()}
                  />
                ))}
            </div>
          ))}
          <div className="col-4 h-100 text-white container">
            <DraggableResizableBox
              body={
                <div className="d-flex flex-column">
                  <span className="text-uppercase ps-3 fst-italic">
                    {titles.groupLabelTitle}
                  </span>{' '}
                  <Line />
                </div>
              }
              defaultX={100}
              defaultY={65}
              defaultWidth={215}
              defaultHeight={50}
            />
            <DraggableResizableBox
              body={labelList.map((label, index) => (
                <div
                  key={index}
                  style={{ background: label.color }}
                  className="p-1 col-auto w-100 text-white text-truncate mb-3 ps-3 text-uppercase fst-italic fw-bold"
                >
                  {label.name}
                </div>
              ))}
              defaultX={100}
              defaultY={115}
              defaultWidth={145}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
