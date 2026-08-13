import { useState } from 'react';
import { toast } from 'sonner';
import { Button, Input, Modal } from '@/components/ui';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCustomerModal({ isOpen, onClose }: AddCustomerModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Customer added successfully');
      onClose();
    }, 700);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Customer">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Full Name" placeholder="Jane Doe" required />
        <Input label="Phone Number" placeholder="+254 7XX XXX XXX" required />
        <div className="flex gap-3 pt-1">
          <Button type="button" variant="outline" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" fullWidth isLoading={isSubmitting}>
            Add Customer
          </Button>
        </div>
      </form>
    </Modal>
  );
}
