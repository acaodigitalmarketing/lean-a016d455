
import React, { useEffect } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Dialog, DialogOverlay, DialogPortal, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
import { cn } from "@/lib/utils"

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
  countdown: number;
}

// Custom DialogContent without close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-dark-elevated p-6 shadow-dark-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
))
CustomDialogContent.displayName = DialogPrimitive.Content.displayName

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  onClose,
  onRedirect,
  countdown
}) => {
  useEffect(() => {
    if (countdown === 0) {
      onRedirect();
    }
  }, [countdown, onRedirect]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <CustomDialogContent className="max-w-md mx-auto glow-subtle">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-6 pt-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <DialogTitle className="text-light-primary text-2xl font-semibold mb-6 text-center">
            Solicitação Enviada com Sucesso!
          </DialogTitle>
          
          <DialogDescription className="text-light-muted text-center space-y-6">
            <p className="text-lg">
              Recebemos sua solicitação e nossa equipe entrará em contato em breve.
            </p>
            <p className="text-light-primary font-semibold text-lg">
              Você será redirecionado para o WhatsApp em {countdown} segundos...
            </p>
            <p className="text-sm text-light-muted">
              Aguarde o redirecionamento automático.
            </p>
          </DialogDescription>
        </DialogHeader>
      </CustomDialogContent>
    </Dialog>
  );
};

export default SuccessPopup;
