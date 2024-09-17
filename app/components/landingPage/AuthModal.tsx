import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/public/logo.png";
import Image from "next/image";
import GooleLogo from "@/public/google.svg";
import GitHubLogo from "@/public/github.svg";
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/app/lib/auth";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex-row justify-center items-center gap-x-2">
          <Image src={Logo} className="size-10" alt="Logo" />
          <h4 className="text-3xl font-semibold">
            Cal<span className="text-primary">Marshal</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-5">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button variant="outline">
              <Image
                src={GooleLogo}
                className="size-4 mr-2"
                alt="Google Logo"
              />
              Sign in with Google
            </Button>
          </form>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button variant="outline" className="w-full">
              <Image
                src={GitHubLogo}
                className="size-4 mr-2 dark:invert"
                alt="GitHub Logo"
              />
              Sign in with GitHub
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
