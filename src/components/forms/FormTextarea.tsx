'use client';

import { FormElement, getPreviewUtils, useFormField } from '@optimizely/cms-sdk/forms/react';

type FormTextareaContent = {
  Label?: string | null;
  Placeholder?: string | null;
} & Record<string, unknown>;

export default function FormTextarea({ content }: { content: FormTextareaContent }) {
  const { fieldProps, errorProps, errors, showErrors, isRequired } =
    useFormField<HTMLTextAreaElement>({ content });
  const { pa } = getPreviewUtils(content);

  return (
    <FormElement content={content}>
      <div>
        <label htmlFor={fieldProps.id} className="block text-sm font-medium text-foreground mb-1" {...pa('Label')}>
          {content.Label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
        <textarea
          {...fieldProps}
          placeholder={content.Placeholder ?? ''}
          rows={4}
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
        />
        {showErrors && (
          <div {...errorProps} className="text-sm text-red-600 mt-1">
            {errors.map(e => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
      </div>
    </FormElement>
  );
}
