import * as React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
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
    <View className="flex flex-row h-40 w-full border-2 border-cyan-400">
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
          <button className="self-center text-white" onClick={handleSubtract}>
            Remove 1
          </button>
        </View>
      </View>
      <View className="flex flex-1 h-full border-2">
        <Text className=" text-gray-300 text-xl">{title}</Text>
        <Text className="text-foreground-transparent text-xl">{category}</Text>
      </View>
      <Text className="text-white text-xl">{count}</Text>
    </View>
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
