import * as React from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "~/components/Task";
import AddTask from "~/components/AddTask";
import { Text } from "~/components/ui/text";

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

const TASKS_STORAGE_KEY = "hallpass_tasks";
const saveTasks = async (updatedTasks: TaskItem[]) => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

export default function HomeScreen() {
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = (title: string, category: string) => {
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const updatedTasks = [
      ...tasks,
      { id: nextId, title, category, isChecked: false },
    ];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleTaskUpdate = (updatedTask: TaskItem) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
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
        <Text className="text-foreground text-2xl font-semibold mb-8">
          Today's Tasks
        </Text>
        {isLoading ? (
          <Text className="text-center text-foreground text-lg">
            Loading tasks...
          </Text>
        ) : tasks.length === 0 ? (
          <Text className="text-center text-foreground text-lg">
            Please add your first task...
          </Text>
        ) : (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdate={handleTaskUpdate}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </ScrollView>
      <View className="relative flex items-center">
        <AddTask onAdd={handleAddTask} />
      </View>
    </View>
  );
}
