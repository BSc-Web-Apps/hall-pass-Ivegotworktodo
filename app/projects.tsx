import * as React from "react";
import { ScrollView, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";
import { useFocusEffect } from "@react-navigation/native";

interface TaskItem {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

interface Project {
  category: string;
  count: number;
  color: string;
}

const TASKS_STORAGE_KEY = "hallpass_tasks";

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadAndGroupTasks = async () => {
        const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
        if (!stored) {
          setProjects([]);
          return;
        }

        const tasks: TaskItem[] = JSON.parse(stored);
        const categoryMap: Record<string, number> = {};

        tasks.forEach((task) => {
          categoryMap[task.category] = (categoryMap[task.category] || 0) + 1;
        });

        const colors = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

        const grouped = Object.entries(categoryMap).map(
          ([category, count], i) => ({
            category,
            count,
            color: colors[i % colors.length],
          })
        );

        setProjects(grouped);
      };

      loadAndGroupTasks();
    }, [])
  );

  return (
    <View className="flex-1 flex justify-between bg-background">
      <View className="flex flex-row justify-center">
        <View className="flex flex-row justify-center items-center pt-20 space-x-6">
          <Text className="text-foreground font-bold text-7xl">HallPass</Text>
          <Image
            source={require("../assets/images/svg/hallpass-checkmark.svg")}
            style={{ width: 82, height: 82 }}
          />
        </View>
      </View>
      <Text className="text-foreground text-3xl font-semibold pl-6 pt-14 mb-6">
        Current Projects
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 16,
        }}
      >
        {projects.length === 0 ? (
          <Text className="text-center text-lg text-foreground">
            No projects found.
          </Text>
        ) : (
          projects.map((project) => (
            <View
              key={project.category}
              className="rounded-xl p-4 mb-4"
              style={{ backgroundColor: project.color }}
            >
              <Text className="text-white text-xl font-bold">
                {project.category}
              </Text>
              <Text className="text-white text-xl">{project.count}</Text>
            </View>
          ))
        )}
      </ScrollView>{" "}
    </View>
  );
}
