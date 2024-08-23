import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="py-6 px-4 sm:px-8 max-w-6xl mx-auto">
        <Image src={Logo} alt="Logo" />
      </header>
      <section className="max-w-6xl px-4 sm:px-8 h-screen -mt-20 mx-auto grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose mt-4 max-w-md">
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="LandingImg" className="hidden lg:block" />
      </section>
    </main>
  );
}
