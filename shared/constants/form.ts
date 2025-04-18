import TextInput from "@/components/form/TextInput";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm };
