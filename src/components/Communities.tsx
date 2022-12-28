import { useState, FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./BasicModal";
import { GreenButton, RedButton } from "./buttons/BasicButtons";
import DynamicForm from "./community/NewCommunityForm";

interface CommunityType {
  id: number;
  name: string;
  members: number;
}
type CommunitiesList = Array<CommunityType>;

interface FilterState {
  categories: boolean;
}
const initialFilterState: FilterState = {
  categories: false,
};

const dummyComms = [
  { id: 1, name: "Charlie's new community", members: 10 },
  { id: 2, name: "Ethereum Research", members: 20 },
];

const CommunityCard: FunctionComponent<CommunityType> = ({
  id,
  name,
  members,
}: CommunityType) => {
  return (
    <Link to={`/community/${id}`}>
      <div className="flex justify-between py-1 px-5 border rounded-md hover:bg-blue-50 cursor-pointer">
        <span className="text-3xl">{name}</span>
        <span className="text-3xl">{members}</span>
      </div>
    </Link>
  );
};

const CommunityList = (communityProps: { communities: CommunitiesList }) => {
  return (
    <>
      {communityProps.communities.map((c) => (
        <CommunityCard key={c.id} {...c} />
      ))}
    </>
  );
};
const FilterSpan = ({
  children,
  isActive,
}: {
  children: string;
  isActive: boolean;
}) => {
  return (
    <span className="border text-center px-3 py-2 hover:bg-blue-200 cursor-pointer">
      {children}
    </span>
  );
};

/** Should provide selection of filters that
 * impact communities displayed.
 *
 * @returns
 */
const CommunityFilters = ({
  filterState: { categories },
}: {
  filterState: FilterState;
}) => {
  return (
    <div className="flex justify-between py-2">
      <div className="w-2/5 flex justify-between">
        <FilterSpan isActive={categories}>Categories</FilterSpan>
      </div>
    </div>
  );
};

const Communities = () => {
  const [filters, setFilters] = useState(initialFilterState);
  const [communities, setCommunities] = useState<CommunitiesList>(dummyComms);

  useEffect(() => console.log("Communities rendering"));

  return (
    <div className="border border-blue-400">
      <CommunityFilters filterState={filters} />
      <CommunityList communities={communities} />
      <Modal
        title="Create a Community"
        closeButton={RedButton}
        saveChangesButton={GreenButton}
      >
        <DynamicForm />
      </Modal>
    </div>
  );
};

export default Communities;
