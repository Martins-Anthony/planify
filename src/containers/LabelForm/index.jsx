import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLabel } from '../Dashboard/dashboardSlice';
import { hideModal } from '../Modal/modalSlice';
import { v4 as uuidv4 } from 'uuid';

const LabelForm = () => {
  const [labelData, setLabelData] = useState({
    id: uuidv4(),
    name: 'Label',
    color: '#000000',
  });

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;
    setLabelData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addLabel(labelData));
    setLabelData({
      name: 'Label',
      color: '#000000',
    });
    dispatch(hideModal());
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="list-group">
        <li className="mb-3 list-group">
          <label htmlFor="eventLabel" className="form-label">
            Label
          </label>
          <input
            type="text"
            className="form-control"
            id="nameLabel"
            name="name"
            value={labelData.name}
            onChange={handleChange}
            required
          />
        </li>
        <li className="mb-3 list-group">
          <label className="form-label">Color</label>
          <input
            type="color"
            className="form-control"
            id="colorLabel"
            name="color"
            value={labelData.color}
            onChange={handleChange}
            required
          />
        </li>
      </ul>
      <button type="submit" className="btn btn-primary">
        Ajouter label
      </button>
    </form>
  );
};

export default LabelForm;
