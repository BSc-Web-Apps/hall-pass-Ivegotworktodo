import * as React from "react";
import { ScrollView, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "~/components/ui/text";
import { useFocusEffect } from "@react-navigation/native";
import { Checkbox } from "~/components/ui/checkbox";

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
  checked: boolean;
}

const TASKS_STORAGE_KEY = "hallpass_tasks";

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Project[]>([]);

  const toggleProjectChecked = (category: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.category === category
          ? { ...project, checked: !project.checked }
          : project
      )
    );
  };

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
            checked: false,
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
              className="flex flex-row w-full bg-background"
            >
              <View className="px-8 pt-10 w-24 h-full4">
                <Checkbox
                  className="border-foreground checked:bg-foreground"
                  checked={project.checked}
                  onCheckedChange={() => toggleProjectChecked(project.category)}
                  style={{
                    borderColor: project.color,
                    transform: [{ scale: 2.5 }],
                  }}
                />
              </View>
              <View className="pt-7 py-4 flex gap-1 flex-1 h-full pb-12 border-b border-foreground-transparent">
                <Text style={{ color: project.color }} className="text-3xl">
                  {project.category}
                </Text>
              </View>
              <Text
                style={{ color: project.color }}
                className="pt-6 text-3xl pr-8"
              >
                {project.count}
              </Text>
            </View>
          ))
        )}
      </ScrollView>{" "}
    </View>
  );
}
