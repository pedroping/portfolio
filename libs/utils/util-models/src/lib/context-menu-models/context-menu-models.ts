export type TAvalilableOptions =
  | 'refresh-icons'
  | 'personalize'
  | 'paste'
  | 'view-big-icons'
  | 'view-medium-icons'
  | 'view-small-icons'
  | 'view-by-thumbnails'
  | 'view-by-tiles'
  | 'view-by-list'
  | 'view-by-details'
  | 'short-by-name'
  | 'short-by-size'
  | 'short-by-modification Date'
  | 'new-folder'
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
