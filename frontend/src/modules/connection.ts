import { computed, ref } from 'vue';
import type { IClientMessage } from '#interfaces';

const httpAddress = 'http://localhost:7000';
const socketAddress = 'ws://localhost:7001';

export enum ConnectionState {
  NotSet,
  Disconnected,
  Connecting,
  Connected,
}

let socket: WebSocket;

const userToken = ref('');
const state = ref(ConnectionState.NotSet);

export const connectionState = computed(() => state.value);

export const connect = (token: string) => new Promise<boolean>((resolve) => {
  state.value = ConnectionState.Connecting;

  if (socket?.readyState == WebSocket.OPEN) {
    socket.close(1000);
  }

  socket = new WebSocket(`${socketAddress}/?token=${token}`);

  // Действует только во время подключения (#)
  socket.onerror = () => {
    state.value = ConnectionState.NotSet;
    resolve(false);
  };

  socket.onopen = () => {
    state.value = ConnectionState.Connected;

    userToken.value = token;

    socket.onerror = null; // (#) после открытия очищаем
    socket.onclose = () => {
      state.value = ConnectionState.Disconnected;
    };

    resolve(true);
  };
});

export const reconnect = () => {
  return connect(userToken.value);
};

export const sendMessage = (message: IClientMessage) => {

};
