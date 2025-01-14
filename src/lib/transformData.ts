import { RequestStatusData } from "@/src/lib/types/dashboard";

export function transformRequestData(data: { date: string; totalRequests: number }[]): RequestStatusData[] {
  console.log('Input data for transformation:', data);
  
  const result = data.map(item => ({
    date: item.date,
    PENDING: item.totalRequests > 0 ? Math.max(1, Math.floor(item.totalRequests * 0.2)) : 0,
    DECLINE: item.totalRequests > 0 ? Math.max(1, Math.floor(item.totalRequests * 0.1)) : 0,
    APPROVE_PENDING_PAYMENT: item.totalRequests > 0 ? Math.max(1, Math.floor(item.totalRequests * 0.15)) : 0,
    PAID: item.totalRequests > 0 ? Math.max(1, Math.floor(item.totalRequests * 0.25)) : 0,
    COMPLETED: item.totalRequests > 0 ? Math.max(1, Math.floor(item.totalRequests * 0.3)) : 0,
    totalRequests: item.totalRequests
  }));

  console.log('Transformed data:', result);
  return result;
}

