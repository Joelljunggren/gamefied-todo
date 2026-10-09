"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { CardDescription } from "@/components/ui/card";

const todoSchema = z.object({
  description: z.string().min(1, "Task description is required."),
  estimatedTime: z
    .number({
      error: "Estimated completion time is required.",
    })
    .int("Estimated time must be a whole number.")
    .min(1, "Estimated time must be at least 1 minute."),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
    error: "Please select a difficulty.",
  }),
});

type Todo = {
  id: number;
  description: string;
  estimatedTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
};

type TodoFormValues = {
  description: string;
  estimatedTime: number;
  difficulty: "" | "EASY" | "MEDIUM" | "HARD";
};

export default function EditTodoButton({ todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      description: todo.description,
      estimatedTime: todo.estimatedTime,
      difficulty: todo.difficulty,
    } as TodoFormValues,

    validators: {
      onSubmit: todoSchema,
    },

    onSubmit: async ({ value }) => {
      await updateTodo(
        todo.id,
        value.description,
        value.estimatedTime,
        value.difficulty as Todo["difficulty"],
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
        <DialogHeader className="mb-3">
          <DialogTitle>Edit task</DialogTitle>
          <CardDescription>
            Update your task if the situation has changed.
          </CardDescription>
        </DialogHeader>

        <form
          id={`edit-todo-${todo.id}`}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Description of task
                    </FieldLabel>

                    <Input
                      className="text-sm"
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="What needs to get done?"
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      required
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="estimatedTime">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Estimated completion time (minutes)
                    </FieldLabel>

                    <Input
                      className="text-sm"
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      step={1}
                      value={field.state.value === 0 ? "" : field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.handleChange(value === "" ? 0 : Number(value));
                      }}
                      placeholder="In minutes"
                      aria-invalid={isInvalid}
                      required
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="difficulty">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Difficulty</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) => {
                        field.handleChange(
                          value as TodoFormValues["difficulty"],
                        );
                        field.handleBlur();
                      }}
                    >
                      <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                        <SelectValue placeholder="Choose difficulty" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="EASY">EASY</SelectItem>
                        <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                        <SelectItem value="HARD">HARD</SelectItem>
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" form={`edit-todo-${todo.id}`}>
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
