import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import UserNavbar from "../_components/userNavbar";

export default function Reminders() {
  return (
    <div className="h-screen">
      <UserNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Students and Graduate Records Reminders
        </h1>
        <Tabs defaultValue="process" className="w-full dark:bg-[#18191A]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="process">Process Flow</TabsTrigger>
            <TabsTrigger value="guidelines">
              Confidentiality Guidelines
            </TabsTrigger>
          </TabsList>
          <TabsContent value="process">
            <Card className="dark:bg-[#18191A]">
              <CardHeader>
                <CardTitle>Process Flow for Obtaining Records</CardTitle>
                <CardDescription>
                  Transcript of Records, Diploma & Certificate of Graduation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-4">
                  <li>
                    <strong>Assessment Office</strong>
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Present passbook or secure clearance from the assessment
                        office
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Registrar Office</strong>
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Present passbook, valid ID, birth certificate, marriage
                        contract (for married women)
                      </li>
                      <li>Provide 2x2 picture (toga with white background)</li>
                      <li>Present clearance to the registrar staff</li>
                      <li>Accomplish request form for College/Department</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Cashiers Office</strong>
                    <ul className="list-disc list-inside ml-5">
                      <li>Pay the corresponding fee</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Registrars Office</strong>
                    <ul className="list-disc list-inside ml-5">
                      <li>Submit official receipt</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Registrars Office (After 2 days)</strong>
                    <ul className="list-disc list-inside ml-5">
                      <li>
                        Claim Transcript of Records (TOR) from the registrars
                        office
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>End of Process</strong>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="guidelines">
            <Card className="dark:bg-[#18191A]">
              <CardHeader>
                <CardTitle>Confidentiality of Records</CardTitle>
                <CardDescription>
                  Guidelines for handling student records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    A student is entitled to a transcript of record, but not to
                    other confidential records in their file.
                  </li>
                  <li>
                    Students have the right to see and receive explanations for
                    their academic records.
                  </li>
                  <li>
                    School officials and faculty members may access student
                    records for academic evaluation purposes.
                  </li>
                  <li>
                    Records and grades may be released to parents/guardians of
                    minors without prior approval.
                  </li>
                  <li>
                    Academic information may be released to potential employers
                    upon request.
                  </li>
                  <li>
                    Information may be shared with research organizations,
                    philanthropic organizations, or government agencies
                    supporting the student.
                  </li>
                  <li>
                    Official government agency requests for enrollment, academic
                    standing, or school work information should be honored.
                  </li>
                  <li>
                    Transcripts should only contain information about academic
                    status.
                  </li>
                  <li>
                    All requests for disclosure of student academic records
                    should be in writing and filed.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            For more information, please contact the Registrars Office
          </p>
          <Button className="bg-[#800000] text-white dark:bg-white dark:text-black">
            <Link href="/student/dashboard">Request a Document</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
