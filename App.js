import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import StoryListScreen from "./src/screens/StoryListScreen";
import StoryDetailScreen from "./src/screens/StoryDetailScreen";

// TODO: Title of the StoryDetail screen.
const navigator = createStackNavigator(
	{
		StoryList: StoryListScreen,
		StoryDetail: StoryDetailScreen
	},
	{
		initialRouteName: "StoryList",
		defaultNavigationOptions: {
			title: "Hacker News"
		}
	}
);

export default createAppContainer(navigator);
