export const getUniqueString = (): string => {
  return Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
};
