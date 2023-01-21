import { IServerMessage } from '#interfaces';
import { ReadonlyObjectSet } from '#utils';
import { User } from '../entities';

interface Params {
  users: User[] | ReadonlyObjectSet<User>,
  message: IServerMessage,
}

export const broadcastService = async ({
  users,
  message,
}: Params) => {
  const usersList = users instanceof ReadonlyObjectSet ? users.elements : users;

  const promises = usersList.map(user => user.sendMessage(message));

  const results = await Promise.all(promises);

  const notSentMessages = results.filter(result => !result.success);

  return {
    notSentMessages,
  };
};
