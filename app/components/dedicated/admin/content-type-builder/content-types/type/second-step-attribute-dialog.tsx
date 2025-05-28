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
import { Input } from '~/components/ui/input';

import { set, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { useContentTypeStore } from '~/store/contentType';

// TODO: right now, the field name is not unique, so you override value each time.
// This should be fixed in the future, so that each field name is unique within a content type.
// This is done by adding a validation-like message 'This value is already used'

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Field name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Field name must be at most 30 characters.',
    })
    .regex(/^[a-z-]+$/, {
      message: 'Сan only contain lowercase letters and hyphens.',
    }),
});

export const SecondStepAttributeDialog = ({
  title,
  fieldName,
  setIsSecondStep,
}: {
  title: string;
  fieldName: string;
  setIsSecondStep: (value: boolean) => void;
}) => {
  const fieldType = fieldTypes.find((field) => field.name === fieldName);
  const Icon = fieldType?.icon;

  const newContentType = useContentTypeStore((state) => state.newContentType);
  const addContentTypeAttribute = useContentTypeStore(
    (state) => state.addContentTypeAttribute
  );

  const closeAttributeDialog = useContentTypeStore(
    (state) => state.closeAttributeDialog
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(
    values: z.infer<typeof formSchema>,
    event: React.FormEvent<HTMLFormElement>
  ) {
    // console.log('Form submitted with values:', values);
    const submitEvent = event.nativeEvent as SubmitEvent;
    const submitValue =
      submitEvent?.submitter &&
      (submitEvent.submitter as HTMLButtonElement).value;

    console.log('VALUES:', values);
    console.log('SUBMIT VALUE:', submitValue);
    console.log('TITLE:', title);
    console.log('FIELED NAME:', fieldName);

    if (submitValue === 'add-another') {
      addContentTypeAttribute({
        name: values.name,
        type: fieldName,
      });

      setIsSecondStep(false);
    }

    if (submitValue === 'finish') {
      addContentTypeAttribute({
        name: values.name,
        type: fieldName,
      });

      closeAttributeDialog();
    }

    form.reset();
  }

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

      <Form {...form}>
        <form
          onSubmit={(e) => form.handleSubmit((v) => onSubmit(v, e))(e)}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 w-full gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    No space is allowed for the name of the attribute
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="ml-auto hover:no-underline text-[var(--link)] hover:text-[var(--link-hover)] gap-1"
              variant="outline"
              value="add-another"
            >
              + Add another field
            </Button>
            <Button type="submit" value="finish">
              Finish
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
