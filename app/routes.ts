import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layout/layout.tsx', [
    index('./routes/home.tsx'),
    route('test', './routes/test.tsx'),
  ]),
] satisfies RouteConfig;
