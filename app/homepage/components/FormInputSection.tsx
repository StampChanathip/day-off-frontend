"use client";
import { z } from "zod";
import { useAppForm } from "@/shared/constants/form";
import HolidaysInput from "./HolidaysInput";
import LeaveDaysInput from "./LeaveDaysInput";

export default function FormInputSection() {
  const FormSchema = z.object({
    dayOffAmount: z.coerce
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .gte(1, "Amount must be between 1 and 365")
      .lte(365, "Amount must be between 1 and 365"),
  });

  const form = useAppForm({
    defaultValues: {
      dayOffAmount: 1,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col space-y-4 md:w-xl">
        <LeaveDaysInput form={form} />
        <HolidaysInput form={form} />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary mt-4 w-full text-lg font-bold"
            >
              {isSubmitting ? "Planning..." : "Plan your day off"}
            </button>
          )}
        />
      </div>
    </form>
  );
}
