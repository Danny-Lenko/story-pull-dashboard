import { Label } from "~/components/ui/label";

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
