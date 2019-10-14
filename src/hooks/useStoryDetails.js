import { useEffect, useState } from "react";
import hackerNewsApi from "../api/hackerNewsApi";

export default storyId => {
  const [story, setStory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // To avoid async ops in unmounted Components:
  // https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8
  // https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  useEffect(() => {
    let cancel = false;

    const fetchStory = async () => {
      try {
        const response = await hackerNewsApi.get(`/item/${storyId}.json`);
        if (cancel) {
          return;
        }
        setStory(response.data);
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      }
    };

    fetchStory();

    return () => {
      cancel = true;
    };
  }, []);

  return [story, errorMessage];
};
