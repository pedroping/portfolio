import { IInitialConfig } from '../page-creator-models/element-models';

export type IFoldersType = 'file' | 'folder';
export interface IApp {
  id: number;
  name: string;
  logo: string;
  type: IFoldersType;
  parentFolderId: number;
  isFolderId?: number;
  initialPageConfig?: IInitialConfig;
  pageConfigId?: number;
}

export type TBasicApp = Omit<IApp, 'id'>;
