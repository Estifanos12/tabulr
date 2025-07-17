import mysql, { Connection } from 'mysql2/promise';

import { logger } from '../../utils/log';

type DBConfig = {
  host: string;
  user: string;
  password: string;
  port?: number;
};

class DatabaseService {
  private connection: Connection | null = null;
  private config: DBConfig;

  constructor(config: DBConfig) {
    this.config = { ...config, port: config.port || 3306 };
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
        try {
            this.connection = await mysql.createConnection(this.config);
            logger.success('Connected to MySQL server');
        } catch (error) {
            logger.error(`Failed to connect to MySQL server\n${error}`);
            throw new Error("Failed to connect to MySQL server");
        }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
    }
  }

  public async isRunning(): Promise<boolean> {
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

  public async getDatabases(): Promise<[error: string | null, data: string[]]> {
    try {
      await this.ensureConnection();
      const [rows] = await this.connection!.query("SHOW DATABASES;");
      return [null, (rows as any[]).map((row) => Object.values(row)[0] as string)];
    } catch (error) {
      return ["Error fetching databases", []];
    }
  }

  public async getDatabaseMetadata(database: string): Promise<[error: string | null, data: any]> {
    try {
      await this.ensureConnection();
      const [error, size] = await this.getDBSize(database);
      if (error) {
        return [error, null];
      }
      const metadata = {
        size: size,
      }
      // // 1. Size in KB
      // const [sizeRows] = await this.connection!.query(`
      //   SELECT ROUND(SUM(data_length + index_length) / 1024, 2) AS size_in_kb 
      //   FROM information_schema.tables
      //   WHERE table_schema = ?
      // `, [database]);

      // // 2. MySQL Version
      // const [versionRows] = await this.connection!.query(`
      //   SELECT VERSION() AS mysql_version
      // `);

      // // 3. Created on (earliest table CREATE_TIME)
      // const [createdRows] = await this.connection!.query(`
      //   SELECT CREATE_TIME AS created_on
      //   FROM information_schema.tables
      //   WHERE table_schema = ? AND CREATE_TIME IS NOT NULL
      //   ORDER BY CREATE_TIME ASC
      //   LIMIT 1
      // `, [database]);

      // // 4. Last modified on (latest table UPDATE_TIME)
      // const [updatedRows] = await this.connection!.query(`
      //   SELECT UPDATE_TIME AS last_modified_on
      //   FROM information_schema.tables
      //   WHERE table_schema = ? AND UPDATE_TIME IS NOT NULL
      //   ORDER BY UPDATE_TIME DESC
      //   LIMIT 1
      // `, [database]);

      // // Extract values from the query results
      // const sizeInKb = (sizeRows as any[])[0]?.size_in_kb || 0;
      // const mysqlVersion = (versionRows as any[])[0]?.mysql_version || 'Unknown';
      // const createdOn = (createdRows as any[])[0]?.created_on || null;
      // const lastModifiedOn = (updatedRows as any[])[0]?.last_modified_on || null;

      // const metadata = {
      //   size: sizeInKb,
      //   version: mysqlVersion,
      //   createdOn,
      //   lastModifiedOn,
      // };

      return [null, metadata];
    } catch (error) {
      return ["Error fetching database metadata", null];
    }
  }

  public async getCountInfo(): Promise<[error: string | null, data: any]> {
    try {
      await this.ensureConnection();
      // Get the number of databases, tables
      const [databases] = await this.connection!.query("SHOW DATABASES;");
      const [tables] = await this.connection!.query(`
        SELECT TABLE_CATALOG AS DatabaseName,TABLE_SCHEMA AS SchemaName, TABLE_NAME AS TableName,TABLE_TYPE AS TableType FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME;
        `);
      return [null, { databases: (databases as any[]).length, tables: (tables as any[]).length }];
    } catch (error) {
      console.error(error);
      return ["Error fetching count information", null];
    }
  }
  public async getServerInfo(): Promise<[error: string | null, data: any]> {
    try {
      await this.ensureConnection();
      // Get Version
      const [versionRows] = await this.connection!.query("SELECT VERSION() AS mysql_version");
      const version = (versionRows as any[])[0]?.mysql_version || 'Unknown';

      return [null, { version}];
    } catch (error) {
      console.error(error);
      return ["Error fetching server information", null];
    }
  }

  public async getTables(database: string): Promise<[error: string | null, data: string[]]> {
    try {
      await this.ensureConnection();
      const [rows] = await this.connection!.query(`SHOW TABLES FROM \`${database}\`;`);
      return [null, (rows as any[]).map((row) => Object.values(row)[0] as string)];
    } catch (error) {
      return ["Error fetching tables", []];
    }
  }

  public async getTableData(database: string, table: string): Promise<[error: string | null, data: { schema: any[], rows: any[], count: number }]> {
    try {
      await this.ensureConnection();
      const [error, schema] = await this.getTableSchema(database, table);
      const [errorCount, count] = await this.countTableRows(database, table);
      if (error || errorCount) {
        return [error || errorCount, { schema: [], rows: [], count: 0 }];
      }
      const [rows] = await this.connection!.query(`SELECT * FROM \`${database}\`.\`${table}\`;`);
      return [null, { schema: schema as any[], rows: rows as any[], count }];
    } catch (error) {
      return ["Error fetching table data", { schema: [], rows: [], count: 0 }];
    }
  }

  public async getTableSchema(database: string, table: string): Promise<[error: string | null, data: any[]]> {
    try {
      await this.ensureConnection();
      const [rows] = await this.connection!.query(`DESCRIBE \`${database}\`.\`${table}\`;`);
      return [null, rows as any[]];
    } catch (error) {
      return ["Error fetching table schema", []];
    }
  }

  public async getSchema(database: string): Promise<[error: string | null, data: any[]]> {
    try {
      await this.ensureConnection();
      const [rows] = await this.connection!.query(`SHOW CREATE DATABASE \`${database}\`;`);
      return [null, rows as any[]];
    } catch (error) {
      return ["Error fetching schema", []];
    }
  }

  public async getAllSchemas(database: string): Promise<[error: string | null, data: any[]]> {
    try {
      await this.ensureConnection();
      await this.connection!.query(`USE \`${database}\`;`);
      const results = await this.connection!.query(`SHOW GRANTS FOR CURRENT_USER();`);
      console.log(results);
      const [rows] = await this.connection!.query(`SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE FROM information_schema.tables WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_SCHEMA, TABLE_NAME;`);

      return [null, rows as any[]];
    } catch (error) {
      console.error(error);
      return ["Error fetching all schemas", []];
    }
  }

  public async countTableRows(database: string, table: string): Promise<[error: string | null, data: number]> {
    try {
      await this.ensureConnection();
      const [rows] = await this.connection!.query(`SELECT COUNT(*) AS count FROM \`${database}\`.\`${table}\`;`);
      return [null, (rows as any[])[0].count];
    } catch (error) {
      return ["Error counting table rows", 0];
    }
  }

  public async getDBSize(database: string): Promise<[error: string | null, data: number]> {
    try {
      await this.ensureConnection();
      await this.connection!.query(`USE \`${database}\`;`);

      const query = `exec sp_spaceused`

      const [rows] = await this.connection!.query(query);
      console.log(rows);
      return [null, (rows as any[])[0].database_size];
    } catch (error) {
      console.error(error);
      return ["Error fetching database size", 0];
    }
  }

  public async runQuery(sql: string, database: string): Promise<[error: string | null, data: any[]]> {
    try {
      await this.ensureConnection();
      
      await this.connection!.query(`USE \`${database}\`;`);
      const [rows] = await this.connection!.query(sql);
      
      return [null, rows as any[]];
    } catch (error) {
      console.error(error);
      return [error!.sqlMessage, []];
    }
  }

  private async ensureConnection() {
    if (!this.connection) {
      await this.connect();
    }
  }
}

export const dbService = new DatabaseService({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT || '3306'),
});
