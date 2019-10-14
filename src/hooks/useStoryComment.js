import { useEffect, useState } from "react";
import hackerNewsApi from "../api/hackerNewsApi";

export default commentId => {
  const [comment, setComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // To avoid async ops in unmounted Components:
  // https://dev.to/n1ru4l/homebrew-react-hooks-useasynceffect-or-how-to-handle-async-operations-with-useeffect-1fa8
  // https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  useEffect(() => {
    let cancel = false;

    const fetchCommnet = async () => {
      try {
        const response = await hackerNewsApi.get(`/item/${commentId}.json`);
        if (cancel) {
          return;
        }
        setComment(response.data);
      } catch (error) {
        setErrorMessage(error);
        console.log(error);
      }
    };

    fetchCommnet();

    return () => {
      cancel = true;
    };
  }, []);

  return [comment, errorMessage];
};
