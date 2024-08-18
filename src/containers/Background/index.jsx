import React from 'react';
import { Rnd } from 'react-rnd';
import { useSelector } from 'react-redux';
import { selectDashboard } from '../../App/store/selectors';

const Background = () => {
  const { images } = useSelector(selectDashboard);
  const coordinate = images?.background.coordinate;

  return (
    <>
      {images?.background.image && (
        <Rnd
          default={{
            x: coordinate.x,
            y: coordinate.y,
            width: coordinate.w,
            height: coordinate.h,
          }}
          style={{ zIndex: -1 }}
          enableResizing={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
          }}
          lockAspectRatio={false}
        >
          <img
            style={{
              boxSizing: 'border-box',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
            src={images?.background.image}
            alt="Background"
          />
        </Rnd>
      )}
    </>
  );
};

export default Background;
