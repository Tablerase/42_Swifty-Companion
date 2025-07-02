import { User42Details } from "@/types/user";
import { createContext, ReactNode, useState } from "react";

interface UserContextProps {
  loginToSearch: string | null;
  setLoginToSearch: (login: string) => void;
  user: User42Details | null;
  setUser: (user: User42Details | null) => void;
  isUserLoading: boolean;
  setIsUserLoading: (status: boolean) => void;
  userNotFound: boolean;
  setUserNotFound: (status: boolean) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loginToSearch, setLoginToSearch] = useState<string | null>(null);
  const [user, setUser] = useState<User42Details | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  return (
    <UserContext
      value={{
        loginToSearch,
        setLoginToSearch,
        user,
        setUser,
        isUserLoading,
        setIsUserLoading,
        userNotFound,
        setUserNotFound,
      }}
    >
      {children}
    </UserContext>
  );
};
