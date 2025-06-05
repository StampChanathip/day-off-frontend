import { useFieldContext } from "@/shared/constants/form";
import { ChangeEventHandler } from "react";

type TextInputProps = {
  label?: string;
  placeHolder?: string;
  type: string;
};

export default function TextInput({
  label,
  placeHolder,
  type,
}: TextInputProps) {
  const field = useFieldContext<string | number>();
  const errorMessage = field.state.meta.errors[0]?.message || "";

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // Handle both string and number types
    if (type === "number") {
      field.handleChange(e.target.valueAsNumber);
    } else {
      field.handleChange(e.target.value);
    }
  };

  return (
    <div className="w-full">
      <label className="fieldset-label w-full text-base mb-1">{label}</label>
      <input
        type={type}
        className="input w-full"
        placeholder={placeHolder}
        value={field.state.value || ""}
        onChange={handleChange}
        onBlur={field.handleBlur}
      />
      {errorMessage && (
        <p className="text-destructive text-sm mt-1 text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
