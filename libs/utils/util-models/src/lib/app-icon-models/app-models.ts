export type IFoldersType = 'file' | 'folder';
export interface IBasicApp {
  name: string;
  logo: string;
  type: IFoldersType;
  folderId: number;
}
export interface IDropEvent {
  parentTargetId?: string;
  id: number | string;
}

export type IApp = IBasicApp & IDropEvent;
