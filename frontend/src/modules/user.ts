import { reactive } from 'vue';

interface IUserData {
  id: string,
  token: string,
  name: string,
}

export const userData = reactive<IUserData>({
  id: '',
  name: '',
  token: '',
})
