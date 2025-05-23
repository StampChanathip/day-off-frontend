"use client";
import { z } from "zod";
import { useAppForm } from "@/shared/constants/form";
import HolidaysInput from "./HolidaysInput";
import LeaveDaysInput from "./LeaveDaysInput";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/shared/providers/ToastProvider";
import { homepage } from "@/api/homePageApi";
import { OptimizeHolidaysRequest } from "@/shared/types/api/holidaysApiType";
import dayjs from "dayjs";

export default function FormInputSection() {
  const { showError, showSuccess } = useToast();
  const { mutateAsync } = useMutation({
    mutationFn: (request: OptimizeHolidaysRequest) =>
      homepage.submitOptimizeHolidays(request),
    onSuccess: () => {
      showSuccess("Holidays Optimized");
    },
    onError(error) {
      showError(error.message);
    },
  });

  const handleSubmitOptimizeHolidays = async (
    request: OptimizeHolidaysRequest
  ) => {
    await mutateAsync(request);
  };

  const FormSchema = z.object({
    leaveAmount: z.coerce
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .gte(1, "Amount must be between 1 and 365")
      .lte(365, "Amount must be between 1 and 365"),
  });

  const form = useAppForm({
    defaultValues: {
      leaveAmount: 1,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value }) => {
      const { leaveAmount } = value;
      handleSubmitOptimizeHolidays({
        leaveAmount,
        startDate: dayjs("2025-01-01").format("YYYY-MM-DD"), //TODO: change to get from input
        endDate: dayjs("2025-12-31").format("YYYY-MM-DD"), //TODO: change to get from input
      });
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
