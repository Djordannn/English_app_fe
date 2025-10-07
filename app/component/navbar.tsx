import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div>
      <nav className="my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarImage
                src="https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg"
                alt="Brand logo"
              />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">Hi Henry</h2>
            </div>
          </div>
          <div>
            <a href="#">
              <Menu />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
