import { useCallback, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useBlocker,
  useBeforeUnload,
} from 'react-router';
import { useContentTypeStore } from '~/store/contentType';

export const useCreateContentTypes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const newContentType = useContentTypeStore((state) => state.newContentType);
  const defineContentType = useContentTypeStore(
    (state) => state.defineNewContentType
  );
  const resetContentType = useContentTypeStore(
    (state) => state.resetNewContentType
  );

  const pendingContentType = useContentTypeStore(
    (state) => state.pendingContentType
  );
  const definePendingContentType = useContentTypeStore(
    (state) => state.definePendingContentType
  );
  const resetPendingContentType = useContentTypeStore(
    (state) => state.resetPendingContentType
  );

  const ensureSameNavigationLevel = (path: string) => {
    const pattern = /content-types\/api::[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$/;

    return pattern.test(path);
  };

  /**
   * Determines whether navigation to a given path can be performed safely
   * based on the current content type's state and the provided path.
   *
   * @param nextPath - The path to navigate to.
   * @returns `true` if navigation is safe, `false` otherwise.
   *
   * The function checks if the `newContentType` has a `name` property. If it does not,
   * navigation is considered safe. Otherwise, it compares the current content type's
   * path (derived from the current location) with the `nextPath` to ensure the navigation
   * remains within the same content type context.
   *
   * Dependencies:
   * - `newContentType`: The current content type object.
   * - `location`: The current location object used to derive the current path.
   */
  const canNavigateSafely = useCallback(
    (nextPath: string) => {
      if (!newContentType?.name) return true;

      const pathnameParts = location.pathname.split('/');
      const currentContentTypePath =
        pathnameParts[3] && pathnameParts[4]
          ? `/${pathnameParts[3]}/${pathnameParts[4]}`
          : '';

      return nextPath.includes(currentContentTypePath);
    },
    [newContentType, location]
  );

  const createContentType = useCallback(
    (path: string, contentType: { name: string; url: string }) => {
      definePendingContentType(contentType);

      navigate(path);
    },
    [canNavigateSafely]
  );

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    //  if (!newContentType?.name) return false;

    if (currentLocation.pathname === nextLocation.pathname) return false;
    return !canNavigateSafely(nextLocation.pathname);
  });

  useBeforeUnload((event) => {
    if (newContentType?.name) {
      event.preventDefault();
      return 'You have unsaved changes. Do you really want to leave this page?';
    }
  });

  useEffect(() => {
    if (!pendingContentType) return;

    const { name, url } = pendingContentType;
    const newName = newContentType?.name;

    if (blocker.state === 'blocked') {
      const confirmed = window.confirm(
        'You have unsaved changes. Do you really want to leave this page?'
      );

      if (confirmed) {
        if (ensureSameNavigationLevel(blocker.location.pathname)) {
          defineContentType({ name, url });
          blocker.proceed();
        } else {
          blocker.proceed();

          const timeoutId = setTimeout(() => {
            resetPendingContentType();
            resetContentType();
          }, 1000);

          return () => clearTimeout(timeoutId);
        }
      } else {
        blocker.reset();
      }
    } else {
      // if no new content yet, define it. Return if it exists, which means the confirmation is needed
      if (newName) return;
      defineContentType({ name, url });
    }
  }, [blocker, pendingContentType]);

  return {
    createContentType,
  };
};
