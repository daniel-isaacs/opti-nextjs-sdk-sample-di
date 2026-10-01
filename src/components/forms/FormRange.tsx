'use client';

import { FormElement, getPreviewUtils, useFormField } from '@optimizely/cms-sdk/forms/react';

type FormRangeContent = {
  Label?: string | null;
  PredefinedValue?: string | null;
  Min?: number | null;
  Max?: number | null;
  Increment?: number | null;
} & Record<string, unknown>;

export default function FormRange({ content }: { content: FormRangeContent }) {
  const min = content.Min ?? 0;
  const max = content.Max ?? 100;
  const step = content.Increment ?? 1;
  const { value, fieldProps } = useFormField({
    content,
    defaultValue: content.PredefinedValue ?? String(min),
  });
  const { pa } = getPreviewUtils(content);

  return (
    <FormElement content={content}>
      <div>
        <label htmlFor={fieldProps.id} className="block text-sm font-medium text-foreground mb-1" {...pa('Label')}>
          {content.Label}
        </label>
        <div className="flex items-center gap-3">
          <input {...fieldProps} type="range" min={min} max={max} step={step} className="w-full" />
          <span className="text-sm text-muted-foreground w-10 text-right">{value}</span>
        </div>
      </div>
    </FormElement>
  );
}
