import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

const $delete = client.api.projects[":projectId"]["$delete"];

type RequestType = InferRequestType<typeof $delete>;
type ResponseType200 = InferResponseType<typeof $delete, 200>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $delete({ param });

      if (!res.ok) {
        throw Error("删除项目失败");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Projects deleted successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("删除项目失败");
    },
  });

  return mutation;
};
