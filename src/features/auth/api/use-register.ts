import { toast } from "sonner";
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
      const res = await client.api.auth.register["$post"](json);

      if (!res.ok) {
        throw new Error("注册失败");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("注册成功");
      router.refresh();
    },
    onError: (error) => {
      toast.error("注册失败：" + error.message);
    },
  });

  return mutation;
};
