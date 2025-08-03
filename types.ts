export interface SearchValue {
    field: string;
    operator: string;
    value: string;
}

export interface TableResult {
    table_name: string;
    table_schema: string;
    table_type: string;
    table_collation: string;
}

export interface TableMetadata extends TableResult {
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

export interface TableSchema {
    Field: string;
    Type: string;
    Null: string;
    Key: string;
    Default: string;
    Extra?: string;
}

export interface TableType {
    table_name: string;
    table_type: string;
}

export type TType = "BASE TABLE" | "VIEW" | "SYSTEM VIEW" | "SYSTEM BASE TABLE" | "FOREIGN KEY REFRENCED";

export interface MySQLDataType {
    type: string;
    suggestions: {
        name: string;
        description: string;
        parameters?: {
            name: string;
            description: string;
            default?: string;
        }[];
    }[];
}

export interface Constraint {
    name: string;
    value: string;
    description: string;
}