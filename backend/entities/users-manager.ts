import { User } from './user';

export namespace UsersManager {
  const usersMap = new Map<string, User>();

  export const getList = () => Array.from(usersMap.values());

  export const find = (token: string): User | null => {
    return usersMap.get(token) ?? null;
  };

  export const add = (user: User) => {
    usersMap.set(user.token, user);
  };

  export const remove = (token: string) => {
    usersMap.delete(token);
  };
}
