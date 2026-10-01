'use client';

import { FormElement, getPreviewUtils, useFormField } from '@optimizely/cms-sdk/forms/react';
import { getSelectionOptions } from '@optimizely/cms-sdk/forms/validation';

type FormSelectionContent = {
  Label?: string | null;
  Placeholder?: string | null;
  Options?: unknown;
  AllowMultiSelect?: boolean | null;
} & Record<string, unknown>;

export default function FormSelection({ content }: { content: FormSelectionContent }) {
  const options = getSelectionOptions(content);
  const isMulti = !!content.AllowMultiSelect;
  const defaultValue = options.filter(o => o.selected).map(o => o.value).join(',');
  const { value, setValue, fieldProps, errorProps, errors, showErrors, isRequired } =
    useFormField<HTMLSelectElement>({ content, defaultValue });
  const { pa } = getPreviewUtils(content);
  const selected = value ? value.split(',') : [];

  return (
    <FormElement content={content}>
      <div>
        <label htmlFor={fieldProps.id} className="block text-sm font-medium text-foreground mb-1" {...pa('Label')}>
          {content.Label}
          {isRequired && <span className="text-red-600"> *</span>}
        </label>
        <select
          {...fieldProps}
          multiple={isMulti}
          value={isMulti ? selected : value}
          onChange={
            isMulti
              ? e => setValue(Array.from(e.target.selectedOptions).map(o => o.value).join(','))
              : fieldProps.onChange
          }
          className="w-full rounded border border-border bg-background px-3 py-2 text-foreground"
        >
          {!isMulti && <option value="">{content.Placeholder ?? 'Select…'}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
