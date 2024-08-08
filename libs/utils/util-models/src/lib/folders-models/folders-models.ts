export interface IFolder {
  id: number;
  title: string;
  logo: string;
  children?: IFolder[];
}

export interface IFolderData {
  folderId: number;
}

export const INITIAL_FOLDER_ADRESS = 'C:/Desktop';

export const EXPLITED_ADRESS_01 = 'C:';
export const EXPLITED_ADRESS_02 = 'Desktop';
