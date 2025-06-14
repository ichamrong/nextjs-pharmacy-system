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
  cell?: (props: { row: { original: T } }) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  className?: string;
}

export function DataTable<T>({ columns, data, isLoading, className }: DataTableProps<T>) {
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
    <div className={className}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50/50">
            {columns.map((column) => (
              <TableHead 
                key={String(column.accessorKey)} 
                className="text-gray-700 font-medium py-3.5 px-4"
              >
                <ClientWrapper>{column.header}</ClientWrapper>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow 
              key={index} 
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              {columns.map((column) => (
                <TableCell 
                  key={String(column.accessorKey)} 
                  className="text-gray-600 py-3.5 px-4"
                >
                  {column.cell ? (
                    column.cell({ row: { original: item } })
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