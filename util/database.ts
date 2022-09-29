import * as SQLite from "expo-sqlite";
import { SQLError } from "expo-sqlite";

const database = SQLite.openDatabase("reminders-app.db");

export function init(): Promise<boolean | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        date DATETIME NOT NULL 
      )`,
        [],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function createReminder() {}