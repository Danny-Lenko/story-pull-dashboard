import { DialogDescription } from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { ALargeSmall, ToggleRight, FileDigit, Calendar } from 'lucide-react';

const fieldTypes = [
  {
    name: 'Text',
    description: 'Small or long text like title or description',
    icon: <ALargeSmall />,
  },
  {
    name: 'Boolean',
    description: 'True or false',
    icon: <ToggleRight />,
  },
  {
    name: 'Number',
    description: 'Integer, float or decimal number',
    icon: <FileDigit />,
  },
  {
    name: 'Date',
    description: 'A date picker with hours, minutes and seconds',
    icon: <Calendar />,
  },
  {
    name: 'Email',
    description: 'Email field with validations format',
    icon: '',
  },
  {
    name: 'UID',
    description: 'Unique identifier',
    icon: '',
  },
  {
    name: 'Rich text (Markdown)',
    description: 'The classic rich text editor',
    icon: '',
  },
  {
    name: 'JSON',
    description: 'Data in JSON format',
    icon: '',
  },
];

export const SecondDialogContent = () => {
  return (
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
  );
};
