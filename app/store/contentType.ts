import { create } from 'zustand';

interface ContentType {
  name: string;
  url: string;
}

interface ContentTypeStore {
  contentType: ContentType | null;
  isSecondDialogOpen: boolean;
  defineContentType: (payload: ContentType) => void;
  openSecondDialog: () => void;
  closeSecondDialog: () => void;
}

export const useContentTypeStore = create<ContentTypeStore>()((set) => ({
  contentType: null,
  isSecondDialogOpen: false,
  defineContentType: (payload: ContentType) =>
    set(() => ({
      contentType: {
        name: payload.name,
        url: `/content-types/api::${payload.url}.${payload.url}`,
      },
    })),
  openSecondDialog: () => set({ isSecondDialogOpen: true }),
  closeSecondDialog: () => set({ isSecondDialogOpen: false }),
}));
