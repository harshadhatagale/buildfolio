import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/pages/dashboard/DashboardClient";
import { syncUser } from "../../../lib/utils/User";
import { getProjectsByUser } from "../../../lib/utils/Projects";
export default async function Page() {
  const { userId } = await auth();
  const  user  = await currentUser()
  if (!userId) redirect("/sign-in");

  const myUser = await syncUser(user);
  const projects = await getProjectsByUser(myUser._id);
  return (
    <DashboardClient
      myUser={myUser}
      initialProjects={projects}
    />
  );
}
