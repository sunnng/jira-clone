import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$delete"]
>;
type ResponseType200 = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$delete"],
  200
>;

export const useDeleteTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const res = await client.api.tasks[":taskId"]["$delete"]({ param });

      if (!res.ok) {
        throw Error("Failed to delete task");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task delete successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
