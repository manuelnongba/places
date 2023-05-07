//.server file tells remix that the code in this file should only be executed in the backend and the code doesn't appear in the front-end

import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };
