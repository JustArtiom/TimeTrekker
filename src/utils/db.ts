import bettersqlite, { Database } from "better-sqlite3";

/**
 * Await untill the database file is able to open
 * Known issue on some devices that the app is not able
 * to open some files on start up (only for a few seconds)
 */
export const awaitDatabaseToBeAbleToLoad = async () => {
    const tryLoadDatabase = async (): Promise<Database> => {
        try {
            // Attempt to load the database
            const sqlite = bettersqlite("database.db");
            return sqlite;
        } catch (err) {
            console.log(err);
            // If an error occurs, retry after a delay
            return new Promise((resolve) => setTimeout(resolve, 1000));
        }
    };

    // Keep trying until the database is loaded
    while (true) {
        const db = await tryLoadDatabase();
        if (db) {
            return db;
        }
    }
};

/** Initalise the tables if they dont exist */
export const initTables = (db: Database) =>
    db.transaction(() => {
        // Create users table to hold user information
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                password_hash VARCHAR(100) NOT NULL,
                screen_active INT DEFAULT 0,
                screen_idle INT DEFAULT 0
            )
        `);

        // Create logs table
        db.exec(`
            CREATE TABLE IF NOT EXISTS logs (
                id INT PRIMARY KEY,
                user VARCHAR(50),
                event VARCHAR(50),
                data VARCHAR(255),
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create play_history table
        db.exec(`
            CREATE TABLE IF NOT EXISTS play_history (
                user_id INT REFERENCES users(id),
                play_date DATE NOT NULL,
                play_duration_minutes INT DEFAULT 0,
                PRIMARY KEY (user_id, play_date)
            )
        `);
    })();

export default function load_db() {
    return bettersqlite("database.db");
}
