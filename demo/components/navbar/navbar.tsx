import { Button, Input, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { SupportIcon } from "../icons/navbar/support-icon";
import { SearchIcon } from "../icons/searchicon";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";
import { aideye } from "aideyekit";
import "aideyekit/dist/aideye.css";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const guide = () => {
    const aidEyeObj = aideye({
      showProgress: true,
      steps: [
        {
          popover: {
            title: "Welcome!",
            description:
              "This guide will help you to get started with the dashboard.",
          },
        },
        {
          element: "#balance",
          popover: {
            title: "Balance",
            description:
              "Here you can see the available balance and some statistics.",
          },
        },
        {
          element: "#chart",
          popover: {
            title: "Statistics",
            description: "This is a chart with some statistics.",
          },
        },
        {
          element: "#section",
          popover: {
            title: "Section",
            description: "Here you can see the agents and latest transactions.",
          },
        },
        {
          element: "#users",
          popover: {
            title: "Latest Users",
            description:
              "Here you can see the latest users and their accounts.",
          },
        },
      ],
    });

    aidEyeObj.start();
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <NotificationsDropdown />

          <div className="max-md:hidden">
            <SupportIcon />
          </div>
          <Button
            onClick={guide}
            color="primary"
            className="flex items-center gap-2"
          >
            Guide Me
          </Button>

          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
