'use client';

import React, { createContext, useContext } from "react";

type User = {
    id: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
} | null;

const UserContext = createContext<User>(null);

export function UserProvider({ value, children }: { value: User, children: React.ReactNode }) {
    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext);
}