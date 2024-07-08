export type IFoldersType = 'file' | 'folder';
export interface IBasicApp {
  name: string;
  logo: string;
  type: IFoldersType;
  folderId: number;
  isFolderId?: number;
}
export interface IDropEvent {
  parentTargetId?: string;
  id: number;
}

export type IApp = IBasicApp & IDropEvent;
