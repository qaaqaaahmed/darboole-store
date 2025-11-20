import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type CheckboxInputProps = {
  name: string;
  label: string;
  defaultChecked?: boolean;
};
function CheckboxInput({
  name,
  label,
  defaultChecked = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <Label
        htmlFor={name}
        className="leading-none text-sm capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </Label>
    </div>
  );
}

export default CheckboxInput;
