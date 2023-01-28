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
});

const tokenKey = 'token';
export const saveToken = (token: string) => {
  localStorage.setItem(tokenKey, token);
};
export const extractToken = (): string | null => {
  return localStorage.getItem(tokenKey);
};
export const clearToken = () => {
  localStorage.removeItem('token');
};
