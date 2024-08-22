import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {Link} from "react-router-dom";

type NavbarProps = {
    navBar: Navbar
}

export function Navbar() {
    return (
        <>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref to={"/docs"}>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}