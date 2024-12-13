"use client";
import React, { ReactNode, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { setSession } from "@/redux/features/auth/authSlice";
import { UserType } from "@/types";

export default function ApolloClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return; 

    const storedSession = JSON.parse(localStorage.getItem("session") || "{}");

    if (storedSession?.access_token) {
      if (!session?.access_token) {
        dispatch(setSession(storedSession));
      }
    } else {
      router.push("/login");
    }
  }, [router, dispatch, session?.access_token]);

  const Dispatch = useDispatch();
  const httpLink = createHttpLink({
    uri: "https://server.soundmade.com/"
  });

  const errorLink = onError(({ graphQLErrors, forward, operation }) => {
    if (!graphQLErrors) return;

    const error = graphQLErrors[0];
    const errorMessage = error?.message || "";

    if (errorMessage.includes("ACCESS_TOKEN")) {
      const accessToken = errorMessage.split(" ")[1];

      const updatedSession = {
        ...session,
        access_token: accessToken,
        refresh_token: session?.refresh_token || "",
        user: session?.user || {} as UserType
      };
      Dispatch(setSession(updatedSession));
      localStorage.setItem("session", JSON.stringify(updatedSession));

      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`
        }
      }));

      return forward(operation);
    }
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: session?.access_token
          ? `Bearer ${session.access_token}`
          : ""
      }
    };
  });

  const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache()
  });


  return (
    <ApolloProvider client={client}>
      <>{children}</>
    </ApolloProvider>
  );
}
