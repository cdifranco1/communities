import { ReactPropTypes, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

interface Comment {
  content: string;
  likes: number;
  replies: Array<Comment>;
}

interface TopicData {
  id: number;
  title: string;
  longText: string;
  views: number;
  likes: number;
  comments: Array<Comment>;
}

const topicData1: TopicData = {
  id: 1,
  title: "What do you think about meatball soup?",
  longText: "Meatball soup is delicious it fills me up. What do you all think?",
  views: 20000,
  likes: 200,
  comments: [
    {
      content: "I'm personally not a big fan. I like my meatballs with pasta.",
      likes: 1000,
      replies: [
        {
          content: "Fuck you bro",
          likes: 3,
          replies: [],
        },
      ],
    },
  ],
};

const topicData2: TopicData = {
  id: 2,
  title: "What's your favorite type of pizza?",
  longText:
    "I love all types of pizza, but my personal favorite is pepperoni and mushroom. What's your favorite topping combination?",
  views: 15000,
  likes: 150,
  comments: [
    {
      content:
        "I love a good classic margherita pizza with fresh mozzarella and basil.",
      likes: 500,
      replies: [
        {
          content: "I agree, margherita is the best! So simple and delicious.",
          likes: 2,
          replies: [
            {
              content: "I couldn't agree more. Margherita is the way to go.",
              likes: 1,
              replies: [],
            },
          ],
        },
        {
          content:
            "I prefer a more creative topping combination like BBQ chicken and pineapple.",
          likes: 3,
          replies: [],
        },
      ],
    },
    {
      content: "I'm a big fan of sausage and mushroom pizza. Yum!",
      likes: 300,
      replies: [
        {
          content: "Sausage and mushroom is a great combination. So flavorful!",
          likes: 1,
          replies: [],
        },
        {
          content:
            "I prefer a meat lover's pizza with sausage, pepperoni, and ham.",
          likes: 2,
          replies: [
            {
              content: "Meat lover's pizza is always a hit in my house!",
              likes: 1,
              replies: [],
            },
          ],
        },
      ],
    },
  ],
};

const dummyTopicsCommunity1 = [topicData1, topicData2];
const dummyTopicsCommunity2 = [topicData1, topicData1];

const TopicPreview = ({ topicData }: { topicData: TopicData }) => {
  const maxPreviewLength = 300;

  const endIndex = Math.min(topicData.longText.length, maxPreviewLength);
  const preview = topicData.longText.slice(0, endIndex);

  return (
    <div className="border-2 p-2">
      <h1 className="text-2xl py-2">{topicData.title}</h1>
      <p className="text-lg p-3">{preview}</p>
    </div>
  );
};

const DiscussionTopics = ({
  discussionTopics,
}: {
  discussionTopics: Array<TopicData>;
}) => {
  return (
    <div>
      {discussionTopics.map((topic) => (
        <TopicPreview key={topic.id} topicData={topic} />
      ))}
    </div>
  );
};

// Forum should live here
const CommunityHome = () => {
  const params = useParams();
  const [topics, setTopics] = useState<Array<TopicData>>([]);

  // useEffect should retrieve forum data from backend
  useEffect(() => {
    if (params.id == "1") {
      setTopics(dummyTopicsCommunity1);
    } else if (params.id == "2") {
      setTopics(dummyTopicsCommunity2);
    }
  });

  return <DiscussionTopics discussionTopics={topics} />;
};

export default CommunityHome;
