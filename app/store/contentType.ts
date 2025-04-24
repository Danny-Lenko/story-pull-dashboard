import { create } from 'zustand';

interface ContentType {
  name: string;
  url: string;
}

interface ContentTypeStore {
  newContentType: ContentType | null;
  isSecondDialogOpen: boolean;

  resetNewContentType: () => void;
  defineNewContentType: (payload: ContentType) => void;

  openSecondDialog: () => void;
  closeSecondDialog: () => void;
}

export const useContentTypeStore = create<ContentTypeStore>()((set) => ({
  newContentType: null,
  isSecondDialogOpen: false,

  resetNewContentType: () => set({ newContentType: null }),
  defineNewContentType: (payload: ContentType) =>
    set(() => ({
      newContentType: {
        name: payload.name,
        url: `/content-types/api::${payload.url}.${payload.url}`,
      },
    })),

  openSecondDialog: () => set({ isSecondDialogOpen: true }),
  closeSecondDialog: () => set({ isSecondDialogOpen: false }),
}));
