import * as React from "react";
import { ScrollView, View } from "react-native";
import Task from "~/components/Task";
import AddTask from "~/components/AddTask";
import { Text } from "~/components/ui/text";

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([
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
  ]);

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id: nextId, title, category, isChecked: false }]);
  };

  return (
    <View className="flex-1 flex justify-between bg-background">
      {/*flex-1 justify-center items-center gap-5 p-6 bg-background*/}
      <View className="flex flex-row justify-center">
        {/*w-full max-w-sm p-6 rounded-2xl*/}
        <Text className="pt-20 text-foreground font-bold text-6xl">
          Hall Pass
        </Text>
      </View>
      {/*add loading screen + add 'Please add your first task...'*/}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
