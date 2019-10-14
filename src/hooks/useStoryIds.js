import { useEffect, useState } from "react";
import hackerNewsApi from "../api/hackerNewsApi";

export default () => {
  const [storyIds, setStoryIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchStoryIds = async () => {
    try {
      const response = await hackerNewsApi.get("/beststories.json");
      setStoryIds(response.data);
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStoryIds();
  }, []);

  return [storyIds, errorMessage];
};
