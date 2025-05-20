import type { Route } from '../../+types/home';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { useContentTypeStore } from '~/store/contentType';
import { withContentTypeGuard } from '~/lib/hoc/withContentTypeGuard';
import { Check, Plus } from 'lucide-react';
import { FirstStepAttributeDialog } from '~/components/dedicated/admin/content-type-builder/content-types/type/first-step-attribute-dialog';
import { useState } from 'react';

// TODO: ADD TITLES FROM EXISTING CONTENT TYPES

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

function ContentTypePage() {
  const contentType = useContentTypeStore((state) => state.newContentType);

  const isAttributeDialogOpen = useContentTypeStore(
    (state) => state.isAttributeDialogOpen
  );

  const openAttributeDialog = useContentTypeStore(
    (state) => state.openAttributeDialog
  );

  const closeAttributeDialog = useContentTypeStore(
    (state) => state.closeAttributeDialog
  );

  const [isSecondStep, setIsSecondStep] = useState(false);

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
        <div className="ml-auto flex items-center gap-2">
          <Button
            className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)] gap-1"
            variant="outline"
            onClick={() => {
              openAttributeDialog();
            }}
          >
            <Plus /> Add another field
          </Button>
          <Button
            className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)] gap-1"
            variant="outline"
            // onClick={() => {
            //   openSecondDialog();
            // }}
          >
            <Check /> Save
          </Button>
        </div>
      </div>
      <div className="flex flex-col border-1 p-14 w-full"></div>

      <Dialog
        open={isAttributeDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeAttributeDialog();
            // Checked the onCloseComplete attribute and it doesn't exist
            setTimeout(() => {
              setIsSecondStep(false);
            }, 300);
          }
        }}
      >
        <DialogContent className="sm:max-w-md md:max-w-220 gap-6">
          {isSecondStep ? (
            'THE SECOND STEP'
          ) : (
            <FirstStepAttributeDialog
              title={contentType?.name}
              setIsSecondStep={setIsSecondStep}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withContentTypeGuard(ContentTypePage);
