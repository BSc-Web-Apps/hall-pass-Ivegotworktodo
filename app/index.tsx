import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  onEdit?: (newTitle: string, newCategory: string) => void;
}

function Task({ title, category, isChecked }: TaskProps) {
  const [count, setCount] = React.useState(0);
  const [checked, setChecked] = React.useState(isChecked);

  function handleAdd() {
    setCount((prev) => prev + 1);
  }

  function handleSubtract() {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  React.useEffect(() => {
    setChecked(count === 0);
  }, [count]);

  function handleCheckboxChange(newChecked: boolean) {
    if (newChecked) {
      setCount(0);
    }
    setChecked(newChecked);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity
          className="flex flex-row h-40 w-full border-2 border-cyan-400"
          delayLongPress={500}
        >
          <View className="flex w-24 h-full border-2 border-red-600 justify-center items-center">
            <Checkbox
              className="border-pink-600"
              checked={checked}
              onCheckedChange={handleCheckboxChange}
              style={{ transform: [{ scale: 2 }] }}
            />
            <View className="flex justify-center gap-4 pt-5">
              <button className="self-center text-white" onClick={handleAdd}>
                Add 1
              </button>
              <button
                className="self-center text-white"
                onClick={handleSubtract}
              >
                Remove 1
              </button>
            </View>
          </View>
          <View className="flex flex-1 h-full border-2">
            <Text className=" text-gray-300 text-xl">{title}</Text>
            <Text className="text-foreground-transparent text-xl">
              {category}
            </Text>
          </View>
          <Text className="text-white text-xl">{count}</Text>
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task details here.
          </DialogDescription>
        </DialogHeader>

        <View className="gap-4">
          <Input defaultValue={title} placeholder="Task title" />
          <Input defaultValue={category} placeholder="Category" />
        </View>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>
              <Text>Save changes</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function HomeScreen() {
  const tasks = [
    {
      id: 1,
      title: "Read Chapter 9",
      category: "English Literature",
      isChecked: false,
    },
    {
      id: 2,
      title: "Case Study Essay",
      category: "Geography",
      isChecked: false,
    },
    {
      id: 3,
      title: "Book Essay",
      category: "English Literature",
      isChecked: false,
    },
    {
      id: 4,
      title: "Quadratics Worksheet",
      category: "Maths",
      isChecked: false,
    },
    {
      id: 5,
      title: "Draw Design",
      category: "Design & Technology",
      isChecked: false,
    },
  ];
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-background">
      <View className="w-full max-w-sm p-6 rounded-2xl">
        <View className="items-center">
          <Text className="pb-2 text-center text-3xl font-bold text-white">
            Hall Pass
          </Text>
        </View>
        {/*add loading screen + add 'Please add your first task...'*/}
        <View>
          {tasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              category={task.category}
              isChecked={task.isChecked}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
