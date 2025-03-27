import * as React from "react";
import { View, Text } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
}

function Task({ title, category, isChecked }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);
  return (
    <View className="flex flex-row h-20 w-full border-2 border-cyan-400">
      <View className="flex w-24 h-full border-2 border-red-600 justify-center items-center">
        <Checkbox
          className="border-pink-600"
          checked={checked}
          onCheckedChange={setChecked}
          style={{ transform: [{ scale: 2 }] }}
        />
      </View>
      <View className="flex flex-1 h-full border-2">
        <Text className=" text-gray-300 text-xl">{title}</Text>
        <Text className="text-foreground-transparent text-xl">{category}</Text>
      </View>
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
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">Hall Pass</CardTitle>
          <Text>{new Date().toLocaleTimeString()}</Text>
        </CardHeader>

        <CardContent>
          {tasks.map((task) => (
            <Task
              key={task.id}
              title={task.title}
              category={task.category}
              isChecked={task.isChecked}
            />
          ))}
        </CardContent>
      </Card>
    </View>
  );
}
