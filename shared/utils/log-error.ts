export const logError = (text: string, err: unknown) => {
  let errInfo = err;

  if (err instanceof Error) {
    errInfo = err.message;
  }

  console.error(text, errInfo);
};
