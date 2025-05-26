import * as React from "react";
import { TouchableOpacity, ScrollView, View, Image } from "react-native";
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
  const [hasStarted, setHasStarted] = React.useState(false);

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

  if (!hasStarted) {
    return (
      <View className="flex-1 justify-center items-center bg-background px-6">
        <View className="flex flex-row justify-center items-center pt-20 space-x-6 pb-20">
          <Text className="text-foreground font-bold text-7xl">HallPass</Text>
          <Image
            source={require("../assets/images/svg/hallpass-checkmark.svg")}
            style={{ width: 94, height: 94 }}
          />
        </View>
        <Image
          source={require("../assets/images/svg/hallpass-checkmark.svg")}
          style={{ width: 100, height: 100, marginBottom: 40 }}
        />
        <TouchableOpacity
          onPress={() => setHasStarted(true)}
          className="bg-orange-500 rounded-full px-6 py-3"
        >
          <Text className="text-white text-xl font-semibold">Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 flex justify-between bg-background">
      {/*flex-1 justify-center items-center gap-5 p-6 bg-background*/}
      <View className="flex flex-row justify-center">
        {/*w-full max-w-sm p-6 rounded-2xl*/}
        <View className="flex flex-row justify-center items-center pt-20 space-x-6">
          <Text className="text-foreground font-bold text-7xl">HallPass</Text>
          <Image
            source={require("../assets/images/svg/hallpass-checkmark.svg")}
            style={{ width: 82, height: 82 }}
          />
        </View>
      </View>
      {/*add loading screen + add 'Please add your first task...'*/}
      <Text className="text-foreground text-3xl font-semibold pl-6 pt-14 mb-6">
        Today's Tasks
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
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
