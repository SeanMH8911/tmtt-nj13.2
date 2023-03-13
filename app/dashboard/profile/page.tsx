import UserListingProfile from "@/components/user/UserListingProfile";
import getUser from "@/lib/getUser";

async function Profile() {
  const user = await getUser();
  return (
    <div className="flex justify-center">
      <section className="max-w-2xl">
        <UserListingProfile user={user} />
      </section>
    </div>
  );
}

export default Profile;
