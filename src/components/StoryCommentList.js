import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import StoryComment from "./StoryComment";

const StoryCommentList = ({ commentIds }) => {
  return (
    <View>
      <FlatList
        data={commentIds}
        keyExtractor={commentId => commentId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <StoryComment commentId={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoryCommentList;
