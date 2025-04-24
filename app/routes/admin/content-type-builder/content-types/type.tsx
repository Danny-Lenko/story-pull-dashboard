import { useParams } from 'react-router';
import type { Route } from '../../+types/home';
import { Welcome } from '../../../../welcome/welcome';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { useContentTypeStore } from '~/store/contentType';
import { SecondDialogContent } from '~/components/dedicated/admin/content-type-builder/content-types/type/second-dialog-content';
import { useResetContentTypeOnUrlChange } from '~/hooks/use-reset-content-type-on-url-change';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

// TODO: REDIRECT ON PAGE REFRESH, because state gets reset and the route does not

export default function ContentTypeBuilder() {
  // const { contentType } = useParams<{ contentType: string }>();

  // console.log('CONTENT TYPE: ', contentType);

  useResetContentTypeOnUrlChange();

  const contentType = useContentTypeStore((state) => state.newContentType);

  const isSecondDialogOpen = useContentTypeStore(
    (state) => state.isSecondDialogOpen
  );

  const openSecondDialog = useContentTypeStore(
    (state) => state.openSecondDialog
  );

  const closeSecondDialog = useContentTypeStore(
    (state) => state.closeSecondDialog
  );

  return (
    <>
      <div className="flex items-center px-14 py-12 border-1 w-full">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight ">
            {contentType?.name || 'Content Type Builder'}
          </h1>
          <p className="text-muted-foreground">
            Build the data architecture of your content
          </p>
        </div>
        <Button
          className="ml-auto hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)]"
          variant="outline"
          onClick={() => {
            openSecondDialog();
          }}
        >
          + Add another field
        </Button>
      </div>
      <div className="flex flex-col border-1 p-14 w-full"></div>

      <Dialog
        open={isSecondDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeSecondDialog();
        }}
      >
        <DialogContent className="sm:max-w-md gap-6">
          <DialogHeader className="border-b pb-6">
            <DialogTitle>DIALOG</DialogTitle>
          </DialogHeader>
          <SecondDialogContent />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
