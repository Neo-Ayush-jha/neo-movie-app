import { Dimensions, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute top-0 left-0 justify-center items-center "
    >
      <Progress.CircleSnail thickness={12} size={160} color={"#eab388"} />
    </View>
  );
}
