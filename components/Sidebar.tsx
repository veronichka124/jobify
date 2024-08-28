"use client";
import Logo from "../assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import links from "@/utils/links";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-muted h-full px-8 py-4">
      <Image src={Logo} alt="Logo" />
      <div className="flex flex-col mt-20 gap-y-4">
        {links.map((link) => (
          <Button
            asChild
            key={link.href}
            variant={pathname === link.href ? "default" : "link"}
          >
            <Link href={link.href}>
              {link.icon}
              <span className="px-2">{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
