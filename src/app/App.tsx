import { UserContextProvider } from "../context";
import { AppRoutes } from "./AppRoutes";

export function App() {
    return (
        <UserContextProvider>
            <AppRoutes/>
        </UserContextProvider>
    );
}