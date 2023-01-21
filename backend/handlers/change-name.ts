import { IClientMessageData, ServerMessageType } from '#interfaces';

import { clientSchemas } from '../schemas';

import { HandlerData } from '../interfaces';

export const changeName: HandlerData<IClientMessageData.ChangeName> = {
  schema: clientSchemas.changeName,
  callback: async ({ messageData, sender }) => {
    sender.name = messageData.newName;

    await sender.sendMessage({
      type: ServerMessageType.UserData,
      data: {
        userData: sender.serialize(),
      }
    });
  },
};
