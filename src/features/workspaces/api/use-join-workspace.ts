import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

const $post = client.api.workspaces[":workspaceId"]["join"]["$post"];

type RequestType = InferRequestType<typeof $post>;
type ResponseType = InferResponseType<typeof $post, 200>;

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await $post({
        json,
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to join workspace");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Joined workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },
    onError: () => {
      toast.error("加入团队失败");
    },
  });

  return mutation;
};
