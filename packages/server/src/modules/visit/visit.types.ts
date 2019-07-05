import { InputType, Field, ObjectType } from 'type-graphql';
import { PlaceInput } from '../place/place.types';
import { RateInput } from './rate/rate.types';

@InputType()
export class VisitInput {
  @Field()
  visitDate: Date;

  @Field({ nullable: true })
  comment?: string;

  @Field(() => [String], { nullable: true })
  orders?: string[];

  @Field(() => [RateInput])
  ratings: RateInput[];
}

@InputType()
export class AddVisitInput {
  @Field(() => PlaceInput)
  place: PlaceInput;

  @Field(() => VisitInput)
  visit: VisitInput;
}

@ObjectType()
export class AddVisitResponse {
  @Field()
  saved: boolean;
}