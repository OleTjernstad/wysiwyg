export interface QuillFuncs {
  quill: {
    getSelection(focus: true): { index: number; length: number };
    getSelection(focus?: false): { index: number; length: number } | null;
    insertText(
      index: number,
      text: string,
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    insertText(
      index: number,
      text: string,
      format: string,
      value: unknown,
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    insertText(
      index: number,
      text: string,
      formats: { [key: string]: unknown },
      source?: 'api' | 'user' | 'silent'
    ): unknown;
    setSelection(
      index: number,
      length?: number,
      source?: 'api' | 'user' | 'silent'
    ): void;
  };
}
