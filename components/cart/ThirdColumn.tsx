"use client";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({ description: "calculating.." });
    await updateCartItemAction({ amount: value, cartItemId: id });
    toast({ description: "cart updated" });
    setIsLoading(false);
  };
  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.cartItem}
        isLoading={isLoading}
      />

      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton text="Remove" className="mt-4 text-xs" size="sm" />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
