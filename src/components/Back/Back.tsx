import './Back.scss';
import ArrowLeft from '../../../public/icons/Chevron (Arrow Left).svg?react';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div
        className="back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="back__icon" />
        <span className="back__text">Back</span>
      </div>
    </div>
  );
};
