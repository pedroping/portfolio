export interface IBasicApp {
  name: string;
  logo: string;
}
export interface IDropEvent {
  parentTargetId: string;
  id: number | string;
}

export type IApp = IBasicApp & IDropEvent;
