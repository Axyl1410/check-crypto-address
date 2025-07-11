"use client";

import { cn, formatAddress } from "@/lib/utils";
import { TokenIcon } from "@web3icons/react";
import { ReactNode } from "react";
import { CopyButton } from "../common/copy-button";
import { Card, CardContent } from "../ui/card";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../ui/footer";
import { ModeToggle } from "../ui/mode-toggle";
import { Separator } from "../ui/separator";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({
  logo = (
    <div className="h-6 w-6">
      <img src="/icon-logo.png" alt="" className="h-6 w-6" />
    </div>
  ),
  name = "Axyl",
  columns = [
    {
      title: "Team",
      links: [{ text: "About", href: "https://nguyentruonggiang.id.vn/" }],
    },
    {
      title: "Contact",
      links: [{ text: "Github", href: "https://github.com/Axyl1410" }],
    },
  ],
  copyright = "© 2025 Alexsandr Senaviev. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "#" },
    { text: "Terms of Service", href: "#" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="container mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                {logo}
                <h3 className="text-xl font-bold">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="pt-1 text-sm font-semibold uppercase">
                  {column.title}
                </h3>
                {column.links.map((link, linkIndex) => (
                  <p key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-muted-foreground text-sm"
                    >
                      {link.text}
                    </a>
                  </p>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <Separator className="mt-8" />
          <div className="my-4 flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase">Support Us</h3>
            <Card className="hover:bg-muted !py-2 transition-colors">
              <CardContent className="!px-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <TokenIcon
                      symbol={"eth"}
                      variant="branded"
                      size="24"
                      allowReorder="yes"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Ethereum</p>
                      <p className="text-muted-foreground hidden text-xs sm:block">
                        0x2349Db8bdf85bd80bFc4afb715a69fb4C6463B96
                      </p>
                      <p className="text-muted-foreground text-xs sm:hidden">
                        {formatAddress(
                          "0x2349Db8bdf85bd80bFc4afb715a69fb4C6463B96",
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <CopyButton
                      textToCopy="0x2349Db8bdf85bd80bFc4afb715a69fb4C6463B96"
                      successMessage={{}}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <FooterBottom>
            <div>{copyright}</div>
            <div className="flex items-center gap-4">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href}>
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
