import authStyles from '~/styles/auth.css';
import AuthForm from '../components/auth/AuthForm';

export default function Auth() {
  return <AuthForm />;
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
