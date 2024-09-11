import { z } from "zod";


export type paySlipTypes = z.infer<typeof paySlipSchema>

export const paySlipSchema = z.object({
    payslipUrl: z.string().min(1, "Payslip is required"),
  });