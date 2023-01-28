import type { ClientMessageType, IClientMessage, IServerResponseMap } from '#interfaces';
import { userData } from './user';
import { httpAddress } from '../constants';
import { ref, readonly } from 'vue';

const sending = ref(false);
export const somethingWentWrong = ref(false);
export const sendingMessage = readonly(sending);

type SendMessageResult<T extends ClientMessageType> = {
  ok: false,
  code: number,
} | {
  ok: true,
  data: IServerResponseMap[T];
};

export const sendMessage = async <T extends ClientMessageType>(
  message: IClientMessage<T>
): Promise<SendMessageResult<T>> => {
  sending.value = true;

  try {
    const messageJson = JSON.stringify(message);

    const headers = new Headers();
    headers.append('Authorization', userData.token);
    headers.append('Content-Type', 'application/json');

    const response = await fetch(`${httpAddress}/game`, {
      method: 'POST',
      headers: headers,
      body: messageJson,
      mode: 'cors',
    });

    if (response.status != 200) {
      somethingWentWrong.value = true;

      return {
        ok: false,
        code: response.status,
      };
    }

    const data = await response.json() as IServerResponseMap[T];

    return {
      ok: true,
      data,
    };
  } finally {
    sending.value = false;
  }
};
