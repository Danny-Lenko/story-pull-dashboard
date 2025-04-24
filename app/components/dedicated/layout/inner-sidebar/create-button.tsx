import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
import { useNavigate } from 'react-router';
import { generateSlug } from '~/lib/utils/generate-slug';
import { pluralize } from '~/lib/utils/pluralize';
import { capitalizeWords } from '~/lib/utils/capitalize';

export function CreateButton({ title }: { title: string }) {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState('');
  const [singularSlug, setSingularSlug] = useState('');
  const [pluralSlug, setPluralSlug] = useState('');

  const defineContentType = useContentTypeStore(
    (state) => state.defineNewContentType
  );

  const openSecondDialog = useContentTypeStore(
    (state) => state.openSecondDialog
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setUserInput(event.target.value);
    const capitalizedValue = capitalizeWords(event.target.value);
    setUserInput(capitalizedValue);
  };

  const handleContinue = () => {
    openSecondDialog();
    setUserInput('');
    defineContentType({
      name: userInput,
      url: singularSlug,
    });
    navigate(
      `admin/content-type-builder/content-types/api::${singularSlug}.${singularSlug}`
    );
  };

  useEffect(() => {
    const slug = generateSlug(userInput);
    setSingularSlug(slug);
    setPluralSlug(pluralize(slug));
  }, [userInput]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setUserInput('');
      }}
    >
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
        <div className="flex flex-col gap-5 items-center space-x-2">
          <div className="grid flex-1 gap-2 w-full">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" onChange={handleInputChange} value={userInput} />
          </div>
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
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="ml-auto flex gap-2 items-center"
              disabled={!userInput}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
