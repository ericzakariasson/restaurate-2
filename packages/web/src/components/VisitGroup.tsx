import * as React from 'react';
import styled from 'styled-components';
import { CardWithScore } from '.';
import { VisitFragment } from '../graphql/types';
import { visitRoute } from '../routes';
import { formatDate } from '../utils/format';

const Group = styled.article`
  &:not(:last-of-type) {
    margin-bottom: 30px;
  }
`;

const Label = styled.h3`
  margin-bottom: 10px 15px;
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: #222;
`;

const Date = styled.time``;

const VisitList = styled.ul`
  list-style: none;
`;

const VisitCount = styled.span`
  color: #aaa;
`;

interface VisitGroupProps {
  date: Date;
  visits: VisitFragment[];
}

export const VisitGroup = ({ date, visits }: VisitGroupProps) => {
  return (
    <Group>
      <Label>
        <Date>{formatDate(date)}</Date>
        <VisitCount> – {visits.length}</VisitCount>
      </Label>
      <VisitList>
        {visits.map(visit => (
          <CardWithScore
            key={visit.id}
            name={visit.place.data.name}
            address={visit.place.data.location.address || '–'}
            to={visitRoute(visit.id)}
            score={5}
          />
        ))}
      </VisitList>
    </Group>
  );
};
