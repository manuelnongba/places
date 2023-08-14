import { pool } from './database.server';

export interface placeData {
  title: string;
  amount: number;
  date: any;
}

export async function addExpense(placeData: placeData, userId: string) {
  try {
    // return await prisma.expense.create({
    //   data: {
    //     title: placeData.title,
    //     amount: +placeData.amount,
    //     date: new Date(placeData.date),
    //     User: { connect: { id: userId } },
    //   },
    // });
    const sql = `INSERT INTO places (title, amount, date, userId) VALUES ('${
      placeData.title
    }', ${+placeData.amount}, '${placeData.date}', ${userId});`;

    console.log(sql);

    return await pool.query(sql);
  } catch (error) {
    throw new Error('Failed to add expense');
  }
}

export async function getExpenses(userId: string) {
  if (!userId) throw new Error('Failed to get expenses');

  try {
    // const places = await prisma.expense.findMany({
    //   where: { userId },
    //   orderBy: { date: 'desc' },
    // });us

    const sql = `SELECT * FROM places WHERE userId = ${userId} ORDER BY date`;

    const places = await pool.query(sql);

    return places.rows;
  } catch (error) {
    throw new Error('Failed to get expenses');
  }
}

export async function getExpense(id: any) {
  try {
    // const expense = await prisma.expense.findFirst({ where: { id } });
    const sql = `SELECT * FROM places WHERE id = ${id}`;
    const place = await pool.query(sql);

    return place.rows;
  } catch (error) {
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(id: any, placeData: placeData) {
  try {
    // await prisma.expense.update({
    //   where: { id },
    //   data: {
    //     title: placeData.title,
    //     amount: +placeData.amount,
    //     date: new Date(placeData.date),
    //   },
    // });

    const sql = `UPDATE places SET title = ${placeData.title}, amount = ${
      placeData.amount
    }, date = ${new Date(placeData.date)} WHERE id = ${id}`;

    await pool.query(sql);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update expense');
  }
}

export async function deleteExpense(id: any) {
  try {
    // await prisma.expense.delete({
    //   where: { id },
    // });
    const sql = `DELETE FROM places WHERE id = ${id}`;

    console.log(sql);

    await pool.query(sql);
  } catch (error) {
    throw new Error('Failed to delete expense');
  }
}
