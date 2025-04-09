import type { ReactNode } from "react";
import { Toaster } from 'sonner'
import { StoreProvider } from "./StoreProvider";
import './global.css';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section>
            <Toaster />
            <main>{children}</main>
            <footer className="">
            </footer>
            <div className="flex flex-col min-h-screen justify-between">
              <footer className="text-black py-4 flex justify-center items-center">
                <span>Made with ❤ by Vasco for CareExpand </span>
              </footer>
            </div>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
