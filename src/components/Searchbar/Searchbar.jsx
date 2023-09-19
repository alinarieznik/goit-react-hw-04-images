import { useState } from 'react';
import Notiflix from 'notiflix';
import { SiGooglebigquery } from 'react-icons/si';
import {
  StyledHeader,
  StyledSearchForm,
  StyledSearchButton,
  StyledInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notiflix.Notify.warning('Please, fill the main field');
      return;
    }

    onSubmit(query);
    // this.setState({ query: '' });
  };

  return (
    <StyledHeader>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchButton type="submit">
          <SiGooglebigquery />
        </StyledSearchButton>
        <StyledInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleQueryChange}
        />
      </StyledSearchForm>
    </StyledHeader>
  );
}
