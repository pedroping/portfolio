import { InjectionToken } from '@angular/core';
import { IPageConfig } from './elements-interfaces';

export const DATA_TOKEN = new InjectionToken<any>('DATA_TOKEN');
export const CONFIG_TOKEN = new InjectionToken<IPageConfig>('CONFIG_TOKEN');
