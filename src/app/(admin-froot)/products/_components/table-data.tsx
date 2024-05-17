import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type TCategory = {
  id: string;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  languageCode: string;
};

export default function TableData({ item }: { item: TCategory }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-accent">
          <TableCell>
            <div className="font-medium">{item.name}</div>
            {/* <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div> */}
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
