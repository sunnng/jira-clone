import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

type RequestType = InferRequestType<typeof client.api.auth.login.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.login.$post>;

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login["$post"]({ json });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return mutation;
};
