import { Repository, EntityRepository } from 'typeorm';
import { Place } from './place.entity';
import { Visit } from '../visit/visit.entity';

@EntityRepository(Place)
export class PlaceRepository extends Repository<Place> {
  findByUserId = (userId: number) =>
    this.createQueryBuilder('place')
      .select('*')
      .where('place.userId = :userId', { userId })
      .orderBy('place.createdAt', 'DESC')
      .limit(5)
      .getRawMany();

  getVisitCountById = (placeId: number) =>
    this.createQueryBuilder('place')
      .innerJoin('place.visits', 'visit', 'visit.placeId = :placeId', {
        placeId
      })
      .getCount();

  findVisitsById = (placeId: number, options: VisitOptions): Promise<Visit[]> =>
    this.createQueryBuilder('place')
      .innerJoin('place.visits', 'visit', 'visit.placeId = :placeId', {
        placeId
      })
      .take(options.limit)
      .skip(options.skip)
      .orderBy('visit.visitDate')
      .addOrderBy('visit.createdAt')
      .getRawMany();
}

interface VisitOptions {
  limit?: number;
  skip?: number;
}