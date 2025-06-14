"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 2.5,
    stock: 100,
    status: "in_stock",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 5.75,
    stock: 15,
    status: "low_stock",
  },
  {
    id: 3,
    name: "Ibuprofen 400mg",
    category: "Pain Relief",
    price: 3.25,
    stock: 0,
    status: "out_of_stock",
  },
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id: number) => {
    setProductToDelete(id);
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/products/${id}`);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);
      
      // Show success alert
      Swal.fire({
        title: t("products.deleteSuccess.title"),
        text: t("products.deleteSuccess.message"),
        icon: "success",
        confirmButtonText: t("common.ok"),
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_stock":
        return "bg-green-100 text-green-800";
      case "low_stock":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case "in_stock":
        return t("products.statusTypes.inStock");
      case "low_stock":
        return t("products.statusTypes.lowStock");
      case "out_of_stock":
        return t("products.statusTypes.outOfStock");
      default:
        return status;
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("products.title")}</h1>
        <Button 
          className="flex items-center gap-2"
          onClick={() => router.push("/admin/products/new")}
        >
          <PlusCircle className="h-5 w-5" />
          {t("products.addNew")}
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder={t("products.searchPlaceholder")}
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("products.name")}</TableHead>
              <TableHead>{t("products.category")}</TableHead>
              <TableHead>{t("products.price")}</TableHead>
              <TableHead>{t("products.stock")}</TableHead>
              <TableHead>{t("products.status")}</TableHead>
              <TableHead className="text-right">
                {t("products.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(product.status)}`}
                  >
                    {getStatusTranslation(product.status)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={() => setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("products.deleteConfirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("products.deleteConfirm.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
