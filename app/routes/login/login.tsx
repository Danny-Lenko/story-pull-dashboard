import type { Route } from './+types/login';
import { LoginTest } from '~/login-test/login-test';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Login() {
  return <LoginTest />;
}
