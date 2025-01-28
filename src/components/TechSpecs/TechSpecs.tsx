import React from 'react';
import './TechSpecs.scss';
import { ProductExpand } from '../../types/ProductExpand';

type Props = {
  techSpecsObj: Partial<ProductExpand> | undefined;
};

export const TechSpecs: React.FC<Props> = (props) => {
  const { techSpecsObj } = props;

  return (
    <div className="tech-specs">
      {techSpecsObj &&
        Object.entries(techSpecsObj).map(([specKey, specValue]) => {
          const specName = specKey[0].toUpperCase() + specKey.slice(1);

          return (
            <div
              className="tech-specs__row"
              key={specKey}
            >
              <span className="tech-specs__row-name">{specName}</span>
              <span className="tech-specs__row-value">
                {Array.isArray(specValue) ? specValue.join(', ') : specValue}
              </span>
            </div>
          );
        })}
    </div>
  );
};
