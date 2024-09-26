export type TAvalilableOptions =
  | 'refresh-icons'
  | 'personalize'
  | 'paste'
  | 'view-big-icons'
  | 'view-medium-icons'
  | 'view-small-icons'
  | 'short-by-name'
  | 'short-by-size'
  | 'new-folder'
  | 'new-text-document'
  | 'program-open'
  | 'program-explore'
  | 'program-copy'
  | 'program-cut'
  | 'program-delete'
  | 'program-rename';

export interface IOptionEvent<T> {
  option: TAvalilableOptions;
  parentId: string | number;
  data?: T;
}
