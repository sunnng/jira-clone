import { getCurrent } from "@/features/auth/queries";
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdJoinPage {
  params: { workspaceId: string; inviteCode: string };
}

const WorkspaceIdJoinPage = async ({ params }: WorkspaceIdJoinPage) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspaceName = await getWorkspaceInfo({
    workspaceId: params.workspaceId,
  });

  if (!workspaceName) {
    redirect("/");
  }

  const initialValues = {
    name: workspaceName.name,
    inviteCode: params.inviteCode,
    workspaceId: params.workspaceId,
  };

  return (
    <div className="w-full lg:max-w-xl">
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdJoinPage;
