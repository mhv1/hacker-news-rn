import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import StoryContent from "../components/StoryContent";
import StoryCommentList from "../components/StoryCommentList";

const StoryDetailScreen = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "story_content", title: "Content" },
      { key: "story_comment_list", title: "Comments" }
    ]
  });

  const storyContents = navigation.getParam("storyContents");

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "story_content":
        return <StoryContent url={storyContents.url} />;
      case "story_comment_list":
        return <StoryCommentList commentIds={storyContents.kids} />;
      default:
        return null;
    }
  };

  renderLabel = ({ route, focused }) => {
    return (
      <View>
        <Text
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
        >
          {route.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{storyContents.title}</Text>
      <Text style={styles.author}>By: {storyContents.by}</Text>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "white" }}
            renderLabel={renderLabel}
            style={styles.tabBar}
          />
        )}
        lazy
        navigationState={state}
        renderScene={renderScene}
        onIndexChange={index => setState({ ...state, index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 30,
    marginTop: 8,
    marginHorizontal: 12
  },
  author: {
    margin: 12
  },
  tabBar: {
    backgroundColor: "#e3f2fd"
  },
  activeTabTextColor: {
    color: "black"
  },
  tabTextColor: {
    color: "gray"
  }
});

export default StoryDetailScreen;
