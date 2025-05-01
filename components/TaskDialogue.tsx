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
}

export default function TaskDialog({
  task,
  setTask,
  setShowDialog,
  showDialog,
}: TaskDialogProps) {
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
    setShowDialog(false);
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
            defaultValue={title}
            placeholder="Task title"
            onChangeText={handleUpdateTitle}
          />
          <Input
            defaultValue={category}
            placeholder="Category"
            onChangeText={handleUpdateCategory}
          />
        </View>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <Text>Cancel</Text>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onPress={handleSave}>
              <Text>Save changes</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
