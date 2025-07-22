'use client'

import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { Download, Play, RemoveFormatting, SearchX } from 'lucide-react';

import { Button } from '../ui/button';
import { exportSqlQuery } from '@/utils/export-sql-query';
import { formatQuery } from '@/utils/sql-formatter';

interface QueryEditorProps {
    executionTime: number | null;
    query: string;
    setQuery: (query: string) => void;
    runQuery: () => void;
}

export default function QueryEditor({ query, setQuery, runQuery, executionTime }: QueryEditorProps) {

    return (
        <div className="flex-1">
            <div className="flex items-center justify-end gap-2 my-4">
                <p className="text-sm text-muted-foreground mx-2">
                    {executionTime ? `Executed in ${(executionTime / 1000).toFixed(3)}s` : ''}
                </p>
                <Button onClick={() => setQuery('')}>
                    <SearchX />
                    <span>Clear</span>
                </Button>

                <Button onClick={() => setQuery(formatQuery(query))}>
                    <RemoveFormatting />
                    <span>Format</span>
                </Button>

                <Button onClick={runQuery}>
                    <Play />
                    <span>Run</span>
                </Button>

                <Button
                    onClick={() => exportSqlQuery(query)}
                >
                    <Download />
                    <span>Export</span>
                </Button>
            </div>
            <CodeMirror
                extensions={[sql()]}
                value={query}
                onChange={(value) => setQuery(value)}
            />
        </div>
    )
}