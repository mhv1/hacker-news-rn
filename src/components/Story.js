import React, { PureComponent } from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import hackerNewsApi from "../api/hackerNewsApi";

// import useStoryDetails from "../hooks/useStoryDetails";

// Used "withNavigation" to avoid passing the "navigation" prop around through StoryListScreen,
// which doesn't have anything to do with it.
import { withNavigation } from "react-navigation";

/*const Story = ({ storyId, navigation }) => {
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
};*/

class Story extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      story: {},
      errorMessage: ""
    };
  }

  // Could make this better by making the Promises cancelable.
  _isMounted = false;

  fetchStory = async () => {
    try {
      const response = await hackerNewsApi.get(
        `/item/${this.props.storyId}.json`
      );
      if (this._isMounted) {
        this.setState({
          story: response.data
        });
      }
    } catch (error) {
      if (this._isMounted) {
        this.setState({
          errorMessage: error
        });
      }
      console.log(error);
    }
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchStory();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("StoryDetail", {
            storyContents: this.state.story
          });
        }}
      >
        <View style={styles.container}>
          {this.state.errorMessage ? (
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          ) : null}
          <Text style={styles.title}>{this.state.story.title}</Text>
          <Text style={styles.subTitle}>
            By: {this.state.story.by} -{" "}
            {new Date(this.state.story.time * 1000).toDateString()}
          </Text>
          <Text style={styles.subTitle}>Score: {this.state.story.score}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
