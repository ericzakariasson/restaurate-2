import gql from 'graphql-tag';

import * as fragments from './';

export default gql`
  fragment Place on Place {
    id
    providerPlaceId
    priceLevel
    types
    averageScore
    visitCount
    tags {
      ...PlaceTag
    }
    data {
      ...PlaceData
    }
    user {
      ...User
    }
    comment
    wantToVisit
    hasVisited
    createdAt
    updatedAt
  }
  ${fragments.placeTag}
  ${fragments.placeData}
  ${fragments.user}
`;
