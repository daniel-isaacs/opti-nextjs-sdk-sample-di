'use client';

import { FormElement, useFormButton } from '@optimizely/cms-sdk/forms/react';

type FormButtonContent = {
  Label?: string | null;
  Tooltip?: string | null;
} & Record<string, unknown>;

export default function FormButton({ content }: { content: FormButtonContent }) {
  const { role, label, isSubmitting, buttonProps } = useFormButton(content);

  return (
    <FormElement content={content}>
      <button
        {...buttonProps}
        className={
          role === 'previous'
            ? 'rounded px-4 py-2 border border-border text-foreground'
            : 'rounded px-4 py-2 bg-primary text-primary-foreground disabled:opacity-50'
        }
      >
        {isSubmitting ? 'Submitting…' : label}
      </button>
    </FormElement>
  );
}
