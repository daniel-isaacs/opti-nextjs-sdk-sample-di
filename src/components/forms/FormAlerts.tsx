'use client';

import { useFormSubmission } from '@optimizely/cms-sdk/forms/react';

export default function FormAlerts({
  submitConfirmationMessage,
}: {
  submitConfirmationMessage?: string | null;
}) {
  const { formSuccess, formError, errorMessage } = useFormSubmission();
  if (!formSuccess && !formError) return null;

  return (
    <>
      {formSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded" role="status">
          {submitConfirmationMessage || 'Thank you! Your form has been submitted.'}
        </div>
      )}
      {formError && (
        <div className="bg-red-100 text-red-800 p-4 rounded" role="alert">
          {errorMessage || 'Sorry, there was an error. Please try again.'}
        </div>
      )}
    </>
  );
}
