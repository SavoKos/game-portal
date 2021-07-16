import Icon from '@components/UI/Icon';
import { useState } from 'react';
import styled from 'styled-components';

function Filter({ setFilter, title, options, dropdownStyle }) {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [subDropdown, setSubDropdown] = useState(false);
  console.log(options);

  return (
    <S.Filter>
      <p
        onClick={() => {
          setDropdownOpened(!dropdownOpened);
          setSubDropdown(false);
        }}
      >
        {title || 'Order by'}
      </p>
      <Icon
        type="icon-iov-arrow-down"
        onClick={() => {
          setDropdownOpened(!dropdownOpened);
          setSubDropdown(false);
        }}
      />
      {dropdownOpened && (
        <S.DropdownMenu style={dropdownStyle}>
          <ul>
            {options.map(filter => {
              if (filter.subOptions)
                return (
                  <li
                    onClick={() => setSubDropdown(filter.subOptions)}
                    key={filter.value}
                  >
                    {filter.name}
                    <Icon type="icon-youluPC_common_arrow_th1" />
                  </li>
                );

              return (
                <li onClick={() => setFilter(filter.value)} key={filter.value}>
                  {filter.name}
                </li>
              );
            })}
          </ul>

          {subDropdown && (
            <S.DropdownMenu className="subdropdown ">
              <ul>
                {subDropdown.map(option => (
                  <>
                    <li
                      onClick={() => setFilter(option.value)}
                      key={option.value}
                    >
                      {option.name}
                    </li>
                  </>
                ))}
                <li className="select-all">Select All</li>
              </ul>
            </S.DropdownMenu>
          )}
        </S.DropdownMenu>
      )}
    </S.Filter>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Filter = styled.div`
  position: relative;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 0.5rem;
  width: 50%;

  p {
    font-size: 1.05rem;
    width: 100%;
  }

  .anticon {
    margin-left: 0.5rem;
  }
`;

S.DropdownMenu = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 0.3rem;
  top: 4rem;
  left: 0;
  width: 100%;

  &.subdropdown {
    width: 15rem;
    right: -100%;
    left: unset;
    border-radius: 0 0.3rem 0.3rem 0;
  }

  .anticon {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-50%);
  }

  ul {
    list-style: none;

    li {
      padding: 1rem;
      padding-right: 2rem;
      color: ${({ theme }) => theme.colors.primary};
      transition: all ease 0.3s;
      position: relative;

      &.select-all {
        background-color: ${({ theme }) => theme.colors.primaryLight};
        color: #fff;
        transition: all ease 0.3s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
          border-radius: 0;
        }
      }

      &:hover {
        border-radius: 0.3rem;
        background-color: #cccccc;
        overflow: hidden;
      }
    }
  }
`;

S.SubDropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

export default Filter;
