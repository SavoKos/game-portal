import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Icon from '@components/UI/Icon';
import styled from 'styled-components';
import useFilters from 'context/Filters';

function Metacritic({ title, openAccordion, currentAccordion }) {
  const { createSliderWithTooltip } = Slider;
  const Range = createSliderWithTooltip(Slider.Range);
  const { setMetacritic, metacritic } = useFilters();

  return (
    <S.Accordion>
      <S.AccordionHead onClick={() => openAccordion(title)}>
        <p>{title}</p>
        <Icon type="icon-iov-arrow-down" />
      </S.AccordionHead>
      {currentAccordion === title && (
        <S.AccordionContent>
          <Range
            min={0}
            max={100}
            step={5}
            value={metacritic}
            defaultValue={[20, 80]}
            onChange={value => setMetacritic(value)}
            tipFormatter={value => `${value}`}
          />
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
  border-radius: 0 0 0.5rem 0.5rem;
  overflow: hidden;
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
  padding: 0.5rem 1rem;

  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.seaBlue};
  }
`;

export default Metacritic;
