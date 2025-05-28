import type { Route } from '../../+types/home';
import { Dialog, DialogContent } from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { useContentTypeStore } from '~/store/contentType';
import { withContentTypeGuard } from '~/lib/hoc/withContentTypeGuard';
import { Check, Plus } from 'lucide-react';
import { FirstStepAttributeDialog } from '~/components/dedicated/admin/content-type-builder/content-types/type/first-step-attribute-dialog';
import { useState } from 'react';
import { SecondStepAttributeDialog } from '~/components/dedicated/admin/content-type-builder/content-types/type/second-step-attribute-dialog';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { FolderOpen } from 'lucide-react';

// TODO: ADD TITLES FROM EXISTING CONTENT TYPES

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

function ContentTypePage() {
  const contentType = useContentTypeStore((state) => state.newContentType);

  console.log('ATTRIBUTES:', contentType?.attributes);

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
  const [fieldName, setFieldName] = useState('');

  return (
    <>
      <div className="flex items-center px-14 py-12 w-full">
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
            className="cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)] gap-1"
            variant="outline"
            onClick={() => {
              openAttributeDialog();
            }}
          >
            <Plus /> Add another field
          </Button>
          <Button
            disabled={!contentType?.attributes}
            className="cursor-pointer gap-1"
            variant="secondary"
          >
            <Check /> Save
          </Button>
        </div>
      </div>

      <div className="flex flex-col p-14 w-full">
        <div className="bg-sidebar rounded-sm py-3 px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            {contentType?.attributes ? (
              <TableBody>
                <TableRow>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    className="text-center text-muted-foreground"
                    colSpan={3}
                  >
                    <FolderOpen size="120" className="mx-auto" />
                    No attributes added yet. Click on "Add another field" to
                    start.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </div>
      </div>

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
          {isSecondStep && contentType ? (
            <SecondStepAttributeDialog
              title={contentType.name}
              fieldName={fieldName}
              setIsSecondStep={setIsSecondStep}
            />
          ) : (
            <FirstStepAttributeDialog
              title={contentType?.name}
              setIsSecondStep={setIsSecondStep}
              setFieldName={setFieldName}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withContentTypeGuard(ContentTypePage);
