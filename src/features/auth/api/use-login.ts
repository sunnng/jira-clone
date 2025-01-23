import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

const $post = client.api.auth.login.$post;

type RequestType = InferRequestType<typeof $post>;
type ResponseType = InferResponseType<typeof $post>;

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.auth.login["$post"](json);
      return await response.json();
    },
  });

  return mutation;
};
