import { compare, hash } from 'bcrypt';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

import { pool } from './database.server.js';

const SESSION_SECRET: string = process.env.SESSION_SECRET!;
console.log(SESSION_SECRET);

interface Credentials {
  email: string;
  password: string;
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, //30 days
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId: number = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request: any) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request: any) {
  const userId = await getUserFromSession(request);

  if (!userId) throw redirect('/auth?mode=login');

  return userId;
}

export async function signup({ email, password }: Credentials) {
  const sql: string = `SELECT email FROM places_users WHERE email = '${email}'`;

  const existingUser = await pool.query(sql);

  if (existingUser.rows.length > 0) {
    const error: any = new Error(
      `A user with the provided email address exists already.`
    );
    error.status = 422;
    throw error;
  }
  const passwordHash = await hash(password, 12);

  const sql2: string = `INSERT INTO places_users (email, password) VALUES('${email}', '${passwordHash}')`;

  await pool.query(sql2);

  const sql3 = `SELECT id FROM places_users WHERE email = '${email}'`;

  const newUser = await pool.query(sql3);

  return createUserSession(newUser.rows[0].id, '/places');
}

export async function login({ email, password }: any) {
  const sql = `SELECT id, email, password FROM places_users WHERE email = '${email}'`;

  const existingUser = await pool.query(sql);
  if (existingUser.rows.length === 0) {
    const error: any = new Error(
      `Could not log you in, please check the provided credentials`
    );
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await compare(
    password,
    existingUser.rows[0].password
  );

  if (!passwordCorrect) {
    const error: any = new Error(
      `Could not log you in, please check the provided credentials`
    );
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.rows[0].id, '/places');
}
