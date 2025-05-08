import React from "react";
import { View } from "react-native";
import { Task } from "./Task";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

interface TaskDialogProps {
  task: Task;
  setTask: (task: Task) => void;
  setShowDialog: (showDialog: boolean) => void;
  showDialog: boolean;
  onSave?: () => void;
}

export default function TaskDialog({
  task,
  setTask,
  setShowDialog,
  showDialog,
  onSave,
}: TaskDialogProps) {
  const isNewTask = task.title === "" && task.category === "";
  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedCategory, setEditedCategory] = React.useState(task.category);

  const { title, category } = task;

  const handleUpdateTitle = (title: string) => {
    setEditedTitle(title);
  };

  const handleUpdateCategory = (category: string) => {
    setEditedCategory(category);
  };

  const handleSave = () => {
    const nextTask = {
      ...task,
      title: editedTitle,
      category: editedCategory,
    };

    setTask(nextTask);
    if (onSave) {
      onSave();
    } else {
      setShowDialog(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task details here.
          </DialogDescription>
        </DialogHeader>

        <View className="gap-4">
          <Input
            value={editedTitle}
            placeholder="Task title"
            onChangeText={handleUpdateTitle}
          />
          <Input
            value={editedCategory}
            placeholder="Category"
            onChangeText={handleUpdateCategory}
          />
        </View>

        <DialogFooter>
          <Button variant="outline" onPress={() => setShowDialog(false)}>
            <Text>Cancel</Text>
          </Button>
          <Button onPress={handleSave}>
            <Text>Save changes</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
