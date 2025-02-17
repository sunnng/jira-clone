import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

const $post =
  client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"];

type RequestType = InferRequestType<typeof $post>;
type ResponseType = InferResponseType<typeof $post, 200>;

export const useResetInviteCode = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $post({
        param,
      });

      if (!res.ok) {
        throw new Error("Failed to reset invite code");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Invite code reset");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },
    onError: () => {
      toast.error("重置邀请码失败");
    },
  });

  return mutation;
};
