"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MessagesSquare, MousePointer2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ContactMethod = {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  linkText: string;
};

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: "Email",
    description: "Send us an email",
    link: "mailto:email@example.com",
    linkText: "email@example.com",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Available for calls from 9 AM to 5 PM",
    link: "tel:+1234567890",
    linkText: "(123) 456-7890",
  },
  {
    icon: MessagesSquare,
    title: "Live Chat",
    description: "Chat with us for immediate assistance",
    link: "#",
    linkText: "www.example.com/chat",
  },
];

type Location = {
  top: string;
  left: string;
};

const locations: Location[] = [
  { top: "26%", left: "57%" },
  { top: "45%", left: "76%" },
  { top: "64%", left: "42%" },
  { top: "23%", left: "32%" },
];

const popoverLocation = {
  top: "83%",
  left: "99%",
  title: "Sydney Office",
  address: "120 Darling Harbour, NSW 2000",
};

const LocationDot = () => (
  <div className="relative size-[38px]">
    <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
    <div className="absolute inset-2 animate-ping rounded-full bg-primary/10 delay-75" />
    <div className="absolute inset-4 rounded-full bg-primary" />
  </div>
);

const FlagIconAu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="21"
    height="15"
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H21V15H0V0Z"
      fill="#00008B"
    />
    <path
      d="M0 7.5L10.5 0V7.5H21V15L10.5 7.5V15H0V7.5Z"
      fill="url(#paint0_linear_14_219)"
    />
    <path
      d="M10.0541 3.25055L9.61051 4.5424H8.22639L9.3175 5.34149L8.87389 6.63333L10.0541 5.89436L11.2343 6.63333L10.7907 5.34149L11.8818 4.5424H10.4977L10.0541 3.25055Z"
      fill="white"
    />
    <path
      d="M15.4807 3.51813L15.3025 4.04875H14.7337L15.1764 4.38263L15.0223 4.91325L15.4807 4.60713L15.9392 4.91325L15.7851 4.38263L16.2278 4.04875H15.6589L15.4807 3.51813Z"
      fill="white"
    />
    <path
      d="M13.6234 5.92212L13.3482 6.745H12.4834L13.1492 7.2625L12.8739 8.08537L13.6234 7.62562L14.3729 8.08537L14.0976 7.2625L14.7634 6.745H13.8986L13.6234 5.92212Z"
      fill="white"
    />
    <path
      d="M17.1643 6.71188L16.9427 7.359H16.2256L16.7447 7.78112L16.5231 8.42825L17.1643 8.05837L17.8055 8.42825L17.5839 7.78112L18.103 7.359H17.3859L17.1643 6.71188Z"
      fill="white"
    />
    <path
      d="M15.4807 9.87563L15.3025 10.4063H14.7337L15.1764 10.7401L15.0223 11.2707L15.4807 10.9646L15.9392 11.2707L15.7851 10.7401L16.2278 10.4063H15.6589L15.4807 9.87563Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_14_219"
        x1="10.5"
        y1="0"
        x2="10.5"
        y2="15"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F0F0F0" />
      </linearGradient>
    </defs>
  </svg>
);

const WorldMapSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 1217 577"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-muted-foreground"
    {...props}
  >
    <path
      d="M759.577 348.889L764.12 349.889L769.117 348.421L768.121 343.91L762.628 342.923L757.59 344.877L759.577 348.889Z"
      fill="currentColor"
    />
    {/* ... many more path elements for the map ... */}
  </svg>
);

export const Contact5ProMarketingBlock = () => {
  return (
    <section className="w-full bg-background py-12 lg:py-20">
      <div className="container mx-auto flex flex-col items-center gap-9 px-4 md:px-6">
        <div className="flex flex-col items-center gap-3 text-center lg:hidden">
          <p className="font-medium text-primary">Contact us</p>
          <h2 className="text-3xl font-semibold tracking-tighter">
            Let's Connect
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Have questions about Acme AI? Our team is here to help you get the
            answers you need.
          </p>
        </div>
        <div className="hidden text-center lg:block">
          <h2 className="text-5xl font-semibold tracking-tighter">
            Our locations
          </h2>
        </div>

        <div className="relative w-full max-w-6xl">
          <WorldMapSvg className="h-auto w-full" />
          {locations.map((loc, index) => (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: loc.top, left: loc.left }}
            >
              <LocationDot />
            </div>
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: popoverLocation.top, left: popoverLocation.left }}
              >
                <LocationDot />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <FlagIconAu />
                <p className="font-medium">{popoverLocation.title}</p>
                <p className="text-xs text-muted-foreground">
                  {popoverLocation.address}
                </p>
              </div>
            </PopoverContent>
          </Popover>
          <div
            className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{
              top: `calc(${popoverLocation.top} + 12px)`,
              left: `calc(${popoverLocation.left} + 12px)`,
            }}
          >
            <MousePointer2 className="size-6 -rotate-12 fill-background stroke-foreground" />
          </div>
        </div>

        <div className="flex w-full max-w-4xl flex-col items-stretch gap-12 pt-8 lg:flex-row lg:gap-9">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-4 text-center"
            >
              <method.icon className="size-6" />
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{method.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
              <Link
                href={method.link}
                className="text-sm font-medium text-primary hover:underline"
              >
                {method.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact5ProMarketingBlock;
