import { useState } from "react";
import { Text } from "./text";


export function Provider({ children }) {
    const user_storage = localStorage.getItem("user");
    const token_storage = localStorage.getItem("token");
    const [user, setUser] = useState(user_storage ? JSON.parse(user_storage) : null);
    const [token, setToken] = useState(token_storage ? JSON.parse(token_storage) : null);
    return (
        <Text.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </Text.Provider>
    );
}