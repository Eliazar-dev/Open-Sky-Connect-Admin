import { mockPayments } from './mockData';

export interface GetPaymentsParams {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export const paymentsService = {
  async getPayments(params: GetPaymentsParams = {}) {
    // Mock implementation - replace with real API call
    const { search = '', status, page = 1, pageSize = 10 } = params;
    
    let filtered = mockPayments;
    if (search) {
      filtered = filtered.filter((p: any) => 
        p.customerName.toLowerCase().includes(search.toLowerCase()) ||
        p.customerPhone.includes(search) ||
        p.transactionId.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter((p: any) => p.status === status);
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
