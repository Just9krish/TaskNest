import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface Props {
  open: boolean;
  handleClick: () => void;
}

export default function CreateCollectionSheet({ handleClick, open }: Props) {
  return (
    <Sheet open={open} onOpenChange={handleClick}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new collection</SheetTitle>
          <SheetDescription>
            Collection are a way to group you tasks
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
