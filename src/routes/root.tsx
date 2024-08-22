import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <p>Navbar here...</p>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}