import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layout/admin-layout.tsx', [
    route('/admin/', './routes/admin/home.tsx'),
    route(
      '/admin/content-type-builder',
      './routes/admin/content-type-builder/index.tsx'
    ),
    route(
      '/admin/content-type-builder/content-types',
      './routes/admin/content-type-builder/content-types/index.tsx'
    ),
    route(
      '/admin/content-type-builder/content-types/:contentType',
      './routes/admin/content-type-builder/content-types/type.tsx'
    ),
  ]),
  route('/login/', './routes/login/login.tsx'),
] satisfies RouteConfig;
