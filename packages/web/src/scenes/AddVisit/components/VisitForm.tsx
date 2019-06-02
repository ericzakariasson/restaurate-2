import * as React from 'react';
import { rateNodes } from '../../../constants';

import { PageTitle, ListInput } from '../../../components';
import { RateVisit } from './RateVisit';
import { Comment } from './Comment';
import { VisitDate } from './VisitDate';

import { Rate } from '../addVisitActions';

interface VisitFormProps {
  orders: string[];
  addOrder: (order: string) => void;
  removeOrder: (order: string) => void;
  setRate: (rate: Rate) => void;
  setMoving: (value: boolean) => void;
  averageScore: number | null;
  setComment: (value: string) => void;
  setDate: (date: Date) => void;
}

export const VisitForm = ({
  orders,
  addOrder,
  removeOrder,
  setRate,
  setMoving,
  averageScore,
  setComment,
  setDate
}: VisitFormProps) => {
  return (
    <>
      <PageTitle text="Besök" />
      <ListInput
        label="Beställningar"
        items={orders}
        addItem={addOrder}
        removeItem={removeOrder}
      />
      <RateVisit
        nodes={rateNodes}
        setRate={setRate}
        setMoving={setMoving}
        averageScore={averageScore}
      />
      <Comment setComment={setComment} />
      <VisitDate setDate={setDate} />
    </>
  );
};