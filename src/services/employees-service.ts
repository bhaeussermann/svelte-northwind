import type { Employee } from '../models/employee';

class EmployeesService {
  async getAll(): Promise<Employee[]> {
    return this.callApi('/employees', 'GET');
  }

  async add(employee: Employee): Promise<void> {
    return this.callApi('/employees', 'POST', employee);
  }

  private async callApi<T>(path: string, method: string, body: any = null): Promise<T> {
    const response = await fetch(
      '/api' + path,
      {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: !body ? undefined : JSON.stringify(body)
      });
    if (!response.ok) {
      const errorResponse = await response.json() as ErrorResponse;
      throw new Error(errorResponse.message ?? response.statusText);
    }
    return await response.json() as T;
  }
}

interface ErrorResponse {
  message: string;
}

export default new EmployeesService();
