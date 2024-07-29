import { CreditCard } from 'lucide-react';

import { createPayment } from '@/app/actions';

import { Button } from '@/components/ui/Button';

interface FormPaymentProps {
  invoiceId: number;
}

const FormPayment = ({ invoiceId }: FormPaymentProps) => {
  return (
    <form action={createPayment}>
      <input type="hidden" name="id" value={invoiceId} />
      <Button className="flex gap-2 items-center font-bold bg-green-700" type="submit" size="lg">
        <CreditCard className="w-5 h-5" />
        Pay Invoice
      </Button>
    </form>
  )
}

export default FormPayment;