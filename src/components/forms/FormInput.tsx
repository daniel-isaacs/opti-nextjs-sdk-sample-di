'use client';

import { FormElement, getPreviewUtils, useFormField } from '@optimizely/cms-sdk/forms/react';
import { getHtmlValidationAttributes, toValidators } from '@optimizely/cms-sdk/forms/validation';

type FormInputContent = {
  Label?: string | null;
  Placeholder?: string | null;
  Validators?: unknown;
} & Record<string, unknown>;

export default function FormInput({ content }: { content: FormInputContent }) {
  const { fieldProps, errorProps, errors, showErrors, isRequired } = useFormField({ content });
  const { pa } = getPreviewUtils(content);
  const htmlAttrs = getHtmlValidationAttributes(toValidators(content.Validators));

  return (
    <FormElement content={content}>
      <div>
        <label htmlFor={fieldProps.id} className="block text-sm font-medium text-foreground mb-1" {...pa('Label')}>
          {content.Label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
        <input
          {...fieldProps}
          type={(htmlAttrs.type as string) ?? 'text'}
          placeholder={content.Placeholder ?? ''}
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
