import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

const $delete = client.api.members[":memberId"]["$delete"];

type RequestType = InferRequestType<typeof $delete>;
type ResponseType200 = InferResponseType<typeof $delete, 200>;

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await $delete({ param });

      if (!res.ok) {
        throw new Error("Failed to delete member");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Member deleted");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to delete member");
    },
  });

  return mutation;
};
