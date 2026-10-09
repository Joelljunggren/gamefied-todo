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
    EASY: "bg-green-100 ",
    MEDIUM: "bg-yellow-300 ",
    HARD: "bg-red-100 ",
  };
  return (
    <div className="w-full space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id}>
            <Card className="mx-auto w-full max-w-sm">
              <CardHeader>
                <CardTitle>{todo.description}</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  {todo.estimatedTime} minutes
                  <Badge
                    className={`${difficultyStyles[todo.difficulty]} rounded-sm border border-black px-3 py-1 text-black font-semibold`}
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
