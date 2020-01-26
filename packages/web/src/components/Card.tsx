import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatScore } from 'utils/format';
import { PlaceInfo } from './PlaceInfo';

export const Card = styled.div`
  padding: 15px;
  background: #fefefe;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const NeutralLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #222;
`;

const Place = styled.div`
  margin-right: 10px;
`;

const Numbers = styled.div`
  margin-right: 10px;
`;

const ScoreArea = styled.div`
  display: flex;
`;

interface ScoreBarProps {
  score: number;
}

const ScoreBar = styled.div<ScoreBarProps>`
  width: 3px;
  background: #eee;
  border-radius: 3px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${p => p.theme.colors.primary.default};
    transform: scaleY(${p => p.score / 10});
    transform-origin: 0 100%;
    border-radius: 3px;
  }
`;

interface PlaceCardProps {
  name: string;
  address: string;
  score: number;
  to: string;
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>; // From Styled Component source
}

export const CardWithScore = ({
  name,
  to,
  address,
  score,
  children,
  as = 'li'
}: PlaceCardProps) => (
  <Card as={as}>
    <NeutralLink to={to}>
      <Place>
        <PlaceInfo name={name} address={address} />
      </Place>
      <ScoreArea>
        <Numbers>
          {children}
          <Score score={score} />
        </Numbers>
        <ScoreBar score={score || 0} />
      </ScoreArea>
    </NeutralLink>
  </Card>
);

const ScoreText = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  white-space: pre;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.125rem;
  color: ${p => p.theme.colors.black.default};
`;
interface ScoreProps {
  score?: number | null;
}

export const Score = ({ score }: ScoreProps) => (
  <ScoreText>{formatScore(score)}</ScoreText>
);
