import * as React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import TaskDialog from "./TaskDialogue";
import { Task } from "./Task";

interface AddTaskProps {
  onAdd: (title: string, category: string) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleSave = (updatedTask: Task) => {
    if (updatedTask.title.trim()) {
      onAdd(updatedTask.title, updatedTask.category);
      setTitle("");
      setCategory("");
      setShowDialog(false);
    }
  };

  React.useEffect(() => {
    if (!showDialog) {
      setTitle("");
      setCategory("");
    }
  }, [showDialog]);

  return (
    <View className="absolute -bottom-0 z-10">
      <View className="w-24 h-24 p-1 bg-brand-primary rounded-full flex items-center justify-center">
        <TouchableOpacity
          onPress={() => setShowDialog(true)}
          className="items-center justify-center"
        >
          <Image source={require("../assets/images/svg/main-button.svg")} />
        </TouchableOpacity>
      </View>

      <TaskDialog
        task={{ id: 0, title, category, isChecked: false }}
        setTask={(newTask) => {
          setTitle(newTask.title);
          setCategory(newTask.category);
        }}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onSave={handleSave}
      />
    </View>
  );
}
