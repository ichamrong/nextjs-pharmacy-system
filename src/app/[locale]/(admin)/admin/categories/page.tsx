"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { CategoryDialog } from "./category-dialog";

interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Medicines",
      description: "All types of medicines",
      createdAt: "2024-03-20",
      updatedAt: "2024-03-20",
    },
    {
      id: 2,
      name: "Supplements",
      description: "Health supplements and vitamins",
      createdAt: "2024-03-20",
      updatedAt: "2024-03-20",
    },
  ]);

  const handleSave = (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    // TODO: Implement save logic
    console.log("Saving category:", category);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("categories.title")}</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {t("categories.add")}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("categories.name")}</TableHead>
                <TableHead>{t("categories.description")}</TableHead>
                <TableHead>{t("categories.createdAt")}</TableHead>
                <TableHead>{t("categories.updatedAt")}</TableHead>
                <TableHead className="text-right">{t("categories.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.createdAt}</TableCell>
                  <TableCell>{category.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(category)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
      />
    </div>
  );
} 