import { ref } from 'vue';

const httpAddress = 'http://localhost:7000';
const socketAddress = 'ws://localhost:7001';

let currentSocket: WebSocket;

export const isConnected = ref(false);
export const isConnecting = ref(false);

const resetStates = () => {
  isConnected.value = false;
  isConnecting.value = false;
};

export const reconnect = () => {
  isConnecting.value = true;

  if (currentSocket?.readyState == WebSocket.OPEN) {
    currentSocket.close(1000);
  }

  const socket = new WebSocket(socketAddress);

  currentSocket = socket;

  socket.onopen = () => {
    isConnected.value = true;
    isConnecting.value = false;
  };

  socket.onclose = resetStates;
  socket.onerror = resetStates;
};

reconnect();
