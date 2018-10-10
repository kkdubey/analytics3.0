import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/dashboard',
  },
  {
    title: 'User',
    icon: 'nb-keypad',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Overview',
        link: '/pages/ui-features/buttons',
      },
      {
        title: 'Active User',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Lifetime Value',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Device',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Geo',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Drop-offs',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Predictions',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Profile Explorer',
        link: '/pages/ui-features/tabs',
      },
    ],
  },
  {
    title: 'Revenue',
    icon: 'nb-compose',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
    ],
  },
  {
    title: 'CRM',
    icon: 'nb-gear',
    children: [
      {
        title: 'Tree',
        link: '/pages/components/tree',
      }, {
        title: 'Notifications',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Campaigns',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'nb-shuffle',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
