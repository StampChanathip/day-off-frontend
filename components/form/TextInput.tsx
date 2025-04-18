import { ChangeEventHandler, FocusEventHandler } from "react";

type TextInputProps = {
  label?: string;
  placeHolder?: string;
  type: string;
  value: string | number | readonly string[] | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  errorMessage?: string;
};

export default function TextInput({
  label,
  placeHolder,
  type,
  value,
  onChange,
  onBlur,
  errorMessage,
}: TextInputProps) {
  return (
    <div className="w-full">
      <label className="fieldset-label w-full">{label}</label>
      <input
        type={type}
        className="input w-full"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {errorMessage && (
        <p className="text-destructive text-sm mt-1 text-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
