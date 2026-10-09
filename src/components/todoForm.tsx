"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";

import { createTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const formSchema = z.object({
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

type TodoFormValues = {
  description: string;
  estimatedTime: number;
  difficulty: "" | "EASY" | "MEDIUM" | "HARD";
};

export default function TodoForm() {
  const form = useForm({
    defaultValues: {
      description: "",
      estimatedTime: 0,
      difficulty: "",
    } as TodoFormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      formData.set("description", value.description);
      formData.set("estimatedTime", String(value.estimatedTime));
      formData.set("difficulty", value.difficulty);

      await createTodo(formData);
      form.reset();
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="mb-3">
        <CardTitle>Add task</CardTitle>
        <CardDescription>
          Add a task, estimate how long it will take, and choose its difficulty.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="todo-form"
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
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button type="submit" form="todo-form">
          Skapa todo
        </Button>
      </CardFooter>
    </Card>
  );
}
