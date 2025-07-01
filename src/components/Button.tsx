import { Button } from "@/components/ui/button"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; 
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export function ButtonShadUI({ 
  children, 
  onClick, 
  className, 
  variant,
  size,
}: ButtonProps) {
  return (
    <Button 
      onClick={onClick} 
      className={className} 
      variant={variant} 
      size={size}>
        {children}
    </Button>
  );
};
