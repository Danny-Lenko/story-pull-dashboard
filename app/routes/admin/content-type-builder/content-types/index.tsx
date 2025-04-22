import type { Route } from '../../+types/home';
import { Welcome } from '../../../../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

// HERE SHOULD BE REDIRECT TO /content-types/api::...

export default function ContentTypeBuilder() {
  return (
    <>
      <h1>Content Type Builder / Content Type</h1>
      <Welcome />
    </>
  );
}
