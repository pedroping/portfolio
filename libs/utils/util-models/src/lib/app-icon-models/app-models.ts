export type IFoldersType = 'file' | 'folder';
export interface IBasicApp {
  name: string;
  logo: string;
  type: IFoldersType;
  parentFolderId: number;
  isFolderId?: number;
  hasPageId?: number;
}
export interface IDropEvent {
  parentTargetId?: string;
  id: number;
}

export type IApp = IBasicApp & IDropEvent;
