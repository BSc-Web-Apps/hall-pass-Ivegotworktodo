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
  onUpdate?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
}

export default function Task({
  task: propTask,
  onUpdate,
  onDelete,
}: TaskProps) {
  const [task, setTask] = React.useState(propTask);
  const [showDialog, setShowDialog] = React.useState(false);
  const { title, category, isChecked } = task;

  const handleSetChecked = (newChecked: boolean) => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full bg-background"
        //className="flex flex-row h-40 w-full border-2 border-cyan-400"
        delayLongPress={100}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          {/*<View className="flex w-24 h-full border-2 border-red-600 justify-center items-center"></View>*/}
          <Checkbox
            className="border-foreground checked:bg-foreground"
            checked={isChecked}
            onCheckedChange={handleSetChecked}
            style={{ transform: [{ scale: 2 }] }}
          />
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          {/*border-2*/}
          <Text
            className={`text-xl ${
              task.isChecked
                ? "text-foreground-transparent line-through"
                : "text-foreground"
            }`}
          >
            {title}
          </Text>
          <Text className="text-foreground-transparent text-xl">
            {category}
          </Text>
        </View>
        <View className="justify-center px-4">
          <TouchableOpacity onPress={() => onDelete?.(task.id)}>
            <Text className="text-red-500 text-xl">✕</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TaskDialog
        task={task}
        setTask={(updatedTask) => {
          setTask(updatedTask);
          onUpdate?.(updatedTask);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}
