"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterDrawerProps {
  title: string;
  children: React.ReactNode;
}

export function FilterDrawer({ title, children }: FilterDrawerProps) {
  const { t } = useLanguage();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] bg-white">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{t("users.filterDescription")}</SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6 pr-6">{children}</div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
