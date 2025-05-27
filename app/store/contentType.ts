import { create } from 'zustand';

export interface ContentType {
  name: string;
  url: string;
  attributes?: {
    [key: string]: any;
  };
  collectionName?: string;
}

interface ContentTypeStore {
  isAttributeDialogOpen: boolean;
  isContentTypeCreation: boolean;

  newContentType: ContentType | null;
  pendingContentType: ContentType | null;

  openAttributeDialog: () => void;
  closeAttributeDialog: () => void;

  startContentTypeCreation: () => void;
  stopContentTypeCreation: () => void;

  resetNewContentType: () => void;
  defineNewContentType: (payload: ContentType) => void;
  addContentTypeAttribute: (attribute: { name: string; type: string }) => void;

  resetPendingContentType: () => void;
  definePendingContentType: (payload: ContentType) => void;
}

export const useContentTypeStore = create<ContentTypeStore>()((set) => ({
  isAttributeDialogOpen: false,
  isContentTypeCreation: false,

  newContentType: null,
  pendingContentType: null,

  openAttributeDialog: () => set({ isAttributeDialogOpen: true }),
  closeAttributeDialog: () => set({ isAttributeDialogOpen: false }),

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
  addContentTypeAttribute: (attribute: { name: string; type: string }) =>
    set((state) => {
      if (!state.newContentType) return {};
      return {
        newContentType: {
          ...state.newContentType,
          name: state.newContentType.name,
          url: state.newContentType.url,
          collectionName: state.newContentType.collectionName,
          attributes: {
            ...state.newContentType.attributes,
            [attribute.name]: attribute.type,
          },
        },
      };
    }),

  resetPendingContentType: () => set({ pendingContentType: null }),
  definePendingContentType: (payload: ContentType) =>
    set(() => ({
      pendingContentType: {
        name: payload.name,
        url: `/content-types/api::${payload.url}.${payload.url}`,
      },
    })),
}));
