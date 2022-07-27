import type { Employee } from '../models/employee';

class EmployeesService {
  async getAll(): Promise<Employee[]> {
    return this.callApiGetResponse('/employees', 'GET');
  }

  async get(employeeId: string): Promise<Employee> {
    return this.callApiGetResponse('/employees/' + employeeId, 'GET');
  }

  async add(employee: Employee): Promise<void> {
    await this.callApi('/employees', 'POST', employee);
  }

  async update(employee: Employee): Promise<void> {
    await this.callApi('/employees/' + employee.id, 'PUT', employee);
  }

  async delete(employeeId: string): Promise<void> {
    await this.callApi('employees/' + employeeId, 'DELETE');
  }

  private async callApiGetResponse<T>(path: string, method: string, body: any = null): Promise<T> {
    const response = await this.callApi(path, method, body);
    return await response.json() as T;
  }

  private async callApi(path: string, method: string, body: any = null): Promise<Response> {
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
    return response;
  }
}

interface ErrorResponse {
  message: string;
}

export default new EmployeesService();
