import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ placeholder, value, onChange, className }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`glass-input pl-10 text-white/90 placeholder:text-white/40 ${className || ''}`}
      />
    </div>
  );
} 