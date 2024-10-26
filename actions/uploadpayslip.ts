"use server";

import { db } from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadPayslip(formData: FormData) {
    // get the payslip image url
  const payslipUrl = formData.get("payslipUrl");
  const id = formData.get("requestId");
  console.log(id)

 try {
    if (typeof payslipUrl === "string" && typeof id === "string") {
        await db.requestForm.update({
          data: {
            payslipUrl,
            action: "PAID",
            adminMessage: "Thank you for uploading your receipt, Kindly wait for admin to approve your payment."
          },
          where: { id: Number(id) },
        });
      } 
      revalidatePath("/student/dashboard");
      redirect("/student/dashboard");
    
 } catch (error) {
    console.log(`Failed to upload your receipt image : ${error}`)
 }
}
