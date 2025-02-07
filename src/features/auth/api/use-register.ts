import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.auth.register.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.register.$post>;

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.register["$post"](json);
      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return mutation;
};
