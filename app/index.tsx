import * as React from "react";
import { View, Text } from "react-native";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

export default function HomeScreen() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-background">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="pb-2 text-center">Hall Pass</CardTitle>
          <Text>{new Date().toLocaleTimeString()}</Text>
        </CardHeader>

        <CardContent>
          <View className="flex flex-row h-20 w-full border-2 border-cyan-400">
            <View className="flex w-24 h-full border-2">
              <Checkbox
                className="border-pink-600"
                checked={checked}
                onCheckedChange={setChecked}
              />
            </View>
            <View className="flex flex-1 h-full border-2">
              <Text className=" text-gray-300 text-xl">Feed the cow</Text>
              <Text className="text-foreground-transparent text-xl">
                Feed the cow
              </Text>
            </View>
          </View>
        </CardContent>

        <CardFooter className="flex-col gap-3 pb-6">
          <View className="flex-row items-center overflow-hidden">
            <Text>Update me with your app code</Text>
          </View>
        </CardFooter>
      </Card>
    </View>
  );
}
