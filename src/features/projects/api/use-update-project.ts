import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

const $patch = client.api.projects[":projectId"]["$patch"];

type RequestType = InferRequestType<typeof $patch>;
type ResponseType200 = InferResponseType<typeof $patch, 200>;

export const useUpdateProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const res = await $patch({ form, param });

      if (!res.ok) {
        throw Error("更新项目失败");
      }

      return await res.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Projects updated successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("更新项目失败");
    },
  });

  return mutation;
};
