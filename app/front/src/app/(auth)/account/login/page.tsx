import Login from '@/components/auth/Login';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Login - Hacker News",
  keywords: "Hacker News, login, tech news, sign in",
  authors: [{ name: "Hacker News" }],
};

const LoginPage = () => {
  return(
    <Login />
  );
};

export default LoginPage;