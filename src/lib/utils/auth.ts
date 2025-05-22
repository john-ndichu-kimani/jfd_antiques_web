import { NextRouter } from 'next/router';

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

export const getAuthHeader = (): { Authorization: string } | {} => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUserInfo: UserInfo = JSON.parse(userInfo);
      return { Authorization: `Bearer ${parsedUserInfo.token}` };
    }
  }
  return {};
};

export const getUserInfo = (): UserInfo | null => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  }
  return null;
};

export const isAdmin = (): boolean => {
  const userInfo = getUserInfo();
  return userInfo?.role === 'ADMIN';
};

export const isAuthenticated = (): boolean => {
  return getUserInfo() !== null;
};

export const redirectIfNotAuthenticated = (router: NextRouter): void => {
  if (!isAuthenticated()) {
    router.push('/login?redirect=' + router.asPath);
  }
};

export const redirectIfNotAdmin = (router: NextRouter): void => {
  if (!isAdmin()) {
    router.push('/');
  }
};