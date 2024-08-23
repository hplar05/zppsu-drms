import { Skeleton } from "@/src/components/ui/skeleton";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

export default function RequestListsSkeleton() {
  return (
    <Table>
      <TableCaption className="bg-gray-200 animate-pulse rounded">
        List of Requests Form
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead className="text-right flex justify-center items-center">
            <Skeleton className="h-4 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right flex justify-center items-center gap-1">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={9}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-full" />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
