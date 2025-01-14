export type RequestStatus = "PENDING" | "DECLINE" | "APPROVE_PENDING_PAYMENT" | "PAID" | "COMPLETED";

export interface RequestStatusData {
  date: string;
  PENDING: number;
  DECLINE: number;
  APPROVE_PENDING_PAYMENT: number;
  PAID: number;
  COMPLETED: number;
  totalRequests: number;
}

export interface DashboardDataProps {
  totalRequest: number;
  totalUsers: number;
  totalPending: number;
  completed: number;
  declined: number;
  totalPendingPayment: number;
  totalPaid: number;
  data: RequestStatusData[];
  userData: { date: string; totalUsers: number }[];
  usersApproved: number;
  usersNotApproved: number;
  nonAdminUsers: number;
}