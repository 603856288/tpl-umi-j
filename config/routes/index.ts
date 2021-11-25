export default [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/home',
        name: 'home',
        component: './home',
      },
      {
        component: './error/404',
      },
    ],
  },
];
