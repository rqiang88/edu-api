import { createHmac } from 'crypto';
export const digest = (password: string): string => {
  const data = createHmac('md5', '123456').update(password).digest('hex');
  return data;
};

export const check = (password: string, secret: string): boolean => {
  return digest(password) === secret;
};
