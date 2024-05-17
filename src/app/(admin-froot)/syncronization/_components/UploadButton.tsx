import { cn } from "@/lib/utils";
import React, { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../../../../components/ui/button";
type TCustomButton = {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
const UploadButton: React.FC<TCustomButton> = ({ className, onClick }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn("w-full", className)}
      onClick={onClick}
      disabled={pending}
      type="submit"
    >
     {pending ? "Loading..." : "Upload"}
    </Button>
  );
};

export default UploadButton;
