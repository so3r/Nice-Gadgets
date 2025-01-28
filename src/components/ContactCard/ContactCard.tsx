import React from 'react';
import './ContactCard.scss';
import Github from '../../../public/icons/github-mark-white.svg?react';
import Telegram from '../../../public/icons/telegram-svgrepo-com.svg?react';

type Props = {
  photo: string;
  name: string;
  githubLink: string;
  telegramLink: string;
};

export const ContactCard: React.FC<Props> = ({
  photo,
  name,
  githubLink,
  telegramLink,
}) => {
  return (
    <div className="contact-card">
      <img
        src={photo}
        alt={`${name}'s avatar`}
        className="contact-card__photo"
      />
      <h3 className="contact-card__name">{name}</h3>

      <div className="contact-card__links">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card__link contact-card__link--github"
        >
          <Github className="contact-card__link-icon" />
        </a>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card__link contact-card__link--telegram"
        >
          <Telegram className="contact-card__link-icon" />
        </a>
      </div>
    </div>
  );
};
