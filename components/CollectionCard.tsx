"use client";

import { Collection, Task } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constant";
import { CaretDownIcon, CaretUpIcon, TrashIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import PlusIcon from "./icons/PlusIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteCollection } from "@/action/collection.action";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import CreateTaskDialog from "./CreateTaskDialog";

interface Props {
  collection: Collection;
  tasks: Task[];
}

export default function CollectionCard({ collection, tasks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  console.log(tasks);

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);

      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Cannot delete collection",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <>
      <CreateTaskDialog
        showCreateModal={showCreateModal}
        setShowCreateModal={setShowCreateModal}
        collection={collection}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-between p-6",
              isOpen && "rounded-b-none",
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen ? (
              <CaretDownIcon className="h-6 w-6" />
            ) : (
              <CaretUpIcon className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col shadow-lg dark:bg-neutral-900">
          {/* {task.length === 0 ? "No task" : task.length} tasks */}

          {tasks.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex justify-center items-center gap-1 p-8 py-12"
              onClick={() => setShowCreateModal(true)}
            >
              <p>
                There are no taks yet:{" "}
                <span
                  className={cn(
                    "text-sm bg-clip-text text-transparent",
                    CollectionColors[collection.color as CollectionColor]
                  )}
                >
                  Create one
                </span>
              </p>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={45} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <div key={task.id} className="text-neutral-500">
                    {task.content}
                  </div>
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-10 p-[2px] px-4 text-neutral-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toLocaleString("en-us")}</p>
            {isLoading ? (
              <p>"Deleting..."</p>
            ) : (
              <div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => startTransition(removeCollection)}
                        disabled={isLoading}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
