import React from 'react';
import './SearchInput.scss';
import SearchIcon from '../../../public/icons/Search.svg?react';

type Props = {
  query: string;
  handleQueryChange: (value: string | null) => void;
};

export const SearchInput: React.FC<Props> = (props) => {
  const { query, handleQueryChange } = props;

  return (
    <div className="search">
      <input
        type="search"
        className="search__input"
        placeholder="Search"
        value={query}
        onChange={(event) => handleQueryChange(event.target.value || null)}
      />
      <span className="search__icon">
        <SearchIcon />
      </span>
    </div>
  );
};
