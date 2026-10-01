import { createTodo } from "@/app/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TodoForm() {
  return (
    <form action={createTodo} className="space-y-6">
      <div>
        <label htmlFor="description">Description of task</label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="What needs to get done?"
          required
        />
      </div>

      <div>
        <label htmlFor="estimatedTime">
          Estimated completion time (minutes)
        </label>
        <Input
          id="estimatedTime"
          name="estimatedTime"
          type="number"
          min="1"
          placeholder="30"
          required
        />
      </div>

      <div>
        <label htmlFor="difficulty">Difficulty</label>

        <Select name="difficulty" required>
          <SelectTrigger id="difficulty">
            <SelectValue placeholder="Chose difficulty" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="EASY">EASY</SelectItem>
            <SelectItem value="MEDIUM">MEDIUM</SelectItem>
            <SelectItem value="HARD">HARD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Skapa todo</Button>
    </form>
  );
}
