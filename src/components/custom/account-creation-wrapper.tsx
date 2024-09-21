import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { createUser } from "~/server/userData";

export default function AccountCreationWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuth();
  useEffect(() => {
    createUser().catch((error) => console.log(error));

    console.log("RAN");
  }, [user]);
  return <>{children}</>;
}
