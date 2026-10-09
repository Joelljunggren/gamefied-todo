import { getTodos } from "@/lib/todos";
import DeleteButton from "../deleteButton";
import EditTodoButton from "../editTodoButton";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";

export default async function Todo() {
  const todos = await getTodos();
  const difficultyStyles = {
    EASY: "bg-green-950",
    MEDIUM: "bg-yellow-950",
    HARD: "bg-red-950",
  };
  return (
    <div className="w-full space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id}>
            <Card className="mx-auto w-full max-w-sm border-border bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="mb-4">{todo.description}</CardTitle>

                <CardDescription className="flex items-center justify-between">
                  {todo.estimatedTime} minutes
                  <Badge
                    className={`${difficultyStyles[todo.difficulty]} rounded-sm px-3 py-1 font-semibold text-white text-shadow-lg p-3`}
                  >
                    {todo.difficulty}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardFooter className="justify-end gap-2">
                <EditTodoButton todo={todo} />
                <DeleteButton id={todo.id} />
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <p>No additions</p>
      )}
    </div>
  );
}
