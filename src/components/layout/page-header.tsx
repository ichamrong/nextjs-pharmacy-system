import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientWrapper } from "@/components/client-wrapper";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  const { t } = useLanguage();

  const handleClick = () => {
    if (action?.onClick) {
      action.onClick();
    } else if (action?.href) {
      window.location.href = action.href;
    }
  };

  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 flex items-center justify-between">
      <div>
        <ClientWrapper>
          <h1 className="text-3xl font-bold text-emerald-900">{title}</h1>
        </ClientWrapper>
        {description && (
          <ClientWrapper>
            <p className="text-emerald-700 mt-1">{description}</p>
          </ClientWrapper>
        )}
      </div>
      {action && (
        <Button 
          onClick={handleClick}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        >
          {action.icon || <Plus className="h-4 w-4" />}
          <ClientWrapper>{t(action.label)}</ClientWrapper>
        </Button>
      )}
    </div>
  );
} 