import { Cart } from "@prisma/client";
import React from "react";
import { Card, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Separator } from "../ui/separator";
import FormContainer from "../form/FormContainer";
import { createOrderAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, orderTotal, tax, shipping } = cart;

  return (
    <div>
      <Card className="p-8">
        <CardTotalsRow label="Cart Total" amount={cartTotal} />
        <CardTotalsRow label="Shipping" amount={shipping} />
        <CardTotalsRow label="Tax" amount={tax} />

        <CardTitle className="mt-8">
          <CardTotalsRow label="Order Total" amount={orderTotal} lastRow />
        </CardTitle>
      </Card>

      <FormContainer action={createOrderAction}>
        <SubmitButton text="place order" className="mt-8 w-full" />
      </FormContainer>
    </div>
  );
}

function CardTotalsRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <div>
      <p className="text-sm flex items-center justify-between gap-x-2">
        <span>{label}</span>
        <span>{formatCurrency(amount)}</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </div>
  );
}

export default CartTotals;
