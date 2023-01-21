import { ObjectSet } from '#utils';
import { User } from './user';

export namespace UsersManager {
  const usersSet = new ObjectSet<User>([]);

  export const getList = () => usersSet.elements;

  export const add = (user: User) => {
    usersSet.insert(user);
  };

  export const remove = (id: string) => {
    usersSet.remove(id);
  };
}
