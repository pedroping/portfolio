import { IBasicApp, IInitialConfig } from '@portifolio/utils/util-models';

export const CURRICULUM_FOLDER: IInitialConfig = {
  name: 'Curriculum',
  sub: 'My Curriculum',
  baseSizes: {
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
    minWidth: 850,
    minHeight: window.innerHeight * 0.5,
  },
  customX: 50,
  customY: 50,
  pageContent: import('@portifolio/ui/ui-curriculum-page').then(
    (c) => c.CurriculumPageComponent,
  ),
  icon: '/assets/images/pdf-icon.png',
  opened: true,
};

export const BASIC_FOLDER: IBasicApp[] = [
  {
    name: 'Curriculum',
    logo: '/assets/images/pdf-icon.png',
    type: 'file',
    parentFolderId: 0,
    initialPageConfig: CURRICULUM_FOLDER,
  },
];
