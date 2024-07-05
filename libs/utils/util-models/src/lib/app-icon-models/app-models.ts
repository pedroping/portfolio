export interface IApp {
  name: string;
  logo: string;
}

export interface ITransferData<T> extends IApp {
  parentTargetId: string;
  data: T;
}
