import * as React from 'react';
import styled from 'styled-components';

import { RateNode } from '../../../types/visit';
import { InputSlider } from '../../../components/Slider';
import { SecondaryButton } from '../../../components/Button';

import { Rate } from '../addVisitActions';

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 3px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h2`
  color: #333;
  font-size: 1.375rem;
  font-weight: 700;
  margin-right: auto;
`;

const Value = styled(Name)`
  margin: 0;
  margin-left: 15px;
`;

const ParentArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #f9f9f9;
`;

const SliderWrapper = styled.div`
  margin-top: 15px;
`;

interface NodeProps {
  node: RateNode;
  setMoving: (moving: boolean) => void;
  setRate: (rate: Rate) => void;
}

export const Node = ({ node, setMoving, setRate }: NodeProps) => {
  const [value, setValue] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue(0);
    setRate({ name: node.name, score: null });
  };

  return (
    <Wrapper key={node.name}>
      <ParentArea>
        <Info>
          <Name>{node.label}</Name>
          <SecondaryButton
            size={open ? 'xsmall' : 'small'}
            text={open ? 'Avbryt' : 'Lägg till'}
            onClick={open ? handleClose : handleOpen}
          />
          {open && <Value>{value}</Value>}
        </Info>
        {open && (
          <SliderWrapper>
            <InputSlider
              value={value}
              setValue={setValue}
              onChange={() => setRate({ name: node.name, score: value })}
              onSlideStart={() => setMoving(true)}
              onSlideEnd={() => setMoving(false)}
            />
          </SliderWrapper>
        )}
      </ParentArea>
    </Wrapper>
  );
};
