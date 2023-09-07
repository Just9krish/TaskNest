"client component";

import { Task } from "@prisma/client";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { setTaskComplete } from "@/action/task.actions";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  task: Task;
}

function getEpirationColor(expiresAt: Date) {
  const days = Math.floor(expiresAt.getTime() - Date.now()) / 1000 / 60 / 60;

  if (days < 0) {
    return "text-gray-500 dark:text-gray-400";
  }

  if (days <= 3 * 24) {
    return "text-red-500 dark:text-red-400";
  }
  if (days <= 7 * 24) {
    return "text-orange-500 dark:text-orange-400";
  }

  return "text-green-500 dark:text-green-400";
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex gap-2 items-start">
      <Checkbox
        id={task.id.toString()}
        className="h-5 w-5"
        checked={task.isDone}
        disabled={task.isDone || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskComplete(task.id);
            router.refresh();
          });
        }}
      />

      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.isDone && "line-through"
        )}
        title={task.content}
      >
        {task.content}

        {task.expiresAt && (
          <p
            className={cn(
              "text-sm text-neutral-500 dark:text-neutral-900",
              getEpirationColor(task.expiresAt)
            )}
          >
            {format(task.expiresAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
}
