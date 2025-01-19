import Navigation from "./Navigation.tsx";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";

function RootLayout() {
    const userFullName = "John Doe";
    const userRole = "Admin";

    return (
        <div className="flex h-screen">
            <Navigation />

            <div className="flex-1 flex flex-col ml-0 md:ml-80">
                <Header userFullName={userFullName} userRole={userRole} />
                <main className="flex-1 pt-20 p-4 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default RootLayout;
