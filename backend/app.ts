import { logError } from '#utils';
import { ClientMessageType, IClientMessage } from '#interfaces';

import { UsersManager } from './entities';
import { handlersMap } from './handlers';

const allowedMessageTypes = Object.values(ClientMessageType);

export const handleMessage = async (
  message: IClientMessage,
  token: string = '',
): Promise<Object | number> => {
  const { type } = message;

  const typeAllowed = allowedMessageTypes.includes(type);
  if (!typeAllowed) {
    console.log('handle message: тип не разрешён', type);
    return 400;
  }

  const handler = handlersMap[type];

  try {
    const messageData = message.data;

    if (message.type === ClientMessageType.CheckToken) {
      message.data;
    }

    const validationResult = handler.schema.validate(messageData);

    if (validationResult.error) {
      logError('validation error', validationResult.error);
      return 400;
    }

    if (handler.noAuth) {
      const result = await handler.callback({ messageData });
      return result;
    } else {
      const sender = UsersManager.find(token);

      if (!sender) {
        return 401;
      }

      const result = await handler.callback({
        messageData,
        sender,
      });

      return result;
    }
  } catch (err) {
    logError('message handler:', err);
    return 500;
  }
};
