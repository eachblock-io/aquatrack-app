import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import notification from "@/public/icons/Notification.png";
import Image from "next/image";

export function Notification({ data }: any) {
  console.log(data);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src={notification}
          alt="notification"
          layout="notification"
          width="30"
          height="30"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
      </SheetContent>
    </Sheet>
  );
}
