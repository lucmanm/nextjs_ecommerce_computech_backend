import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
type TCustomButton = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};
const CustomButtom: React.FC<TCustomButton> = ({ className, onClick, children }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("w-full", className)}
      onClick={onClick}
      disabled={pending}
    >
      {children}
    </Button>
  );
};

export default CustomButtom;
