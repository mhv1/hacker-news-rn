import React from "react";
import { Text, StyleSheet, View } from "react-native";
import useStoryComment from "../hooks/useStoryComment";

// To aid with the comment rendering:
// https://github.com/jsdf/react-native-htmlview
import HTMLView from "react-native-htmlview";

const StoryComment = ({ commentId }) => {
  const [comment, errorMessage] = useStoryComment(commentId);

  if (!comment) {
    return null;
  }

  const formattedTime = new Date(comment.time * 1000).toDateString();

  return (
    <View style={styles.container}>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Text style={styles.commentHeaderText}>
        By: {comment.by} - {formattedTime}
      </Text>
      <HTMLView value={comment.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3f2fd",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  commentHeaderText: {
    marginBottom: 8,
    fontWeight: "bold"
  }
});

export default StoryComment;
