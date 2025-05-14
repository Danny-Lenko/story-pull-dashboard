import { useNavigate } from 'react-router';
import type { Route } from '../+types/home';
import { Welcome } from '../../../welcome/welcome';
import { useEffect } from 'react';
import { useContentTypeStore } from '~/store/contentType';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

// const mockSidebarItems: {
//   collection: { title: string; url: string }[];
//   single: { title: string; url: string }[];
// } = {
//   collection: [
//     {
//       title: 'Article',
//       url: '/content-types/api::article.article',
//     },
//     {
//       title: 'Author',
//       url: '/content-types/api::author.author',
//     },
//   ],
//   single: [],
// };

const mockSidebarItems: {
  collection: { title: string; url: string }[];
  single: { title: string; url: string }[];
} = {
  collection: [],
  single: [],
};

// TODO: SET IT UP WITH API DATA

export default function ContentTypeBuilder() {
  const contentType = useContentTypeStore((state) => state.newContentType);

  console.log('INDEX CONTENT TYPE:', contentType);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (mockSidebarItems.collection.length > 0) {
  //     navigate(
  //       '/admin/content-type-builder' + mockSidebarItems.collection[0].url
  //     );
  //     return;
  //   }

  //   if (mockSidebarItems.single.length > 0) {
  //     navigate('/admin/content-type-builder' + mockSidebarItems.single[0].url);
  //     return;
  //   }
  // }, [navigate]);

  return (
    <>
      <h1>NO CONTENT TYPES YET</h1>
      {/* <Welcome /> */}
    </>
  );
}
