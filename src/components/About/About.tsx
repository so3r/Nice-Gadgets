import React from 'react';
import './About.scss';

type Props = {
  description: { title: string; text: string[] }[] | undefined;
};

export const About: React.FC<Props> = (props) => {
  const { description } = props;

  return (
    <div className="about">
      {description?.map((part) => (
        <div
          className="about__part"
          key={part.title}
        >
          <h4 className="about__title">{part.title}</h4>
          <div className="about__text">
            {part.text.map((paragraph) => (
              <p
                className="about__text-paragraph"
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
