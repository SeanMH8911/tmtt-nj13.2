import UserListingProfile from "@/components/user/UserListingProfile";
import getUser from "@/lib/getUser";

async function Profile() {
  const user = await getUser();
  return (
    <div className="flex justify-center">
      <section className="px-2 max-w-2xl mx-auto">
        <UserListingProfile user={user} />
      </section>
    </div>
  );
}

export default Profile;
