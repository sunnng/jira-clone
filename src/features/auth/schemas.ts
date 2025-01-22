import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(1, "请输入密码"),
});
