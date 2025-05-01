import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import TaskDialog from "./TaskDialogue";

export interface Task {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
}

export interface TaskProps {
  task: Task;
}

export default function Task({ task: propTask }: TaskProps) {
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);
  const { title, category, isChecked } = task;

  const handleSetChecked = () => {
    const nextChecked = !task.isChecked;
    setTask({ ...task, isChecked: nextChecked });
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full bg-gray-800"
        delayLongPress={500}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={isChecked}
            onCheckedChange={handleSetChecked}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          <Text className="text-foreground text-xl">{title}</Text>
          <Text className="text-foreground-transparent text-xl">
            {category}
          </Text>
        </View>
      </TouchableOpacity>

      <TaskDialog
        task={task}
        setTask={setTask}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
