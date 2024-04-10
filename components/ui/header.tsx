import { TagsIcon } from 'lucide-react';
import React from 'react';
interface ChildrenType {
  data: string;
}
const Header: React.FC<ChildrenType> = ({ data }) => {
  return (
    <div className="mb-5 flex  items-center space-x-2">
      <TagsIcon className="mr-2" />
      {data}
    </div>
  );
};

export default Header;
