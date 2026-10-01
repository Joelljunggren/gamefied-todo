"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { updateTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const todoSchema = z.object({
  description: z.string().min(1, "Description is required"),
  estimatedTime: z.number().min(1, "Estimated time must be at least 1 minute"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

type Todo = {
  id: number;
  description: string;
  estimatedTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

export default function EditTodoButton({ todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      description: todo.description,
      estimatedTime: todo.estimatedTime,
      difficulty: todo.difficulty,
    },

    validators: {
      onSubmit: todoSchema,
    },

    onSubmit: async ({ value }) => {
      await updateTodo(
        todo.id,
        value.description,
        value.estimatedTime,
        value.difficulty,
      );
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
        Edit
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="description">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Description</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="estimatedTime">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Estimated time (minutes)</Label>

                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="1"
                  value={field.state.value}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                  onBlur={field.handleBlur}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="difficulty">
            {(field) => (
              <div>
                <Label>Difficulty</Label>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as "EASY" | "MEDIUM" | "HARD")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
