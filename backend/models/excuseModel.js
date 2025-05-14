// models/excuseModel.js
import db from '../db/database.js';

//  Lecture de toutes les excuses
export async function getAllExcuses() {
  await db.read();
  return db.data.excuses;
}

//  Recherche d'une excuse par code HTTP
export async function getExcuseByCode(http_code) {
  await db.read();
  return db.data.excuses.find(e => e.http_code === http_code);
}

//  Vérifie si un code HTTP existe déjà
export async function excuseExists(http_code) {
  await db.read();
  return db.data.excuses.some(e => e.http_code === http_code);
}

//  Ajout d'une excuse
export async function addExcuse({ http_code, message, tag }) {
  await db.read();
  const newExcuse = {
    http_code: parseInt(http_code, 10),
    message: message.trim(),
    tag: tag?.trim() || "Autre"
  };
  db.data.excuses.push(newExcuse);
  await db.write();
  return newExcuse;
}
