import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

const $patch = client.api.tasks[":taskId"]["$patch"];
type RequestType = InferRequestType<typeof $patch>;
type ResponseType200 = InferResponseType<typeof $patch, 200>;

export const useUpdateTask = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const res = await $patch({ json, param });

      if (!res.ok) {
        throw Error("Failed to update task");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Task update successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  return mutation;
};
