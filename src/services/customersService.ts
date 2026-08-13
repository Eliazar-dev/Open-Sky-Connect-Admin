import { mockCustomers } from './mockData';

export interface GetCustomersParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export const customersService = {
  async getCustomers(params: GetCustomersParams = {}) {
    // Mock implementation - replace with real API call
    const { search = '', page = 1, pageSize = 10 } = params;
    
    let filtered = mockCustomers;
    if (search) {
      filtered = filtered.filter((c: any) => 
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.phoneNumber.includes(search)
      );
    }
    
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);
    
    return {
      items: paginated,
      total: filtered.length,
      page,
      pageSize,
    };
  },
};
