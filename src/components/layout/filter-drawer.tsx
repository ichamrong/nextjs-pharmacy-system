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

interface FilterDrawerProps {
  title: string;
  children: React.ReactNode;
}

export function FilterDrawer({ title, children }: FilterDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            Select your filters to narrow down the results
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
          <div className="space-y-6">
            {children}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
} 