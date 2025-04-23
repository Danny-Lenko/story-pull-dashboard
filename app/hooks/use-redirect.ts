import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useContentTypeStore } from '~/store/contentType';

export function useRedirect() {
  const navigate = useNavigate();

  const contentType = useContentTypeStore((state) => state.contentType);

  console.log('CONTENT TYPE: ', contentType);

  useEffect(() => {
    if (contentType?.url) {
      navigate('/admin/content-type-builder' + contentType.url);
      return;
    }

    //  if (mockSidebarItems.collection.length > 0) {
    //    navigate(
    //      '/admin/content-type-builder' + mockSidebarItems.collection[0].url
    //    );
    //    return;
    //  }
    //  if (mockSidebarItems.single.length > 0) {
    //    navigate('/admin/content-type-builder' + mockSidebarItems.single[0].url);
    //    return;
    //  }
  }, [contentType?.url]);

  return null;
}
