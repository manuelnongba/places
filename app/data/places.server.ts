import { prisma } from './database.server';

export interface placeData {
  title: string;
  amount: number;
  date: any;
}

export async function addExpense(placeData: placeData, userId: string) {
  try {
    return await prisma.expense.create({
      data: {
        title: placeData.title,
        amount: +placeData.amount,
        date: new Date(placeData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    throw new Error('Failed to add expense');
  }
}

export async function getExpenses(userId: string) {
  if (!userId) throw new Error('Failed to get expenses');

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });

    return expenses;
  } catch (error) {
    throw new Error('Failed to get expenses');
  }
}

export async function getExpense(id: any) {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error('Failed to get expense');
  }
}

export async function updateExpense(id: any, placeData: placeData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: placeData.title,
        amount: +placeData.amount,
        date: new Date(placeData.date),
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update expense');
  }
}

export async function deleteExpense(id: any) {
  try {
    await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error('Failed to delete expense');
  }
}
