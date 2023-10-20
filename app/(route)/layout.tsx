import { Button } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <Link href="/front/1/order">
          <Button variant="outlined">前台</Button>
        </Link>

        <Link href="/back/order">
          <Button variant="outlined">後台</Button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
