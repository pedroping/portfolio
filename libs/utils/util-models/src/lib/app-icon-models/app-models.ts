export interface IApp {
  name: string;
  logo: string;
}

export interface ITransferData extends IApp {
  parentTargetId: string;
}
