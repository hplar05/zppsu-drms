import { db } from "@/src/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { JSX, SVGProps } from "react";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const request = await db.requestForm.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  const avatar = await db.user.findUnique({
    where: {
      id: request?.userId,
    },
  });
  if (!request) {
    notFound();
  }

  return (
    <div className="flex flex-col h-auto">
      <header className="bg-muted/20 px-4 md:px-6 py-8">
        <div className="container max-w-3xl flex flex-col items-center gap-4">
          {avatar?.image && (
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar?.image} alt="@zppsu" />
              <AvatarFallback>ZPPSU</AvatarFallback>
            </Avatar>
          )}
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{request.nameOfStudent}</h1>
            <p className="text-muted-foreground">
              {request.studentId} | {request.course}
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/10 px-4 md:px-6 py-8 border-t">
        <div className="container max-w-3xl grid gap-8">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Request Form</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.requestChoices}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">Purpose of Request</h3>
                  <p className="text-sm text-muted-foreground">
                    {request.purposeOfrequest}
                  </p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-4 flex flex-col gap-2 justify-center items-center">
                <h3 className="text-lg font-semibold">Receipt Image</h3>
                <p className="text-sm text-muted-foreground">
                  {request.payslipUrl && (
                    <Image
                      src={request.payslipUrl}
                      width={500}
                      height={500}
                      alt="payslip"
                    />
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function LayoutGridIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ActivityIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}
