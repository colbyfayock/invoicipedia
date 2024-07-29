import { cn } from "@/lib/utils"
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div className={cn("max-w-6xl w-full px-6 mx-auto", className)} {...props}>
      { children }
    </div>
  )
}

export default Container;