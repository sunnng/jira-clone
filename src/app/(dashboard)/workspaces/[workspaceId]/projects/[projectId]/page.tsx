import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { ProjcetIdClient } from "./client";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProjcetIdClient />;
};

export default ProjectIdPage;
