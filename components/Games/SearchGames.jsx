import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './SearchResult';

function SearchGames() {
  const apiKey = process.env.API_KEY || 'c542e67aec3a4340908f9de9e86038af';
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchValue) return setSearchResults([]);

    const delayDebounceFn = setTimeout(() => {
      fetch(
        `https://rawg.io/api/games?page_size=20&search=${searchValue}&key=${apiKey}`
      )
        .then(res => res.json())
        .then(data => setSearchResults(data?.results));
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  return (
    <S.SearchGames>
      <input
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <S.SearchResults>
        {searchResults.length > 0 &&
          searchResults.map(searchResult => (
            <SearchResult game={searchResult} key={searchResult.id} />
          ))}
      </S.SearchResults>
    </S.SearchGames>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.SearchGames = styled.div`
  position: relative;

  input[type='search'] {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border: 0;
    border-radius: 0.3rem;
    outline: 0;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;

    @media (min-width: 900px) {
      margin-bottom: 1rem;
      padding: 1rem 2rem;
    }
  }
`;

S.SearchResults = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  width: 100%;
  z-index: 11;
  border-radius: 0.3rem;
`;

export default SearchGames;
