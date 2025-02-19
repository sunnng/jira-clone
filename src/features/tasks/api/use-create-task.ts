import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.tasks.$post>;
type ResponseType200 = InferResponseType<typeof client.api.tasks.$post, 200>;

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.tasks["$post"]({ json });

      if (!res.ok) {
        throw Error("Failed to create task");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  return mutation;
};
