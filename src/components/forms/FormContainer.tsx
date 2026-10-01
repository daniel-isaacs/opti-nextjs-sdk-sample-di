import { OptiFormsContainerContentType } from '@optimizely/cms-sdk';
import { OptimizelyGridSection, getPreviewUtils, StructureContainerProps } from '@optimizely/cms-sdk/react/server';
import {
  FormSubmissionProvider,
  FormStep,
  FormWrapper,
  isFormButtonNode,
  partitionFormNodes,
} from '@optimizely/cms-sdk/forms/react';
import FormAlerts from './FormAlerts';

export default function FormContainer({ content }: { content: OptiFormsContainerContentType }) {
  const { pa } = getPreviewUtils(content);
  const nodes = content.nodes ?? [];
  const stepNodes = nodes.filter(node => !isFormButtonNode(node));

  return (
    <FormSubmissionProvider>
      <div id="form-alert" className="max-w-2xl mx-auto space-y-5">
        {content.Title && (
          <h2 className="text-2xl font-semibold text-foreground" {...pa('Title')}>
            {content.Title}
          </h2>
        )}
        {content.Description && (
          <p className="text-muted-foreground" {...pa('Description')}>
            {content.Description}
          </p>
        )}

        <FormAlerts submitConfirmationMessage={content.SubmitConfirmationMessage} />

        <FormWrapper
          scrollToOnSuccess="form-alert"
          scrollToOnError={false}
          action={content.SubmitUrl?.default ?? ''}
          steps={stepNodes}
          rules={content.DependencyRules}
        >
          {stepNodes.map((node, index) => {
            const step = partitionFormNodes([node]);

            return (
              <FormStep key={node.key} index={index} node={node}>
                <OptimizelyGridSection nodes={step.content} row={Row} column={Column} />
                {step.buttons.length > 0 && (
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <OptimizelyGridSection nodes={step.buttons} row={Row} column={Column} />
                  </div>
                )}
              </FormStep>
            );
          })}
        </FormWrapper>
      </div>
    </FormSubmissionProvider>
  );
}

function Row({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 last:mb-0" {...pa(node)}>
      {children}
    </div>
  );
}

function Column({ children, node }: StructureContainerProps) {
  const { pa } = getPreviewUtils(node);
  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0" {...pa(node)}>
      {children}
    </div>
  );
}
