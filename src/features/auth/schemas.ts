import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(1, "请输入密码"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "请输入用户名"),
  email: z.string().email("请输入正确的邮箱"),
  password: z.string().min(8, "密码长度至少8位"),
});
