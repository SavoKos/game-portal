import Icon from '@components/UI/Icon';
import useFilters from 'context/Filters';
import styled from 'styled-components';

function Accordion({ data, title, openAccordion, currentAccordion }) {
  const filters = useFilters();
  const { setStores, setDevelopers, setPublishers, setGenres } = filters;
  const currentFilter = filters[currentAccordion];

  const dataItemClass = dataItem => {
    if (currentAccordion === 'Stores')
      return currentFilter?.includes(dataItem.id)
        ? 'data-item active'
        : 'data-item';

    return currentFilter?.includes(dataItem.slug)
      ? ' data-item active'
      : 'data-item';
  };

  const applyFilter = value => {
    const updateFilter = prevFilter => {
      if (!prevFilter) return value.toString();
      if (prevFilter.includes(value)) {
        return prevFilter
          .split(',')
          .filter(filterValue => filterValue !== value.toString())
          .join(',');
      }
      return prevFilter + ',' + value;
    };

    switch (currentAccordion) {
      case 'Stores':
        return setStores(prevStores => updateFilter(prevStores));
      case 'Developers':
        return setDevelopers(prevDevelopers => updateFilter(prevDevelopers));
      case 'Publishers':
        return setPublishers(prevPublishers => updateFilter(prevPublishers));
      case 'Genres':
        return setGenres(prevGenres => updateFilter(prevGenres));
    }
  };

  return (
    <S.Accordion>
      <S.AccordionHead onClick={() => openAccordion(title)}>
        <p>{title}</p>
        <Icon type="icon-iov-arrow-down" />
      </S.AccordionHead>

      {currentAccordion === title && (
        <S.AccordionContent>
          {data.map(dataItem => (
            <p
              className={`${dataItemClass(dataItem)}`}
              key={dataItem.id}
              onClick={() =>
                applyFilter(
                  currentAccordion === 'Stores' ? dataItem.id : dataItem.slug
                )
              }
            >
              {dataItem.name}
            </p>
          ))}
        </S.AccordionContent>
      )}
    </S.Accordion>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.Accordion = styled.div`
  width: 100%;
  color: #fff;
`;

S.AccordionHead = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  justify-content: space-between;
  transition: all ease 0.3s;
  cursor: pointer;

  p {
    font-size: 1.05rem;
  }

  &:hover {
    filter: brightness(1.5);
  }
`;

S.AccordionContent = styled.div`
  width: 100%;
  background-color: #12102e;
  border-radius: 0 0 0.5rem 0.5rem;

  .data-item {
    padding: 0.5rem 1rem;
    transition: all ease 0.3s;
    cursor: pointer;

    &.active {
      background-color: ${({ theme }) => theme.colors.seaBlue};
      &:hover {
        background-color: ${({ theme }) => theme.colors.seaBlue};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

export default Accordion;
