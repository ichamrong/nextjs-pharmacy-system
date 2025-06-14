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
    <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-lg p-4 flex items-center justify-between">
      <div>
        <ClientWrapper>
          <h1 className="text-xl font-semibold text-emerald-900">{title}</h1>
        </ClientWrapper>
        {description && (
          <ClientWrapper>
            <p className="text-emerald-700/80 text-sm mt-0.5">{description}</p>
          </ClientWrapper>
        )}
      </div>
      {action && (
        <Button 
          onClick={handleClick}
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 h-8 px-3"
        >
          {action.icon || <Plus className="h-3.5 w-3.5" />}
          <ClientWrapper>{t(action.label)}</ClientWrapper>
        </Button>
      )}
    </div>
  );
} 