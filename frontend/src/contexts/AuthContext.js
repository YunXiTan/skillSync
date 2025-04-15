"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Hardcoded user types
const MOCK_USERS = {
  company1: {
    id: "company1",
    name: "Tech Corp",
    type: "COMPANY",
    email: "tech@corp.com",
  },
  student1: {
    id: "677e97d7aa24659ff6ed625f",
    name: "John Doe",
    type: "STUDENT",
    email: "john@student.com",
  },
};

export function AuthProvider({ children }) {
  // Default to company user for now
  const [user, setUser] = useState(MOCK_USERS.student1);

  const switchUser = (userType) => {
    setUser(MOCK_USERS[userType]);
  };

  const isCompany = user?.type === "COMPANY";
  const isStudent = user?.type === "STUDENT";

  return (
    <AuthContext.Provider
      value={{
        user,
        switchUser,
        isCompany,
        isStudent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
