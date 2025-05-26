import * as React from "react";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";

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

  React.useEffect(() => {
    const loadAndGroupTasks = async () => {
      const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (!stored) return;

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
  }, []);

  return (
    <View className="flex-1 bg-background p-4">
      <Text className="text-4xl font-bold text-center text-foreground mt-10 mb-4">
        Projects
      </Text>
      <Text className="text-foreground text-2xl font-semibold mb-8">
        Current Projects
      </Text>
      <ScrollView>
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
