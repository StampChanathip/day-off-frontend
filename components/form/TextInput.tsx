import { useFieldContext } from "@/shared/constants/form";
import { ChangeEventHandler, FocusEventHandler } from "react";

type TextInputProps = {
  label?: string;
  placeHolder?: string;
  type: string;
  value?: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  errorMessage?: string;
};

export default function TextInput({
  label,
  placeHolder,
  type,
  onChange,
}: TextInputProps) {
  const field = useFieldContext<string>();
  const errorMessage = field.state.meta.errors[0]?.message || "";

  return (
    <div className="w-full">
      <label className="fieldset-label w-full text-base mb-1">{label}</label>
      <input
        type={type}
        className="input w-full"
        placeholder={placeHolder}
        value={field.state.value}
        onChange={onChange}
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
