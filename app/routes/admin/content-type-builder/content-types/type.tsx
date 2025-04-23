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

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

// HERE SHOULD BE REDIRECT TO /content-types/api::...

export default function ContentTypeBuilder() {
  const { contentType } = useParams<{ contentType: string }>();

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
      <h1>Content Type Builder / Content Type / :Type</h1>
      <Button
        className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)]"
        variant="link"
        onClick={() => {
          openSecondDialog();
        }}
      >
        ANOTHER TRIGGER
      </Button>
      <Dialog
        open={isSecondDialogOpen}
        onOpenChange={(open) => {
          if (!open) closeSecondDialog();
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)]"
            variant="link"
          >
            + Add another field
          </Button>
        </DialogTrigger>
        {/* <DialogOverlay onClick={() => console.log('Overlay Clicked!')} /> */}
        <DialogContent className="sm:max-w-md gap-6">
          <DialogHeader className="border-b pb-6">
            <DialogTitle>DIALOG</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 items-center space-x-2">
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="name">Display name</Label>
              {/* <Input id="name" onChange={handleInputChange} value={userInput} /> */}
            </div>
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="singular">API ID (Singular)</Label>
              {/* <Input id="singular" readOnly value={singularSlug} disabled /> */}
              <span className="text-xs text-muted-foreground">
                The UID is used to generate the API routes and databases
                tables/collections
              </span>
            </div>
            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="plural">API ID (Plural)</Label>
              {/* <Input id="plural" readOnly value={pluralSlug} disabled /> */}
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            {/* <DialogClose asChild>
              <Button
                className="ml-auto flex gap-2 items-center"
                disabled={!userInput}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </DialogClose> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
