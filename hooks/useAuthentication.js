import { View, Text } from "react-native";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const useAuthentication = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribeFromAuthStatusChange = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            }
        );

        return unsubscribeFromAuthStatusChange;
    }, []);

    return { user };
};

export default useAuthentication;
