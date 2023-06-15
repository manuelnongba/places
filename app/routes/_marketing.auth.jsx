import authStyles from '~/styles/auth.css';
import AuthForm from '../components/auth/AuthForm';
import { validateCredentials } from '../data/validation.server';

export default function Auth() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();
  console.log(formData);
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  if (authMode === 'login') {
    //login logic
  } else {
    //sign up logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
