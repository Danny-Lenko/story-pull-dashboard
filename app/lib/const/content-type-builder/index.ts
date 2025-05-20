import {
  ALargeSmall,
  ToggleRight,
  FileDigit,
  Calendar,
  Mail,
  FileJson,
  LayoutList,
  KeyRound,
} from 'lucide-react';

export const fieldTypes = [
  {
    name: 'Text',
    description: 'Small or long text like title or description',
    icon: ALargeSmall,
  },
  {
    name: 'Boolean',
    description: 'True or false',
    icon: ToggleRight,
  },
  {
    name: 'Number',
    description: 'Integer, float or decimal number',
    icon: FileDigit,
  },
  {
    name: 'Date',
    description: 'A date picker with hours, minutes and seconds',
    icon: Calendar,
  },
  {
    name: 'Email',
    description: 'Email field with validations format',
    icon: Mail,
  },
  {
    name: 'UID',
    description: 'Unique identifier',
    icon: KeyRound,
  },
  {
    name: 'Rich text (Markdown)',
    description: 'The classic rich text editor',
    icon: LayoutList,
  },
  {
    name: 'JSON',
    description: 'Data in JSON format',
    icon: FileJson,
  },
];
