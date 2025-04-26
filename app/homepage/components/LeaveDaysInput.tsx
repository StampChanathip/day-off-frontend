import { withForm } from "@/shared/constants/form";
import { InputType } from "@/shared/enums/form";

const LeaveDaysInput = withForm({
  defaultValues: {
    dayOffAmount: 1,
  },
  render: function Render({ form }) {
    return (
      <fieldset className="fieldset border border-base-300 p-4 rounded-box space-y-3">
        <div>
          <span className="flex items-center space-x-2">
            <div aria-label="status" className="status status-primary" />
            <p className="fieldset-label text-lg">Input your paid time off</p>
          </span>
          <p className="fieldset-label">
            Enter how many paid time off days you have available.
          </p>
        </div>
        <form.AppField
          name="dayOffAmount"
          children={(field) => (
            <field.TextInput
              label="Amount of days"
              type={InputType.Number}
              placeHolder="Enter your days"
              onChange={(e) => {
                field.handleChange(e.target.valueAsNumber);
              }}
            />
          )}
        />
      </fieldset>
    );
  },
});

export default LeaveDaysInput;
