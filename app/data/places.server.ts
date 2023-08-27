import { pool } from './database.server';

export interface placeData {
  title: string;
  amount: number;
  date: any;
}

export async function addPlace(placeData: placeData, userId: number) {
  try {
    const sql = `INSERT INTO places (title, amount, date, userId) VALUES ('${
      placeData.title
    }', ${+placeData.amount}, '${placeData.date}', ${userId});`;

    return await pool.query(sql);
  } catch (error) {
    throw new Error('Failed to add place');
  }
}

export async function getPlaces(userId: number) {
  if (!userId) throw new Error('Failed to get places');

  try {
    const sql = `SELECT * FROM places WHERE userId = ${userId} ORDER BY date DESC`;

    const places = await pool.query(sql);

    return places.rows;
  } catch (error) {
    throw new Error('Failed to get places');
  }
}

export async function getPlace(id: number) {
  try {
    const sql = `SELECT * FROM places WHERE id = ${id}`;
    const place = await pool.query(sql);

    return place.rows;
  } catch (error) {
    throw new Error('Failed to get place');
  }
}

export async function updatePlace(id: any, placeData: placeData) {
  try {
    const sql = `UPDATE places SET title = '${placeData.title}', amount = ${placeData.amount}, date = '${placeData.date}' WHERE id = ${id}`;

    await pool.query(sql);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update place');
  }
}

export async function deletePlace(id: number) {
  try {
    const sql = `DELETE FROM places WHERE id = ${id}`;

    await pool.query(sql);
  } catch (error) {
    throw new Error('Failed to delete place');
  }
}
