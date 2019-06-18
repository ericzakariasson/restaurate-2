import { Mutation, Ctx, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Context } from '../../types/graphql-utils';

@Resolver(User)
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    try {
      return new Promise((resolve, reject) => {
        ctx.req.session!.destroy(err => {
          if (err) {
            console.error(err);
            return reject(false);
          }

          resolve(true);
        });
      });
    } catch {
      return false;
    }
  }
}
