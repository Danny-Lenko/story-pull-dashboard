import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

import { fieldTypes } from '~/lib/const/content-type-builder';

export const FirstStepAttributeDialog = ({
  title,
  setIsSecondStep,
}: {
  title?: string;
  setIsSecondStep: (value: boolean) => void;
}) => {
  return (
    <>
      <DialogHeader className="border-b pb-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Select a field for your collection type
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4">
        {fieldTypes.map((fieldType) => {
          const Icon = fieldType.icon;
          return (
            <Button
              key={fieldType.name}
              variant="outline"
              className="flex min-h-min justify-start gap-4 !pl-7"
              onClick={() => setIsSecondStep(true)}
            >
              {Icon && <Icon className="size-7" />}
              <div className="text-start">
                <h4 className="font-semibold">{fieldType.name}</h4>
                <p className="text-xs text-gray-500">{fieldType.description}</p>
              </div>
            </Button>
          );
        })}
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
