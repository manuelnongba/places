import authStyles from '~/styles/auth.css';
import AuthForm from '../components/auth/AuthForm';
import { validateCredentials } from '../data/validation.server';
import { login, signup } from '../data/auth.server';

export default function Auth() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login';

  const formData = await request.formData();

  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
    console.log(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === 'login') {
      //login logic
      return await login(credentials);
    } else {
      //sign up logic
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) return { credentials: error.message };
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}
