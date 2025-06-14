import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientWrapper } from "@/components/client-wrapper";

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export function DataTable<T>({ columns, data, isLoading }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="glass-table p-4 space-y-3">
        <div className="h-8 bg-white/5 animate-pulse rounded-lg" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-white/5 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="glass-table">
      <Table>
        <TableHeader>
          <TableRow className="glass-table-header">
            {columns.map((column) => (
              <TableHead key={String(column.accessorKey)} className="text-white/80">
                <ClientWrapper>{column.header}</ClientWrapper>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="glass-table-row">
              {columns.map((column) => (
                <TableCell key={String(column.accessorKey)} className="text-white/70">
                  {column.cell ? (
                    column.cell(item)
                  ) : (
                    <ClientWrapper>
                      {String(item[column.accessorKey])}
                    </ClientWrapper>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 