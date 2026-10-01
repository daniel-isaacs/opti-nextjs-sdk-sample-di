'use client';

import { FormElement, getPreviewUtils, useFormField } from '@optimizely/cms-sdk/forms/react';
import { getSelectionOptions } from '@optimizely/cms-sdk/forms/validation';

type FormChoiceContent = {
  Label?: string | null;
  Options?: unknown;
  AllowMultiSelect?: boolean | null;
} & Record<string, unknown>;

export default function FormChoice({ content }: { content: FormChoiceContent }) {
  const options = getSelectionOptions(content);
  const isMulti = !!content.AllowMultiSelect;
  const defaultValue = options.filter(o => o.selected).map(o => o.value).join(',');
  const { value, setValue, onBlur, errors, showErrors, errorId, isRequired, fieldProps } =
    useFormField({ content, defaultValue });
  const { pa } = getPreviewUtils(content);
  const selected = value ? value.split(',') : [];

  function toggle(optionValue: string) {
    if (!isMulti) {
      setValue(optionValue);
      return;
    }
    setValue(
      selected.includes(optionValue)
        ? selected.filter(v => v !== optionValue).join(',')
        : [...selected, optionValue].join(',')
    );
  }

  return (
    <FormElement content={content}>
      <fieldset aria-describedby={errorId}>
        <legend className="block text-sm font-medium text-foreground mb-1" {...pa('Label')}>
          {content.Label}
          {isRequired && <span className="text-red-600"> *</span>}
        </legend>
        <div className="space-y-1">
          {options.map(option => (
            <label key={option.value} className="flex items-center gap-2 text-foreground">
              <input
                type={isMulti ? 'checkbox' : 'radio'}
                name={fieldProps.name}
                checked={selected.includes(option.value)}
                onChange={() => toggle(option.value)}
                onBlur={onBlur}
              />
              {option.label}
            </label>
          ))}
        </div>
        {showErrors && (
          <div id={errorId} role="alert" className="text-sm text-red-600 mt-1">
            {errors.map(e => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
      </fieldset>
    </FormElement>
  );
}
