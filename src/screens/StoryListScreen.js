import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import useStoryIds from "../hooks/useStoryIds";
import Story from "../components/Story";

const StoryListScreen = () => {
  const [storyIds, errorMessage] = useStoryIds();

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <FlatList
        data={storyIds}
        keyExtractor={storyId => storyId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <Story storyId={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  errorMessage: {
    marginHorizontal: 20,
    marginTop: 10,
    fontSize: 20,
    color: "red"
  }
});

export default StoryListScreen;
