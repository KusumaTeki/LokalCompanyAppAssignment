// // utils/db.ts
// import * as SQLite from 'expo-sqlite';

// // We use openDatabaseAsync to open (or create) the database asynchronously.
// let dbPromise: Promise<SQLite.SQLiteDatabase>;

// async function getDb(): Promise<SQLite.SQLiteDatabase> {
//   if (!dbPromise) {
//     dbPromise = SQLite.openDatabaseAsync('bookmarks.db');
//   }
//   return dbPromise;
// }

// /**
//  * Create the bookmarks table if it doesn't already exist.
//  */
// export async function createBookmarksTable(): Promise<void> {
//   try {
//     const db = await getDb();
//     await db.execAsync(`
//       CREATE TABLE IF NOT EXISTS bookmarks (
//         id INTEGER PRIMARY KEY NOT NULL,
//         jobData TEXT
//       );
//     `);
//     console.log("Bookmarks table created successfully");
//   } catch (error) {
//     console.error("Error creating bookmarks table:", error);
//     throw error;
//   }
// }

// /**
//  * Add a job to the bookmarks.
//  * @param job - The job object to store.
//  */
// export async function addBookmark(job: any): Promise<void> {
//   try {
//     const db = await getDb();
//     await db.runAsync(
//       "INSERT INTO bookmarks (id, jobData) VALUES (?, ?);",
//       [job.id, JSON.stringify(job)]
//     );
//     console.log("Bookmark added successfully");
//   } catch (error) {
//     console.error("Error adding bookmark:", error);
//     throw error;
//   }
// }

// /**
//  * Remove a bookmarked job by its id.
//  * @param jobId - The job id to remove.
//  */
// export async function removeBookmark(jobId: number): Promise<void> {
//   try {
//     const db = await getDb();
//     await db.runAsync(
//       "DELETE FROM bookmarks WHERE id = ?;",
//       [jobId]
//     );
//     console.log("Bookmark removed successfully");
//   } catch (error) {
//     console.error("Error removing bookmark:", error);
//     throw error;
//   }
// }

// /**
//  * Get a specific bookmark by job id.
//  * @param jobId - The job id to query.
//  * @returns An array with the matching bookmark row(s).
//  */
// export async function getBookmark(jobId: number): Promise<any[]> {
//   try {
//     const db = await getDb();
//     const result = await db.getAllAsync(
//       "SELECT * FROM bookmarks WHERE id = ?;",
//       [jobId]
//     );
//     return result;
//   } catch (error) {
//     console.error("Error getting bookmark:", error);
//     throw error;
//   }
// }

// /**
//  * Retrieve all bookmarks.
//  * @returns An array of all bookmarked rows.
//  */
// export async function getAllBookmarks(): Promise<any[]> {
//   try {
//     const db = await getDb();
//     const result = await db.getAllAsync("SELECT * FROM bookmarks;", []);
//     return result;
//   } catch (error) {
//     console.error("Error fetching bookmarks:", error);
//     throw error;
//   }
// }


// utils/db.ts
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

// Ensure that expo-sqlite is only used on native platforms
if (Platform.OS === 'web') {
  // Option 1: Throw an error to prevent using the database on web
  throw new Error('expo-sqlite is not supported on web. Please run the app on iOS or Android.');
  // Option 2 (alternative): Use a fallback (such as expo-sqlite/kv-store) if desired.
}

// Open (or create) the database asynchronously
let dbPromise: Promise<SQLite.SQLiteDatabase>;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    // Use openDatabaseAsync instead of openDatabase for the async API
    dbPromise = SQLite.openDatabaseAsync('bookmarks.db');
  }
  return dbPromise;
}

/**
 * Create the bookmarks table if it doesn't already exist.
 */
export async function createBookmarksTable(): Promise<void> {
  try {
    const db = await getDb();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY NOT NULL,
        jobData TEXT
      );
    `);
    console.log("Bookmarks table created successfully");
  } catch (error) {
    console.error("Error creating bookmarks table:", error);
    throw error;
  }
}

/**
 * Add a job to the bookmarks.
 * @param job - The job object to store.
 */
export async function addBookmark(job: any): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync(
      "INSERT INTO bookmarks (id, jobData) VALUES (?, ?);",
      [job.id, JSON.stringify(job)]
    );
    console.log("Bookmark added successfully");
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
}

/**
 * Remove a bookmarked job by its id.
 * @param jobId - The job id to remove.
 */
export async function removeBookmark(jobId: number): Promise<void> {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM bookmarks WHERE id = ?;", [jobId]);
    console.log("Bookmark removed successfully");
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
}

/**
 * Get a specific bookmark by job id.
 * @param jobId - The job id to query.
 * @returns An array with the matching bookmark row(s).
 */
export async function getBookmark(jobId: number): Promise<any[]> {
  try {
    const db = await getDb();
    const result = await db.getAllAsync("SELECT * FROM bookmarks WHERE id = ?;", [jobId]);
    return result;
  } catch (error) {
    console.error("Error getting bookmark:", error);
    throw error;
  }
}

/**
 * Retrieve all bookmarks.
 * @returns An array of all bookmarked rows.
 */
export async function getAllBookmarks(): Promise<any[]> {
  try {
    const db = await getDb();
    const result = await db.getAllAsync("SELECT * FROM bookmarks;", []);
    return result;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
}
