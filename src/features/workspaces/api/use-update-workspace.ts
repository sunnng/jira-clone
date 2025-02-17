import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

const $patch = client.api.workspaces[":workspaceId"]["$patch"];

type RequestType = InferRequestType<typeof $patch>;
type ErrorResponseType = { error: string };
type ResponseType200 = InferResponseType<typeof $patch, 200>;

export const useUpdateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType200, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      const response = await $patch({ form, param });

      if (response.status === 401) {
        const errorData = (await response.json()) as ErrorResponseType;
        throw new Error(`401 Unauthorized:${errorData.error}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace updated");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspaces", data.$id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
