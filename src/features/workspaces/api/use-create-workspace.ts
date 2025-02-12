import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.workspaces.$post>;
type ResponseType = InferResponseType<typeof client.api.workspaces.$post>;

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.workspaces["$post"]({ form });
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: "workspaces" });
    },
    onError: () => {
      toast.error("创建工作空间失败");
    },
  });

  return mutation;
};
