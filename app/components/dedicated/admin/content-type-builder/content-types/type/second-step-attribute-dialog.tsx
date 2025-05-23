import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

import { MoveLeft } from 'lucide-react';

import { fieldTypes } from '~/lib/const/content-type-builder';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

export const SecondStepAttributeDialog = ({
  title,
  fieldName,
  setIsSecondStep,
}: {
  title?: string;
  fieldName?: string;
  setIsSecondStep: (value: boolean) => void;
}) => {
  const fieldType = fieldTypes.find((field) => field.name === fieldName);
  const Icon = fieldType?.icon;

  return (
    <>
      <DialogHeader className="border-b flex flex-row items-center pb-6">
        <MoveLeft
          onClick={() => setIsSecondStep(false)}
          className="size-5 mr-4 text-[var(--link)] hover:text-[var(--link-hover)] cursor-pointer"
        />
        {Icon && <Icon className="size-6" />}
        <h3 className="font-semibold text-xl">{title}</h3>
      </DialogHeader>
      <div>
        <DialogTitle>Add new {fieldType?.name} field</DialogTitle>
        <DialogDescription>
          {fieldType?.description || 'Select a field for your collection type'}
        </DialogDescription>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
        <p></p>
      </div>

      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
