import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import { useUserInformation } from "../../hooks";
import "./Home.css";

const Home = () => {
  const { currentUser } = useUserInformation();
  const [loadNumberValue, setLoadNumberValue] = useState(20);
  const loadMoreHandler = (e) => {
    e.preventDefault();
    setLoadNumberValue((previouseValue) => previouseValue + 20);
  };
  const posts = useSelector((state) => state.posts.filteredPosts);
  return (
    <Container>
      <div className="home-style">
        {currentUser && <CreatePost />}
        {posts?.slice(0, loadNumberValue).map((ele) => (
          <Post
            user={ele.user}
            key={Math.random()}
            id={ele.id}
            date={ele.date}
            content={ele.content}
            comments={ele.comments}
          />
        ))}
        {posts?.length > loadNumberValue && (
          <Button onClick={loadMoreHandler} name={"Load More"} />
        )}
        {/* {posts.length = loadNumberValue && <Button name={"Load More"} />} */}
      </div>
    </Container>
  );
};
export default Home;
