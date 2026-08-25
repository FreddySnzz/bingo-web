import { Button } from "@/components/ui/button"
import { Loader2Icon } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  className?: string; 
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  isLoading?: boolean;
};

export function ButtonShadUI({ 
  text, 
  onClick, 
  className, 
  variant,
  size,
  isLoading = false,
}: ButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      className={className} 
      variant={variant} 
      size={size}>
        {isLoading ? <Loader2Icon className="animate-spin" /> : null}
        {text}
    </Button>
  );
};
