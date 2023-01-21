import { logError, ReadonlyObjectSet } from '#utils';
import { ClientMessageType, IClientMessage } from '#interfaces';

import { RoomsManager, User, UsersManager } from './entities';
import { handlersMap } from './handlers';

const allowedMessageTypes = Object.values(ClientMessageType);

export const handleMessage = async (message: IClientMessage, sender: User) => {
  const { type } = message;

  const typeAllowed = allowedMessageTypes.includes(type);
  if (!typeAllowed) {
    console.log('handle message: тип не разрешён', type);
    return;
  }

  const handler = handlersMap[type];

  try {
    const messageData = message.data;

    await handler.schema.validateAsync(messageData);

    await handler.callback({
      messageData,
      sender,
      allUsersSet: new ReadonlyObjectSet(UsersManager.getList()),
      roomsSet: new ReadonlyObjectSet(RoomsManager.getList()),
    });
  } catch (err) {
    logError('message handler:', err);
  }
};
