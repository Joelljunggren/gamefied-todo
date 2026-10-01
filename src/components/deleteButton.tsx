"use client";

import { deleteTodo } from "@/app/actions/todos";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ id }: { id: number }) {
  return (
    <Button type="button" variant="destructive" onClick={() => deleteTodo(id)}>
      Delete
    </Button>
  );
}
