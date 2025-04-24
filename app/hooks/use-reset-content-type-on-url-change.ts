import { useEffect } from 'react';
import { useLocation, useBlocker, useBeforeUnload } from 'react-router';
import { useContentTypeStore } from '~/store/contentType';

export const useResetContentTypeOnUrlChange = () => {
  const location = useLocation();
  const newContentType = useContentTypeStore((state) => state.newContentType);
  const resetContentType = useContentTypeStore(
    (state) => state.resetNewContentType
  );

  const pathnameParts = location.pathname.split('/');
  const contentTypePath = '/' + pathnameParts[3] + '/' + pathnameParts[4];

  useEffect(() => {
    if (newContentType?.url !== contentTypePath) {
      resetContentType();
    }
  }, [location.pathname, resetContentType]);
};
