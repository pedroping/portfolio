import {
  IInitialConfig
} from '../page-creator-models/element-models';

export type IFoldersType = 'file' | 'folder';
export interface IBasicApp {
  name: string;
  logo: string;
  type: IFoldersType;
  parentFolderId: number;
  isFolderId?: number;
  initialPageConfig?: IInitialConfig;
  pageConfigId?: number;
}
export interface IDropEvent {
  parentTargetId?: string;
  id: number;
}

export type IApp = IBasicApp & IDropEvent;
