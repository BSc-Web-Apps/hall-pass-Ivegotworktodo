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
  count: number;
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

  function handleAdd() {
    const newCount = task.count + 1;
    const updatedTask = {
      ...task,
      count: newCount,
      isChecked: newCount === 0,
    };
    setTask(updatedTask);
    onUpdate?.(updatedTask);
  }

  function handleSubtract() {
    const newCount = task.count > 0 ? task.count - 1 : 0;
    const updatedTask = {
      ...task,
      count: newCount,
      isChecked: newCount === 0,
    };
    setTask(updatedTask);
    onUpdate?.(updatedTask);
  }

  const handleSetChecked = (newChecked: boolean) => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    setTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTask(updatedTask);
    if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  return (
    <>
      <TouchableOpacity
        className="flex flex-row w-full bg-gray-800"
        //className="flex flex-row h-40 w-full border-2 border-cyan-400"
        delayLongPress={500}
        onLongPress={() => setShowDialog(true)}
      >
        <View className="px-8 pt-8 w-24 h-full">
          {/*<View className="flex w-24 h-full border-2 border-red-600 justify-center items-center"></View>*/}
          <Checkbox
            className="border-foreground checked:bg-foreground"
            //className="border-pink-600"
            checked={isChecked}
            onCheckedChange={handleSetChecked}
            style={{ transform: [{ scale: 2 }] }}
          />
          <View className="flex justify-center gap-4 pt-5">
            <TouchableOpacity onPress={handleAdd}>
              <Text className="self-center text-white">Add 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubtract}>
              <Text className="self-center text-white">Remove 1</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="py-4 flex gap-1 flex-1 h-full border-b border-foreground-transparent">
          {/*border-2*/}
          <Text className="text-foreground text-xl">{title}</Text>
          {/*<Text className=" text-gray-300 text-xl">{title}</Text>*/}
          <Text className="text-foreground-transparent text-xl">
            {category}
          </Text>
        </View>
        <View className="justify-center px-4">
          <TouchableOpacity onPress={() => onDelete?.(task.id)}>
            <Text className="text-red-500 text-xl">✕</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-xl">{task.count}</Text>
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
