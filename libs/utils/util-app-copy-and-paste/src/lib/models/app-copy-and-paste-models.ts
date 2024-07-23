export type ICopyAndPaste = 'copy' | 'cut';

export interface ICopyAndPasteEvent {
  data?: number;
  event: ICopyAndPaste;
}
