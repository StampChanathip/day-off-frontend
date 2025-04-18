"use client";
import { auth } from "@/api/authApi";
import TextInput from "@/components/form/TextInput";
import Loading from "@/components/utils/Loading";
import { InputType } from "@/shared/enums/form";
import { useToast } from "@/shared/providers/ToastProvider";
import { registerRequestType } from "@/shared/types/api/authApiType";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export default function Register() {
  const { showError, showSuccess } = useToast();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (request: registerRequestType) => auth.register(request),
    onSuccess: () => {
      showSuccess("Register success");
    },
    onError(error) {
      showError(error.message);
    },
  });

  const handleRegister = async (request: registerRequestType) => {
    mutateAsync(request);
  };

  const registerSchema = z
    .object({
      firstName: z.string().nonempty({
        message: "This field is required",
      }),
      lastName: z.string().nonempty({
        message: "This field is required",
      }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string(),
      confirmedPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: "Passwords do not match",
      path: ["confirmedPassword"],
    });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password, firstName, lastName } = value;
      await handleRegister({
        email,
        password,
        firstName,
        lastName,
      });
    },
  });

  return (
    <Loading isLoading={isPending}>
      <div className="w-full flex flex-row items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col items-center w-sm md:w-lg space-y-3">
            <h1 className="text-5xl font-bold">Register</h1>
            <div className="flex flex-row w-full space-x-1 md:space-x-4 justify-between">
              <form.Field
                name="firstName"
                children={(field) => (
                  <>
                    <TextInput
                      label="First Name"
                      type={InputType.Text}
                      placeHolder="First Name"
                      errorMessage={
                        field.state.meta.errors[0]
                          ? field.state.meta.errors[0].message
                          : ""
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
              <form.Field
                name="lastName"
                children={(field) => (
                  <>
                    <TextInput
                      label="Last Name"
                      type={InputType.Text}
                      placeHolder="Last Name"
                      errorMessage={
                        field.state.meta.errors[0]
                          ? field.state.meta.errors[0].message
                          : ""
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </>
                )}
              />
            </div>
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <TextInput
                    label="Email"
                    type={InputType.Email}
                    placeHolder="Email"
                    errorMessage={
                      field.state.meta.errors[0]
                        ? field.state.meta.errors[0].message
                        : ""
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <TextInput
                  label="Password"
                  type={InputType.Password}
                  placeHolder="Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <form.Field
              name="confirmedPassword"
              children={(field) => (
                <>
                  <TextInput
                    label="Confirmed Password"
                    type={InputType.Password}
                    placeHolder="Confirmed Password"
                    errorMessage={
                      field.state.meta.errors[0]
                        ? field.state.meta.errors[0].message
                        : ""
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn btn-primary mt-4 w-full text-lg font-bold"
                >
                  {isSubmitting ? "..." : "Register"}
                </button>
              )}
            />
          </div>
        </form>
      </div>
    </Loading>
  );
}
