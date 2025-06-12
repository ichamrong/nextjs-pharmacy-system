'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';

// Mock data for medicines
const medicines = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    sku: 'MED001',
    category: 'Pain Relief',
    stock: 100,
    price: 5.99,
    supplier: 'ABC Pharma',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    sku: 'MED002',
    category: 'Antibiotics',
    stock: 50,
    price: 12.99,
    supplier: 'XYZ Pharma',
  },
  {
    id: '3',
    name: 'Omeprazole 20mg',
    sku: 'MED003',
    category: 'Gastrointestinal',
    stock: 75,
    price: 8.99,
    supplier: 'ABC Pharma',
  },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">
            Manage your medicine inventory
          </p>
        </div>
        <Button className="glass-card">
          <Plus className="mr-2 h-4 w-4" />
          Add Medicine
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 glass-card"
          />
        </div>
      </div>

      <div className="glass-card rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>{medicine.sku}</TableCell>
                <TableCell>{medicine.category}</TableCell>
                <TableCell>{medicine.stock}</TableCell>
                <TableCell>${medicine.price.toFixed(2)}</TableCell>
                <TableCell>{medicine.supplier}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 