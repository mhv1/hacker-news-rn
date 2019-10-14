import axios from "axios";

// Checked out "fetch" too.
// Axios makes it much simpler.
export default axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0"
});
