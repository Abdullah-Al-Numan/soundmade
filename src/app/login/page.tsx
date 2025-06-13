"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/gql";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import { GraphQLResponseError, SessionType } from "@/types";
import Button from "@/components/button";
import ErrorMessage from "@/components/errorMessage";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [login] = useMutation(LOGIN_MUTATION);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSelector((state: RootState) => state.auth.session);

  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (session || storedSession) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const email = target.email.value;
      const password = target.password.value;
      const response = await login({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
      const session = response?.data?.login as SessionType;
      dispatch(setSession(session));
      localStorage.setItem("session", JSON.stringify(session));
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      const graphQLError = (error as GraphQLResponseError)?.graphQLErrors?.[0]?.message;
      setErrorMessage(graphQLError || "Login failed, please try again.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto rounded-full h-40 w-auto"
          width={224}
          height={224}
          src={"/soundmade.png"}
          alt="soundmade"
        />
        <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0 text-gray-800">
            Sign in to your admin account
          </p>
        </div>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-regularAccent sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-regularAccent sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <ErrorMessage errorMessage={errorMessage} />
            <Button
              customClass="w-full"
              type="submit"
              title="Sign In"
              loadingTitle="Signing in..."
              loading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
