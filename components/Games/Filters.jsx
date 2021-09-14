import useFilters from 'context/Filters';
import Filter from '@components/Games/Filter';
import { memo, useEffect, useState } from 'react';

import Icon from '@components/UI/Icon';
import styled from 'styled-components';
import useDropdownOptions from 'context/dropdownOptions';

const Filters = memo(({ sidebarActive, setSidebarActive }) => {
  const [filtersIntersecting, setFiltersIntersecting] = useState(true);
  const { platformOptions, orderOptions } = useDropdownOptions(null);
  const { Order, Platforms, ParentPlatforms } = useFilters();

  useEffect(() => {
    return filtersIntersectingHandler();
  }, []);

  const filtersIntersectingHandler = () => {
    const callback = (entries, _) => {
      entries.forEach((ent) => {
        if (ent.isIntersecting) return setFiltersIntersecting(true);
        setFiltersIntersecting(false);
      });
    };

    const options = {
      root: null,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('.filters');
    if (!target) return;

    observer.observe(target);
  };

  return (
    <S.Filters className='filters'>
      {orderOptions && (
        <Filter title='Order by' options={orderOptions} currentFilter={Order} />
      )}
      {platformOptions && (
        <Filter
          title='Platforms'
          options={platformOptions}
          currentFilter={ParentPlatforms || Platforms}
        />
      )}
      <S.ScrollToTop
        isIntersecting={filtersIntersecting}
        onClick={() => window.scrollTo(0, 0)}
      >
        <Icon type='icon-iov-arrow-up' />
      </S.ScrollToTop>
      {!sidebarActive && (
        <S.OpenSlider
          isIntersecting={filtersIntersecting}
          onClick={() => setSidebarActive(true)}
        >
          <p>Advanced</p>
        </S.OpenSlider>
      )}
    </S.Filters>
  );
});

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Filters = styled.div`
  display: flex;
  width: 100%;
`;

S.ScrollToTop = styled.div`
  visibility: ${({ isIntersecting }) =>
    isIntersecting ? 'hidden' : 'visible'};
  opacity: ${({ isIntersecting }) => (isIntersecting ? '0' : '1')};
  transition: all ease 0.3s;
  display: flex;
  color: #fff;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.seaBlue};
  z-index: 40;

  .anticon {
    font-size: 1.3rem;
  }
`;

S.OpenSlider = styled(S.ScrollToTop)`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  border-radius: 10rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  width: fit-content;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default Filters;
