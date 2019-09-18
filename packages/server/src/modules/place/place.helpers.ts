import {
  PlaceSearchItem,
  PlaceDetails,
  Category,
  Contact,
  Location,
  Address,
  OpeningHours
} from './place.types';
import { Place } from './place.entity';
import {
  HereSearchResultItem,
  HerePlaceDetails,
  HereCategory,
  HereContacts,
  HereLocation,
  HereOpeningHours
} from '../../services/here/here.types';

function formatProviderSearchItemAddress(vicinity: string) {
  const result = /(.*)\<br\/\>\w{2}-\d{3}\s{1}\d{2}\s{1}(.*)/.exec(vicinity);
  if (result) {
    const [, street, city] = result;
    return `${street}, ${city}`;
  }

  return '';
}

export const transformProviderSearchItem = (userPlaces: Place[]) => (
  item: HereSearchResultItem
) => {
  const samePlace = userPlaces.find(place => place.providerPlaceId === item.id);

  const [lat, lng] = item.position;
  const place = new PlaceSearchItem();
  place.providerId = item.id;
  place.name = item.title;
  place.coordinates = { lat, lng };
  place.address = formatProviderSearchItemAddress(item.vicinity);
  place.visits = 0;
  place.categories = item.categories
    ? item.categories.map(category => category.title)
    : [];

  place.visits = samePlace
    ? samePlace.visits
      ? samePlace.visits.length
      : 0
    : 0;

  return place;
};

const transformCategory = (providerCategory: HereCategory) => {
  const category = new Category();
  category.id = providerCategory.id;
  category.title = providerCategory.title;
  return category;
};

const transformContacts = (providerContacts: HereContacts) => {
  const contact = new Contact();
  contact.phone = providerContacts.phone;
  contact.website = providerContacts.website;
  return contact;
};

const transformLocation = (providerLocation: HereLocation) => {
  const [lat, lng] = providerLocation.position;
  const location = new Location();
  location.position = { lat, lng };

  const address = new Address();
  address.formatted = formatProviderSearchItemAddress(
    providerLocation.address.text
  );
  address.house = providerLocation.address.house;
  address.street = providerLocation.address.street;
  address.postalCode = providerLocation.address.postalCode;
  address.district = providerLocation.address.district;
  address.city = providerLocation.address.city;
  address.county = providerLocation.address.county;
  address.state = providerLocation.address.state;
  address.country = providerLocation.address.country;
  address.countryCode = providerLocation.address.countryCode;

  location.address = address;

  return location;
};

const transformOpeningHours = (providerOpeningHours: HereOpeningHours) => {
  const openingHours = new OpeningHours();
  openingHours.isOpen = providerOpeningHours.isOpen;
  return openingHours;
};

export const transformProviderDetails = (item: HerePlaceDetails) => {
  const details = new PlaceDetails();

  details.providerId = item.placeId;
  details.name = item.name;
  details.categories = item.categories.map(transformCategory);
  details.contact = transformContacts(item.contacts);
  details.location = transformLocation(item.location);
  details.openingHours = transformOpeningHours(item.extended.openingHours);

  return details;
};
