import LinksDropdown from "./LinksDropdown";
import ThemeToggle from "./ThemeToggle";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex bg-muted h-16 items-center justify-between px-8">
      <LinksDropdown />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
