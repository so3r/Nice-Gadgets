import ArrowDown from '../../../public/icons/Chevron (Arrow Down).svg?react';
import cn from 'classnames';
import './Dropdown.scss';
import { useEffect, useRef, useState } from 'react';
import { ItemsPerPageOptions, SortByOption } from '../../types/SortingOptions';

type Props = {
  options: SortByOption[] | ItemsPerPageOptions[];
  sort: string | number;
  handleSortBy?: (sortOption: string) => void;
  handleItemsPerPage?: (value: number) => void;
};

export const Dropdown: React.FC<Props> = (props) => {
  const { options, sort, handleSortBy, handleItemsPerPage } = props;
  const [isListOpen, setIsListOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const currentLabel =
    options.find((option) => option.value === sort)?.label || 'Select';

  useEffect(() => {
    const handleClickOutsideList = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideList);

    return () => {
      document.removeEventListener('click', handleClickOutsideList);
    };
  }, []);

  return (
    <div
      id="dropdown"
      className="dropdown"
      ref={dropdownRef}
    >
      <section
        onClick={toggleList}
        className="dropdown__current"
      >
        <p className="dropdown__current--text">
          {currentLabel === 'none' ? 'Select an option' : currentLabel}
        </p>
        <ArrowDown
          className={cn('dropdown__current--icon', { open: isListOpen })}
        />
      </section>
      <section className={cn('dropdown__menu', { opened: isListOpen })}>
        {options.map(({ label, value }) => (
          <div
            onClick={() => {
              if (handleSortBy) {
                handleSortBy(value.toString());
              } else if (handleItemsPerPage) {
                handleItemsPerPage(Number(value));
              }
              setIsListOpen(false);
            }}
            key={value}
            className={cn('dropdown__menu--option', {
              selected: sort === value,
            })}
            // className="dropdown__menu--option"
          >
            {label}
          </div>
        ))}
        {currentLabel !== 'Select' && !handleItemsPerPage && (
          <div
            onClick={() => {
              if (handleSortBy) {
                handleSortBy('none');
              }
              setIsListOpen(false);
            }}
            className="dropdown__menu--option"
          >
            none
          </div>
        )}
      </section>
    </div>
  );
};
