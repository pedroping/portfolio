export interface IApp {
  name: string;
  logo: string;
}
export interface IDropEvent {
  parentTargetId: string;
  id: number | string;
}

export type ITransferData = IApp & IDropEvent;
