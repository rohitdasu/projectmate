import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { NextPage } from 'next';

const Profile: NextPage = () => {
  return (
    <SharedLayout title="profile">
      <div className="mx-4 flex flex-row gap-8">
        <div>Sidebar</div>
        <div>Content</div>
      </div>
    </SharedLayout>
  );
};

export default Profile;
