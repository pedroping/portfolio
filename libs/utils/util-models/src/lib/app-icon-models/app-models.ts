export type IFoldersType = 'file' | 'folder';
export interface IBasicApp {
  name: string;
  logo: string;
  type: IFoldersType;
}
export interface IDropEvent {
  parentTargetId: string;
  id: number | string;
}

export type IApp = IBasicApp & IDropEvent;
