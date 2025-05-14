import React from 'react';
import { Navigate } from 'react-router';
import { useContentTypeStore } from '~/store/contentType';

// HOC for protecting pages that require contentType
export const withContentTypeGuard = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    const contentType = useContentTypeStore((state) => state.newContentType);

    if (!contentType?.name) {
      return <Navigate to="/admin/content-type-builder" replace />;
    }

    return <Component {...props} />;
  };
};
