import { Operator } from "@/types";

/**
 * List of operators for MySQL.
 * 
 * @see https://dev.mysql.com/doc/refman/8.4/en/comparison-operators.html
 */

export const operators: Operator[] = [
    {
        name: "equal",
        description: "Equal to",
        symbol: "=",
    },{
        name: "greater_than",
        description: "Greater than",
        symbol: ">",
    },{
        name: "less_than",
        description: "Less than",
        symbol: "<",
    },{
        name: "greater_than_or_equal",
        description: "Greater than or equal to",
        symbol: ">=",
    },{
        name: "less_than_or_equal",
        description: "Less than or equal to",
        symbol: "<=",
    },{
        name: "not_equal",
        description: "Not equal to, Not equal. Note: In some versions of SQL this operator may be written as !=",
        symbol: "<>",
    },{
        name: "like",
        description: "Search for a pattern",
        symbol: "LIKE",
    }, {
        name: "not_like",
        description: "Not like",
        symbol: "NOT LIKE",
    },{
        name: "between",
        description: "Between a certain range",
        symbol: "BETWEEN",
    }, {
        name: "in",
        description: "To specify multiple possible values for a column",
        symbol: "IN",
    }, {
        name: "not_in",
        description: "Not in",
        symbol: "NOT IN",
    }, {
        name: "is_null",
        description: "Is null",
        symbol: "IS NULL",
    }, {
        name: "is_not_null",
        description: "Is not null",
        symbol: "IS NOT NULL",
    },
];
