"use client";
import { Button, Image, Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { aideye } from "aideyekit";
import "aideyekit/dist/aideye.css";

export default function AidEyeKit() {
  const [isOpen, setIsOpen] = useState(true);
  const boxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const guide = () => {
    const aidEyeObj = aideye({
      showProgress: true,
      steps: [
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

  const status = () => {
    const aidEyeObj = aideye();
    aidEyeObj.highlight({
      element: "#users",
      popover: {
        title: "User Information",
        description: "You can find the status of your user with this table.",
      },
    });
  };

  const settings = () => {
    const aidEyeObj = aideye();
    aidEyeObj.highlight({
      element: "#settings",
      popover: {
        title: "Changing Theme",
        description: "You can switch to your prefered theme in the settings.",
        side: "top",
      },
    });
  };

  useEffect(() => {
    if (!boxRef.current) return;
    const box = boxRef.current;
    if (isOpen) {
      setTimeout(() => {
        box.style.display = "flex";
      }, 50);
    } else {
      setTimeout(() => {
        box.style.display = "none";
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {}, [messages]);

  return (
    <div className="fixed bottom-20 right-20 flex flex-col items-end gap-2">
      <div
        className={`w-[400px] h-[50vh] p-2 flex flex-col items-end justify-end border-2 bg-white border-primary rounded-xl transition-all ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        ref={boxRef}
      >
        {messages.map((message, index) => (
          <p
            key={index}
            className="bg-primary text-end text-white p-2 mb-1 rounded-lg"
          >
            {message}
          </p>
        ))}
        <div className={`${messages.length === 0 ? "block" : "hidden"}`}>
          <p className="w-full mb-1 text-center">Common FAQs:</p>
          <Button
            fullWidth
            className="mb-1"
            color="secondary"
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              status();
            }}
          >
            Where can I find the status of a user?
          </Button>
          <Button
            fullWidth
            className="mb-1"
            color="secondary"
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              settings();
            }}
          >
            How do I switch the theme?
          </Button>
        </div>
        <Input
          type="text"
          variant="bordered"
          color="primary"
          className="relative bottom-0"
          endContent={
            <Button
              size="sm"
              color="primary"
              variant="solid"
              onClick={() => {
                setMessages([...messages, message]);
                setMessage("");
              }}
            >
              {"Ask"}
            </Button>
          }
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          isClearable
          value={message}
          label="Ask me anything..."
        />
      </div>
      <Button
        size="lg"
        startContent={
          <Image
            src="https://aideyekit.com/brand/logo.svg"
            alt="AidEyeKit Logo"
            sizes="200px"
          />
        }
        className="bg-transparent"
        isIconOnly
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
