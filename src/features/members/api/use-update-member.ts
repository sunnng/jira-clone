import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

const $patch = client.api.members[":memberId"]["$patch"];

type RequestType = InferRequestType<typeof $patch>;
type ResponseType200 = InferResponseType<typeof $patch, 200>;

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const res = await $patch({ param, json });

      if (!res.ok) {
        throw new Error("Failed to update member");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Member updated");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });

  return mutation;
};
