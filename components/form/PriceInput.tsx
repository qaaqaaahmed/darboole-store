import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormInputNumberProps = {
  defaultValue?: number;
};

const name = "price";
function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        price ($)
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
}

export default PriceInput;
