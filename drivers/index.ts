import mysql, { Connection, ConnectionOptions } from 'mysql2/promise'

import { logger } from '@/utils/log';
import { formatQuery } from '@/utils/sql-formatter'

export interface TableResult {
    table_name: string;
    table_schema: string;
    table_type: string;
    table_collation: string;
}

interface TableMetadata extends TableResult {
    engine: string;
    table_rows: number;
    table_comment: string;
    data_length: number;
    index_length: number;
    data_free: number;
    auto_increment?: number;
    create_time?: Date;
    update_time?: Date;
}

interface TableSchema {
    Field: string;
    Type: string;
    Null: string;
    Key: string;
    Default: string;
    Extra?: string;
}

/**
 * Client class for MySQL server
 * @class Client
 * @constructor
 * @param {ClientConfig} config - Client configuration
 */

class Client {
    private config: ConnectionOptions;
    private connection: Connection | null = null;

    constructor(config: ConnectionOptions) {
        this.config = {
            ...config,
            supportBigNumbers: true, // Enable support for big numbers
            bigNumberStrings: true, // Enable support for big number strings
            dateStrings: true, // Enable support for date strings
            multipleStatements: true, // Enable support for multiple statements - Batch queries
        };
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection(this.config);
        } catch (error) {
            logger.error("Failed to connect to MySQL server" + error);
            throw error;
        } finally {
            if (this.connection) {
                this.connection.on('error', (error) => {
                    logger.error("MySQL connection error" + error);
                });
            }
        }
    }

    /**
     * Check if the MySQL server is running
     * @returns {Promise<boolean>}
     */
    async isRunning(): Promise<boolean> {
        try {
            await this.connect();
            await this.connection?.ping();
            logger.success('MySQL server is running');
            return true;
        } catch (error) {
            logger.error(`MySQL server is not running\n${error}`);
            return false;
        } finally {
            await this.disconnect();
        }
    }

    /**
     * Get the databases on the MySQL server
     * @returns {Promise<[error: string | null, data: string[]]>}
     */
    async getDatabases(): Promise<[error: string | null, data: string[]]> {
        try {
            await this.ensureConnection();
            const [rows] = await this.connection!.query("SHOW DATABASES;");
            return [null, (rows as { Database: string }[]).map((row) => Object.values(row)[0] as string)];
        } catch (error) {
            return ["Error fetching databases", []];
        }
    }

    /**
     * Get the tables in a database
     * @param {string} database - Database name
     * @returns {Promise<[error: string | null, tables: TableResult[]]>}
     */
    async getTables(database: string): Promise<[error: string | null, tables: TableResult[]]> {
        try {
            await this.ensureConnection();
            const query = formatQuery(`SELECT TABLE_NAME as table_name,TABLE_SCHEMA as table_schema,TABLE_TYPE as table_type,TABLE_COLLATION as table_collation FROM information_schema.tables WHERE TABLE_SCHEMA = ?`);
            const [rows] = await this.connection!.query(query, [database]);
            return [null, (rows as TableResult[])];
        } catch (error) {
            logger.error(`Error fetching tables\n${error}`);
            return ["Error fetching tables", []];
        }
    }

    /**
     * Get the schema of a table
     * @param {string} database - Database name
     * @param {string} table - Table name
     * @returns {Promise<[error: string | null, data: TableSchema[]]>}
     */
    async getTableSchema(database: string, table: string): Promise<[error: string | null, data: TableSchema[]]> {
        try {
            await this.ensureConnection();
            const query = formatQuery(`DESCRIBE \`${database}\`.\`${table}\`;`);
            const [rows] = await this.connection!.query(query);
            console.log(rows)
            return [null, (rows as TableSchema[])];
        } catch (error) {
            logger.error(`Error fetching table schema\n${error}`);
            return ["Error fetching table schema", []];
        }
    }

    /**
     * Get the count of databases and tables
     * @returns {Promise<[error: string | null, data: { databases: number, tables: number }]>}
     */
    async getCountInfo(): Promise<[error: string | null, data: { databases: number, tables: number }]> {
        try {
            await this.ensureConnection();
            const [databases] = await this.connection!.query(formatQuery(`SELECT COUNT(*) as count FROM information_schema.SCHEMATA;`));
            const [tables] = await this.connection!.query(formatQuery(`SELECT COUNT(*) as count FROM information_schema.tables;`));
            return [null, { databases: (databases as { count: number }[])[0].count, tables: (tables as { count: number }[])[0].count }];
        } catch (error) {
            logger.error(`Error fetching table count\n${error}`);
            return ["Error fetching table count", { databases: 0, tables: 0 }];
        }
    }

    /**
     * Get the version of the MySQL server
     * @returns {Promise<[error: string | null, version: string]>}
     */
    async getVersion(): Promise<[error: string | null, version: string]> {
        try {
            await this.ensureConnection();
            const [rows] = await this.connection!.query(formatQuery(`SELECT VERSION() as version;`));
            return [null, (rows as { version: string }[])[0].version];
        } catch (error) {
            logger.error(`Error fetching version\n${error}`);
            return ["Error fetching version", ""];
        }
    }

    /**
     * Run a user query on the MySQL server
     * @param {string} sql - SQL query
     * @param {string} database - Database name
     * @returns {Promise<[error: string | null, data: any[]]>}
     */
    async runQuery(sql: string, database: string): Promise<[error: string | null, data: any[]]> {
        try {
            await this.ensureConnection();

            await this.connection!.query(formatQuery(`USE \`${database}\`;`));
            const [rows] = await this.connection!.query(formatQuery(sql));

            console.log(rows)
            return [null, rows as any[]];
        } catch (error) {
            logger.error(`Error running query\n${error}`);
            return [error!.sqlMessage, []];
        }
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }

    /**
     * Ensure the connection is established
     */
    async ensureConnection() {
        if (!this.connection) {
            await this.connect();
        }
    }

}

export const dbClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
});
