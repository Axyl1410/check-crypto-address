import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as React from "react";

interface ExternalConfirmLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalConfirmLink({
  href,
  children,
  className,
}: ExternalConfirmLinkProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleContinue = () => {
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs text-center">
          <DialogHeader>
            <DialogTitle>This link will take you to another site.</DialogTitle>
          </DialogHeader>
          <div className="text-muted-foreground mb-4 text-sm">
            Please click below to continue.
          </div>
          <DialogFooter>
            <div className="flex w-full gap-2">
              <Button
                onClick={handleContinue}
                className="flex-1"
                variant="default"
              >
                Continue
              </Button>
              <Button
                onClick={() => setOpen(false)}
                className="flex-1"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
