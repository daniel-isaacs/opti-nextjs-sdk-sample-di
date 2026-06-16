type EditableContent = {
  __composition?: {
    key?: string;
    __context?: { edit?: boolean };
  };
};

export function blockId(content: EditableContent): string | undefined {
  return content.__composition?.__context?.edit === true
    ? content.__composition.key
    : undefined;
}
