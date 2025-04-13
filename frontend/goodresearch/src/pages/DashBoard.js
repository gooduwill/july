import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Footer from "./Footer";
/**
 * DashBoard - User dashboard component
 *
 * This component serves as the landing view after a user successfully logs in.
 * It displays a welcoming message and motivational text aimed at encouraging users
 * in their journey toward academic collaboration or admissions.
 *
 * Features:
 * - Static welcome and motivational messages.
 * - Includes the `Footer` component for consistent layout and branding across the app.
 *
 * Intended as a starting point for users to navigate further into the application features.
 */

export default function DashBoard() {


    return (
        <div>
            <h2>DashBoard page</h2>
            <h4>Welcome</h4>
            <h5>You're one step closer to your dream Professor!</h5>
            <Footer />
        </div>
    )
}