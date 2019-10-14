import React from "react";
import { WebView } from "react-native-webview";

const StoryContent = ({ url }) => {
  return <WebView source={{ uri: url }} />;
};

export default StoryContent;
