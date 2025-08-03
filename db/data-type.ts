import { MySQLDataType } from "@/types";

export const dataTypes: MySQLDataType[] = [{
    type: "Integer",
    suggestions: [
        {
            name: "tinyint",
            description: "A small integer that ranges from -128 to 127"
        },
        {
            name: "smallint",
            description: "A small integer that ranges from -32,768 to 32,767"
        },
        {
            name: "mediumint",
            description: "A medium integer that ranges from -8,388,608 to 8,388,607"
        },
        {
            name: "int",
            description: "A standard integer that ranges from -2,147,483,648 to 2,147,483,647"
        },
        {
            name: "bigint",
            description: "A large integer that ranges from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807"
        }
    ],
},
{
    type: "Real",
    suggestions: [
        {
            name: "float",
            description: "A floating-point number that ranges from -3.402823466E+38 to 3.402823466E+38"
        },
        {
            name: "double",
            description: "A double-precision floating-point number that ranges from -1.7976931348623157E+308 to 1.7976931348623157E+308"
        },
        {
            name: "decimal",
            description: "A decimal number that ranges from -1.7976931348623157E+308 to 1.7976931348623157E+308",
            parameters: [
                {
                    name: "precision",
                    description: "The total number of digits in the number"
                },
                {
                    name: "scale",
                    description: "The number of digits to the right of the decimal point"
                }
            ]
        }
    ]
},
{
    type: "String",
    suggestions: [
        {
            name: "char",
            parameters: [{ name: "length", description: "The maximum number of characters in the string", default: '255' }],
            description: "A fixed-length character string"
        },
        {
            name: "varchar",
            parameters: [{ name: "length", description: "The maximum number of characters in the string", default: '255' }],
            description: "A variable-length character string"
        },
        {
            name: "tinytext",
            description: "A variable-length character string with a maximum length of 255 characters"
        },
        {
            name: "text",
            description: "A variable-length character string with a maximum length of 65,535 characters"
        },
        {
            name: "mediumtext",
            description: "A variable-length character string with a maximum length of 16,777,215 characters"
        },
        {
            name: "longtext",
            description: "A variable-length character string with a maximum length of 4,294,967,295 characters"
        },
        {
            name: "json",
            description: "A JSON object"
        },
        {
            name: "uuid",
            description: "A universally unique identifier"
        }
    ]
}, {
    type: "Binary",
    suggestions: [
        {
            name: "binary",
            parameters: [{ name: "length", description: "The maximum number of characters in the string", default: '255' }],
            description: "A binary string"
        },
        {
            name: "varbinary",
            parameters: [{ name: "length", description: "The maximum number of characters in the string", default: '255' }],
            description: "A variable-length binary string"
        },
        {
            name: "blob",
            description: "A binary large object"
        },
        {
            name: "mediumblob",
            description: "A medium binary large object"
        },
        {
            name: "longblob",
            description: "A long binary large object"
        }
    ]
},
{
    type: "Date and Time",
    suggestions: [
        {
            name: "date",
            description: "A date"
        },
        {
            name: "datetime",
            description: "A date and time"
        },
        {
            name: "timestamp",
            description: "A timestamp"
        },
        {
            name: "time",
            description: "A time"
        },
        {
            name: "year",
            description: "A year"
        }
    ]
}, {
    type: "Miscellaneous",
    suggestions: [
        {
            name: "enum",
            description: "An enumerated type"
        },
        {
            name: "set",
            description: "A set of values"
        },
    ]
}
]