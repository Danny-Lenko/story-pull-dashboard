import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layout/admin-layout.tsx', [
    // index('./routes/admin/home.tsx'),
    route('/admin/', './routes/admin/home.tsx'),
    route(
      '/admin/content-type-builder',
      './routes/admin/content-type-builder.tsx'
    ),
  ]),
  route('/login/', './routes/login/login.tsx'),
] satisfies RouteConfig;
