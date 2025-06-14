import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientWrapper } from "@/components/client-wrapper";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="glass-card flex items-center justify-between">
      <div>
        <ClientWrapper>
          <h1 className="text-3xl font-bold text-white/90">{title}</h1>
        </ClientWrapper>
        {description && (
          <ClientWrapper>
            <p className="text-white/60 mt-1">{description}</p>
          </ClientWrapper>
        )}
      </div>
      {action && (
        <Button 
          onClick={() => window.location.href = action.href}
          className="glass-button flex items-center gap-2 text-white/90"
        >
          {action.icon || <Plus className="h-4 w-4" />}
          <ClientWrapper>{action.label}</ClientWrapper>
        </Button>
      )}
    </div>
  );
} 