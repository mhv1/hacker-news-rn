import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Used "withNavigation" to avoid passing the "navigation" prop around through StoryListScreen,
// which doesn't have anything to do with it.
import { withNavigation } from "react-navigation";
import useStoryDetails from "../hooks/useStoryDetails";

const Story = ({ storyId, navigation }) => {
  const [story, errorMessage] = useStoryDetails(storyId);

  if (!story) {
    return null;
  }

  const formattedTime = new Date(story.time * 1000).toDateString();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("StoryDetail", { storyContents: story });
      }}
    >
      <View style={styles.container}>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.subTitle}>
          By: {story.by} - {formattedTime}
        </Text>
        <Text style={styles.subTitle}>Score: {story.score}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3f2fd",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 4
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 16,
    marginTop: 4
  }
});

export default withNavigation(Story);
