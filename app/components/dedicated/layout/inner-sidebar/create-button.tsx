import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useContentTypeStore } from '~/store/contentType';
import { generateSlug } from '~/lib/utils/generate-slug';
import { pluralize } from '~/lib/utils/pluralize';
import { capitalizeWords } from '~/lib/utils/capitalize';

import { useCreateContentTypes } from '~/hooks/use-create-content-type';

import { z } from 'zod';
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Display name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Display name must be at most 30 characters.',
    })
    .regex(/^(?!.* {2})[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/, {
      message:
        'Display name can only contain letters, numbers, and single spaces between words.',
    }),
});

export function CreateButton({ title }: { title: string }) {
  const { createContentType } = useCreateContentTypes();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [singularSlug, setSingularSlug] = useState('');
  const [pluralSlug, setPluralSlug] = useState('');

  const openAttributeDialog = useContentTypeStore(
    (state) => state.openAttributeDialog
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    openAttributeDialog();

    createContentType(
      `admin/content-type-builder/content-types/api::${singularSlug}.${singularSlug}`,
      {
        name: values.name,
        url: singularSlug,
      }
    );

    setIsDialogOpen(false);

    form.reset();
  }

  const nameValue = form.watch('name');

  useEffect(() => {
    const slug = generateSlug(nameValue);
    setSingularSlug(slug);
    setPluralSlug(pluralize(slug));
  }, [nameValue]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="hover:no-underline cursor-pointer text-[var(--link)] hover:text-[var(--link-hover)]"
          variant="link"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md gap-6">
        <DialogHeader className="border-b pb-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {/* This is the public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="singular">API ID (Singular)</Label>
              <Input id="singular" readOnly value={singularSlug} disabled />
              <span className="text-xs text-muted-foreground">
                The UID is used to generate the API routes and databases
                tables/collections
              </span>
            </div>

            <div className="grid flex-1 gap-2 w-full">
              <Label htmlFor="plural">API ID (Plural)</Label>
              <Input id="plural" readOnly value={pluralSlug} disabled />
            </div>

            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
              <Button type="submit" className="ml-auto flex gap-2 items-center">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
