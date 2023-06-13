import { ReactNode, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GreenButton } from "../../components/buttons/BasicButtons";
import { AddIcon } from "./sub/SurveyBuilder";
import { TopicData } from "../../types/Topics";

export const topicData1: TopicData = {
  id: 1,
  title: "What do you think about meatball soup?",
  longText: "Meatball soup is delicious it fills me up. What do you all think?",
  views: 20000,
  likes: 200,
  replies: 3,
  activity: 5000,
  comments: [
    {
      content: "I'm personally not a big fan. I like my meatballs with pasta.",
      likes: 1000,
      replies: [
        {
          content: "Same",
          likes: 3,
        },
      ],
    },
  ],
};

export const topicData2: TopicData = {
  id: 2,
  title: "What's your favorite type of pizza?",
  longText:
    "I love all types of pizza, but my personal favorite is pepperoni and mushroom. What's your favorite topping combination?",
  views: 15000,
  likes: 150,
  replies: 2,
  activity: 2000,
  comments: [
    {
      content:
        "I love a good classic margherita pizza with fresh mozzarella and basil.",
      likes: 500,
      replies: [
        {
          content: "I agree, margherita is the best! So simple and delicious.",
          likes: 2,
        },

        {
          content: "I couldn't agree more. Margherita is the way to go.",
          likes: 1,
        },
        {
          content:
            "I prefer a more creative topping combination like BBQ chicken and pineapple.",
          likes: 3,
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
        },
        {
          content:
            "I prefer a meat lover's pizza with sausage, pepperoni, and ham.",
          likes: 2,
        },
        {
          content: "Meat lover's pizza is always a hit in my house!",
          likes: 1,
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
    <div className="p-2 border-b border-gray-300 hover:shadow-sm">
      <div className="flex justify-between items-center">
        <div className="w-2/3">
          <h1 className="text-lg py-2">{topicData.title}</h1>
          <p className="text-sm py-3">{preview}</p>
        </div>
        <RepliesViewsActivityValues
          views={topicData.views}
          replies={topicData.replies}
          activity={topicData.activity}
        />
      </div>
    </div>
  );
};

const DiscussionTopics = ({
  discussionTopics,
}: {
  discussionTopics: Array<TopicData>;
}) => {
  const params = useParams();

  return (
    <div>
      {discussionTopics.map((topic) => (
        <Link to={`/c/${params.id}/t/${topic.id}`}>
          <TopicPreview key={topic.id} topicData={topic} />
        </Link>
      ))}
    </div>
  );
};

const TopicsNavBar = () => {
  return (
    <div>
      {/* categories */}
      <div></div>
      <div className="w-1/6">
        <GreenButton clickHandler={(e) => console.log(e)}>
          <AddIcon />
          Add Topic
        </GreenButton>
      </div>
    </div>
  );
};

const RepliesViewsActivityContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="w-1/4 flex justify-between">{children}</div>;
};

const RepliesViewsActivityColumHeaders = () => (
  <RepliesViewsActivityContainer>
    <span>Replies</span>
    <span>Views</span>
    <span>Activity</span>
  </RepliesViewsActivityContainer>
);

const formatActivity = (activity: number) => {
  const millisecondsPerSecond = 1000;
  const milliPerMinute = millisecondsPerSecond * 60;
  const milliPerHour = milliPerMinute * 60;
  const milliPerDay = milliPerHour * 24;

  return activity > milliPerDay
    ? `${activity / milliPerDay}d`
    : activity > milliPerHour
    ? `${activity / milliPerHour}h`
    : activity > milliPerMinute
    ? `${activity / milliPerMinute}m`
    : `${activity / millisecondsPerSecond}s`;
};

const formatViews = (views: number) => {
  return views > 1000 ? `${views / 1000}k` : views;
};

const RepliesViewsActivityValues = ({
  replies,
  views,
  activity,
}: {
  replies: number;
  views: number;
  activity: number;
}) => {
  return (
    <RepliesViewsActivityContainer>
      <span className="text-sm">{replies}</span>
      <span className="text-sm">{formatViews(views)}</span>
      <span className="text-sm">{formatActivity(activity)}</span>
    </RepliesViewsActivityContainer>
  );
};

const TopicColumns = () => {
  return (
    <div className="flex justify-between text-gray-400 border-b-2 my-2">
      <span>Topic</span>
      <RepliesViewsActivityColumHeaders />
    </div>
  );
};

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

  return (
    <div>
      <TopicsNavBar />
      <div>
        <TopicColumns />
        <DiscussionTopics discussionTopics={topics} />
      </div>
    </div>
  );
};

export default CommunityHome;
