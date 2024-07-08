export interface IFolder {
  id: number;
  title: string;
  children?: IFolder[];
}

export interface IFolderData {
  folderId: number;
}
