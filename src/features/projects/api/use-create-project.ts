import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.projects.$post>;
type ResponseType200 = InferResponseType<typeof client.api.projects.$post, 200>;

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const res = await client.api.projects["$post"]({ form });

      if (!res.ok) {
        throw Error("创建项目失败");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast.success("Projects created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("创建项目失败");
    },
  });

  return mutation;
};
