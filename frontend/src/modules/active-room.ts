import { ref } from 'vue';
import type { IUser, IRoomFullInfo } from '#interfaces';

export const roomData = ref<IRoomFullInfo | null>(null);
export const winner = ref<IUser | null>(null);
