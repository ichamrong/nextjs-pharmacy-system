"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Filter } from "lucide-react";

interface FilterDrawerProps {
  title: string;
  children: React.ReactNode;
  onApply?: () => void;
  onReset?: () => void;
  className?: string;
}

export function FilterDrawer({
  title,
  children,
  onApply,
  onReset,
  className,
}: FilterDrawerProps) {
  const { t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className={cn(
            "h-9 gap-2 bg-white hover:bg-gray-50 text-gray-700",
            className,
          )}
        >
          <Filter className="h-4 w-4" />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[50vw] min-w-[400px] max-w-[800px] bg-white p-0 flex flex-col border-0"
      >
        <div className="flex items-center justify-between px-8 py-6 shadow-sm">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-10 py-8">
            <div className="space-y-10">{children}</div>
          </div>
        </ScrollArea>

        <div className="shadow-[0_-1px_3px_rgba(0,0,0,0.05)] px-10 py-6 bg-white">
          <SheetFooter className="px-8 py-6">
            <div className="flex items-center justify-between w-full gap-4">
              <Button
                variant="outline"
                onClick={onReset}
                className="flex-1 border-gray-200 hover:bg-gray-50"
              >
                {t("common.reset")}
              </Button>
              <Button
                onClick={onApply}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {t("common.apply")}
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
