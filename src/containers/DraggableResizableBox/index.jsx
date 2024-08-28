import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';

const DraggableResizableBox = ({
  body,
  defaultX = 0,
  defaultY = 0,
  defaultWidth = 50,
  defaultHeight = 100,
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [size, setSize] = useState({
    width: 'auto',
    height: 'auto',
  });

  const handleResize = (e, direction, ref, delta, position) => {
    // Calculer une nouvelle taille de police en fonction des dimensions de la div
    console.log('Event:', e); // L'événement natif du navigateur
    console.log('Direction:', direction); // Direction du redimensionnement
    console.log('New Width:', ref.style.width); // Nouvelle largeur de l'élément
    console.log('New Height:', ref.style.height); // Nouvelle hauteur de l'élément
    console.log('Delta:', delta); // Changement de taille
    console.log('New Position:', position);
    const newFontSize = Math.min(ref.offsetWidth / 10, ref.offsetHeight / 5);
    setFontSize(newFontSize);
  };

  return (
    <Rnd
      default={{
        x: defaultX, // Position initiale sur l'axe x
        y: defaultY, // Position initiale sur l'axe y
        width: defaultWidth, // Largeur initiale
        height: defaultHeight, // Hauteur initiale
      }}
      minWidth={25} // Largeur minimale de la div
      minHeight={25} // Hauteur minimale de la div
      bounds="parent" // Limite les déplacements à l'intérieur du parent
      style={
        {
          // border: '1px solid #ddd', // Bordure de la div
          // backgroundColor: '#f0f0f0', // Couleur de fond
          // padding: '20px', // Padding interne
        }
      }
      // size={{ width: size.width, height: size.height }}
      onResize={handleResize}
      /*
      onResizeStop={(e, direction, ref, d) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
      */
    >
      <div style={{ width: '100%', height: '100%', fontSize: `${fontSize}px` }}>
        {body} {/* Contenu de la div */}
      </div>
    </Rnd>
  );
};

DraggableResizableBox.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired, // Texte ou composant à afficher dans la div
  defaultX: PropTypes.number.isRequired, // Position initiale sur l'axe x de la div
  defaultY: PropTypes.number.isRequired, // Position initiale sur l'axe y de la div
  defaultWidth: PropTypes.number, // Largeur initiale de la div
  defaultHeight: PropTypes.number, // Hauteur initiale de la div
};

export default DraggableResizableBox;
