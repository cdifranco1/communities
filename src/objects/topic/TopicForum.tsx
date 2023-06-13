import { useParams } from "react-router-dom";
import { useState } from "react";
import { TopicData } from "../../types/Topics";
import { topicData1, topicData2 } from "../community/CommunityHome";

const TopicForum = () => {
  const [post, setPost] = useState<TopicData>();
  const params = useParams();

  return (
    <div>
      <h1>{`TOPIC FORUM.  Community ID: ${params.communityId}. Topic ID: ${params.topicId}`}</h1>
    </div>
  );
};

export default TopicForum;
