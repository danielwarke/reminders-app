import * as SQLite from "expo-sqlite";
import { SQLError } from "expo-sqlite";
import { Reminder } from "../models/reminder";

const database = SQLite.openDatabase("reminders.db");

export function init(): Promise<true | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS reminders (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'reminder',
        complete INTEGER NOT NULL DEFAULT 0,
        date INTEGER NOT NULL 
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

export function createReminder(
  reminder: Omit<Reminder, "id">
): Promise<true | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO reminders (
        title, 
        description,
        type,
        complete,
        date 
    ) VALUES (?, ?, ?, ?, ?)`,
        [
          reminder.title,
          reminder.description,
          reminder.type,
          Number(reminder.complete),
          reminder.date.getTime(),
        ],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function getReminders(
  type: Reminder["type"]
): Promise<Reminder[] | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM reminders WHERE type = ? ORDER BY complete, date ASC`,
        [type],
        (_, result) => {
          const reminders = result.rows._array;
          return reminders.map(
            (reminder) =>
              new Reminder(
                reminder.id.toString(),
                reminder.title,
                reminder.description,
                reminder.type,
                reminder.complete === 1,
                new Date(reminder.date)
              )
          );
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function getReminderDetails(
  reminderId: string
): Promise<Reminder | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM reminders WHERE id = ?`,
        [reminderId],
        (_, result) => {
          const reminder = result.rows._array[0];
          resolve(
            new Reminder(
              reminder.id.toString(),
              reminder.title,
              reminder.description,
              reminder.type,
              reminder.complete === 1,
              new Date(reminder.date)
            )
          );
        },
        (error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

export function deleteReminder(reminderId: string): Promise<true | SQLError> {
  return new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        "DELETE FROM reminders WHERE id = ?",
        [reminderId],
        () => resolve(true),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
