export interface IFolder {
  title: string;
  children?: IFolder[];
  id: number;
}

export interface IFolderData {
  folderId: number;
}
