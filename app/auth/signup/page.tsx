"use client";
import React from "react";
import {
  Input,
  Button,
  Checkbox,
  Link,
  Form,
  Image,
  addToast,
} from "@heroui/react";
import { MailIcon, LockIcon, Camera, User, Contact } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { handleFileChange } from "@/app/utils/image-file-handler";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addUser } from "@/features/users/user-thunk";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.users);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<{
    error: boolean;
    message: string;
  } | null>(null);
  const router = useRouter();

  async function handleSIgnUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("role", "guest");

      // const { data, error: signUpError } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });

      // if (signUpError) {
      //   setMessage({ error: true, message: signUpError.message });
      //   return;
      // }

      // if (data.user) {
      //   formData.append("id", data.user?.id);
      //   await dispatch(addUser(formData));
      //   setMessage({
      //     error: false,
      //     message: "Account registered successfully!",
      //   });
      //   router.push("/auth");
      // }
    } catch (e) {
      addToast({
        title: "Error",
        description: "Unknown Error!",
        color: "danger",
      });
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 p-4 bg-primary dark:bg-primary-700">
      <div className="p-8 max-w-md w-full bg-white dark:bg-gray-800 rounded shadow space-y-4">
        <div>Sign Up</div>
        <Form onSubmit={handleSIgnUp} className="mt-4 flex flex-col gap-4">
          <div className="flex gap-2 w-full justify-center">
            <label
              htmlFor="image-upload"
              className="w-40 h-40 rounded-full border-2 border-gray-400 flex justify-center items-center bg-gray-50"
            >
              {preview ? (
                <Image src={preview} radius="full" />
              ) : (
                <Camera size={28} />
              )}
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={(e) => setPreview(handleFileChange(e))}
            />
          </div>
          {message && (
            <p className={message.error ? "text-warning" : "text-success"}>
              {message.message}
            </p>
          )}

          <Input
            radius="sm"
            isRequired
            color="primary"
            startContent={
              <User className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            name="full_name"
            label="Fullname"
            labelPlacement="outside"
            placeholder="Enter your fullname"
            variant="bordered"
          />
          <Input
            radius="sm"
            isRequired
            color="primary"
            startContent={
              <Contact className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            name="phone"
            label="Contact no."
            labelPlacement="outside"
            placeholder="Enter your active phone number"
            variant="bordered"
          />
          <Input
            radius="sm"
            isRequired
            color="primary"
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            variant="bordered"
          />
          <Input
            radius="sm"
            isRequired
            color="primary"
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />

          <Button
            type="submit"
            color="primary"
            radius="sm"
            fullWidth
            isLoading={isLoading}
          >
            Sign up
          </Button>
          <div className="flex gap-2">
            Already have an account?
            <Link color="primary" href="/auth" size="sm">
              Log in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
