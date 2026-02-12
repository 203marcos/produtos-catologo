import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function toast({ title, description, variant = 'default' }: ToastProps) {
  const message = description || title || '';

  if (variant === 'destructive') {
    return sonnerToast.error(message, {
      description: title && description ? title : undefined,
    });
  }

  return sonnerToast.success(message);
}

export { sonnerToast };
