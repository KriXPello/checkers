import { IServerMessage } from '#interfaces';
import { User } from '../entities';

interface Params {
  users: User[],
  message: IServerMessage,
}

export const broadcastService = async ({
  users,
  message,
}: Params) => {
  const promises = users.map(user => user.sendMessage(message));

  const results = await Promise.all(promises);

  const notSentMessages = results.filter(result => !result.success);

  return {
    notSentMessages,
  };
};
