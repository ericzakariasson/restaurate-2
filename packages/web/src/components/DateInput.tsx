import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  border-radius: 5px;
  background: #f5f5f5;
  border: 1px solid #eee;
  outline: none;
  font-size: 1.125rem;
  width: 100%;
  transition: ${p => p.theme.transition};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Readable = styled.label`
  padding: 15px;
  flex: 1;
  text-align: center;
  height: 50px;
  border-radius: 0 3px 3px 0;
  /* border: 1px solid #eee; */
  color: ${p => p.theme.colors.primary.hues[0]};
  background: #fff;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Input = styled.input`
  border-radius: 3px 0 0 3px;
  height: 50px;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 15px;
  border-right: 1px solid #eee;
  -webkit-appearance: none;
  appearance: none;
  text-align: center;
  flex: 1;

  &::-webkit-clear-button {
    display: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicato {
    display: none;
  }
`;

function toReadableDate(date: Date): string {
  return date.toLocaleDateString('sv-SE', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
}

interface DateInputProps {
  onChange: (date: Date) => void;
  initialDate?: Date;
}

export const DateInput = ({
  onChange,
  initialDate = new Date()
}: DateInputProps) => {
  const [date, setDate] = React.useState<Date>(initialDate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
    onChange(newDate);
  };

  const readable = toReadableDate(date);

  const inputId = 'visit-date-input';
  const inputValue = date.toISOString().substring(0, 10);

  return (
    <Wrapper>
      <Input
        id={inputId}
        value={inputValue}
        onChange={handleChange}
        type="date"
      />
      <Readable htmlFor={inputId}>{readable}</Readable>
    </Wrapper>
  );
};