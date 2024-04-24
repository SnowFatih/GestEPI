import { Pool } from "mariadb";

interface ExportLog {
    exportType: string;
    userId: number;
    exportedLines: number;
}


export class DatabaseUtils {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async logExport({ exportType, userId, exportedLines }: ExportLog): Promise<void> {
        const query = `
            INSERT INTO export_history (export_type, epiUser, exported_lines)
            VALUES (?, ?, ?);
        `;
        try {
            const [results] = await this.pool.execute(query, [exportType, userId, exportedLines]);
            console.log('Export logged successfully:', results);
        } catch (error) {
            console.error('Failed to log export:', error);
            throw error;  
        }
    }
}

