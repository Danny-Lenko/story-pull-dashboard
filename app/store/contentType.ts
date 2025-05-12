import { create } from 'zustand';

export interface ContentType {
  name: string;
  url: string;
}

interface ContentTypeStore {
  isSecondDialogOpen: boolean;
  isContentTypeCreation: boolean;

  newContentType: ContentType | null;
  pendingContentType: ContentType | null;

  openSecondDialog: () => void;
  closeSecondDialog: () => void;

  startContentTypeCreation: () => void;
  stopContentTypeCreation: () => void;

  resetNewContentType: () => void;
  defineNewContentType: (payload: ContentType) => void;

  resetPendingContentType: () => void;
  definePendingContentType: (payload: ContentType) => void;
}

export const useContentTypeStore = create<ContentTypeStore>()((set) => ({
  isSecondDialogOpen: false,
  isContentTypeCreation: false,

  newContentType: null,
  pendingContentType: null,

  openSecondDialog: () => set({ isSecondDialogOpen: true }),
  closeSecondDialog: () => set({ isSecondDialogOpen: false }),

  startContentTypeCreation: () => set({ isContentTypeCreation: true }),
  stopContentTypeCreation: () => set({ isContentTypeCreation: false }),

  resetNewContentType: () => set({ newContentType: null }),
  defineNewContentType: (payload: ContentType) =>
    set(() => ({
      newContentType: {
        name: payload.name,
        url: `/content-types/api::${payload.url}.${payload.url}`,
      },
    })),

  resetPendingContentType: () => set({ pendingContentType: null }),
  definePendingContentType: (payload: ContentType) =>
    set(() => ({
      pendingContentType: {
        name: payload.name,
        url: `/content-types/api::${payload.url}.${payload.url}`,
      },
    })),
}));
