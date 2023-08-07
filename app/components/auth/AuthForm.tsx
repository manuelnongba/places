import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get('mode') || 'login';
  const navigation = useNavigation();
  const validationErrors = useActionData();

  const submitBtnCaption = authMode === 'login' ? 'login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Login with existing user';

  const isSubmitting = navigation.state !== 'idle';

  console.log(isSubmitting);

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err: any) => (
            <li key={err}>{err} </li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenting...' : submitBtnCaption}
        </button>
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
