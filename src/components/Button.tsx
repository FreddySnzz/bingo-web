import { Button } from "@/components/ui/button"

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function ButtonShadUI({ children, onClick }: ButtonProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button onClick={onClick}>{children}</Button>
    </div>
  )
}
