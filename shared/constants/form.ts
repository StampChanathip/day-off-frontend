import TextInput from "@/components/form/TextInput";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
