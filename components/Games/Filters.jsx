import useFilters from 'context/Filters';
import Filter from '@components/Games/Filter';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  orderOptions,
  platformOptions as platformOpt,
} from 'functions/dropdownOptions';
import Icon from '@components/UI/Icon';

function Filters() {
  const [filtersIntersecting, setFiltersIntersecting] = useState(true);
  const [platformOptions, setPlatformOptions] = useState(null);
  const { Order, Platforms, ParentPlatforms } = useFilters();

  useEffect(async () => {
    const options = await platformOpt();
    setPlatformOptions(options);
    filtersIntersectingHandler();
  }, []);

  const filtersIntersectingHandler = () => {
    const callback = (entries, _) => {
      entries.forEach(ent => {
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
    <S.Filters className="filters">
      <Filter title="Order by" options={orderOptions} currentFilter={Order} />
      <Filter
        title="Platforms"
        options={platformOptions}
        currentFilter={ParentPlatforms || Platforms}
      />
      <S.ScrollToTop
        isIntersecting={filtersIntersecting}
        onClick={() => window.scrollTo(0, 0)}
      >
        <Icon type="icon-iov-arrow-up" />
      </S.ScrollToTop>
    </S.Filters>
  );
}

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

  .anticon {
    font-size: 1.3rem;
  }
`;

export default Filters;
