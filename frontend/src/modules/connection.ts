import { readonly, ref } from 'vue';
import { userData } from './user';
import { handleMessage } from './handle-message';

export enum ConnectionState {
  NotSet,
  Disconnected,
  Connecting,
  Connected,
}

let socket: WebSocket;

const state = ref(ConnectionState.NotSet);

export const connectionState = readonly(state);

export const connect = (token: string) => new Promise<boolean>((resolve) => {
  state.value = ConnectionState.Connecting;

  if (socket?.readyState == WebSocket.OPEN) {
    socket.close(1000);
  }

  socket = new WebSocket(`${import.meta.env.VITE_SOCKET_ADDRESS}/?token=${token}`);

  // Действует только во время подключения (#)
  socket.onerror = () => {
    state.value = ConnectionState.NotSet;
    resolve(false);
  };

  socket.onopen = () => {
    state.value = ConnectionState.Connected;

    socket.onerror = null; // (#) после открытия очищаем
    socket.onclose = () => {
      state.value = ConnectionState.Disconnected;
    };
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      handleMessage(data);
    };

    resolve(true);
  };
});

export const reconnect = () => {
  return connect(userData.token);
};
