import { useState } from "react";
import { Text } from "./text";


export function Provider({ children }) {
    const user_storage = localStorage.getItem("user");
    const token_storage = localStorage.getItem("token");
    const delivery_storage = localStorage.getItem("delivery");
    const cart_storage = localStorage.getItem("cartNumber");

    const [user, setUser] = useState(user_storage ? JSON.parse(user_storage) : null);
    const [token, setToken] = useState(token_storage ? JSON.parse(token_storage) : null);
    const [CartNumber, setCartNumber] = useState(JSON.parse(cart_storage)||null);
    const [DeliveryNumber, setDeliveryNumber] = useState(delivery_storage? JSON.parse(delivery_storage):null);
    return (
        <Text.Provider value={{ user, setUser, token, setToken, CartNumber, setCartNumber,DeliveryNumber,setDeliveryNumber }}>
            {children}
        </Text.Provider>
    );
}
