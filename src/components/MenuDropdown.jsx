import * as React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutBtn from "./Header/LogoutBtn";
import { useSelector } from "react-redux";
import { Drawer, IconButton } from "@mui/material";
import { MenuIcon } from "lucide-react";

export default function NavbarLinks({ iconEnabled = true }) {
    const userData = useSelector((state) => state.auth?.userData || []);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    console.log("userData", userData);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const navLinks = (
        <div className="flex flex-col p-4 space-y-4 w-64 bg-gray-800 h-full text-white">
            <Link
                to="/dashboard"
                className="hover:underline"
                onClick={() => setDrawerOpen(false)}
            >
                Dashboard
            </Link>

            <Link
                to="/tickets"
                className="hover:underline"
                onClick={() => setDrawerOpen(false)}
            >
                View Tickets
            </Link>

            {userData?.userType !== "ENGINEER" && (
                <Link
                    to="/create-ticket"
                    className="hover:underline"
                    onClick={() => setDrawerOpen(false)}
                >
                    Add Ticket
                </Link>
            )}
            <Link
                to="/change-password"
                className="hover:underline"
                onClick={() => setDrawerOpen(false)}
            >
                Change Password
            </Link>
            <div onClick={() => setDrawerOpen(false)}>
                <LogoutBtn />
            </div>
        </div>
    );

    return (
        <>
            <div className="hidden md:flex items-center space-x-4 ">
                {iconEnabled && (
                    <>
                        <Link
                            to="/dashboard"
                            className="text-white hover:underline"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/tickets"
                            className="text-white hover:underline"
                        >
                            View Tickets
                        </Link>
                        {userData?.userType !== "ENGINEER" && (
                            <Link
                                to="/create-ticket"
                                className="text-white hover:underline"
                            >
                                Add Ticket
                            </Link>
                        )}
                        <Link
                            to="/change-password"
                            className="text-white hover:underline"
                        >
                            Change Password
                        </Link>
                        <LogoutBtn />
                    </>
                )}
            </div>
            {/* Small Screen Drawer */}
            <div className="md:hidden">
                <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon style={{ color: "white" }} />
                </IconButton>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {navLinks}
                </Drawer>
            </div>
        </>
    );
}
