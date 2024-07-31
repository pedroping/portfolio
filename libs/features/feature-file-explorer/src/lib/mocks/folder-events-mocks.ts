import { TAvalilableOptions } from '@portifolio/utils/util-models';

export const VIEW_FOLDER_EVENTS: TAvalilableOptions[] = [
  'view-big-icons',
  'view-medium-icons',
  'view-small-icons',
];

export const SHORT_FOLDER_EVENTS: TAvalilableOptions[] = [
  'short-by-name',
  'short-by-size',
];

export const VIEW_CLASS: { [key: string]: string } = {
  'view-big-icons': 'big-icon',
  'view-medium-icons': 'medium-icon',
  'view-small-icons': 'small-icon',
};
