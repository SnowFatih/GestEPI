import { exportCSVJsonModel } from '../models/exportCSVJsonModel';

export async function exportCSVManager(): Promise<string> {
  return await exportCSVJsonModel.exportCSV();
}

export async function exportJsonManager(): Promise<string> {
  const data = await exportCSVJsonModel.getAll();
  return JSON.stringify(data);
}

export async function exportJsonManagerById(id: string): Promise<string> {
  return await exportCSVJsonModel.exportJSON();
}