import { Constraint } from "@/types";

export const constraints: Constraint[] = [
    {
        name: "Primary Key",
        value: "PRIMARY KEY",
        description: "A primary key is a column or set of columns that uniquely identifies each row in a table. It ensures that each row is unique and can be used to enforce referential integrity."
    },
    {
        name: "Unique",
        value: "UNIQUE",
        description: "A unique constraint ensures that all values in a column are unique. It can be a single column or a combination of columns."
    },
    {
        name: "Foreign Key",
        value: "FOREIGN KEY",
        description: "A foreign key is a column or set of columns that references the primary key of another table. It ensures that the values in the foreign key column(s) exist in the referenced table's primary key column(s)."
    },
    {
        name: "Check",
        value: "CHECK",
        description: "A check constraint is a column or set of columns that must satisfy a specific condition. It ensures that the values in the column(s) meet the specified criteria."
    },
    {
        name: "Default",
        value: "DEFAULT",
        description: "A default constraint specifies a default value for a column. If no value is specified for the column, the default value will be used."
    }, 
    {
        name: "Not Null",
        value: "NOT NULL",
        description: "A not null constraint ensures that a column cannot have a null value."
    }
]