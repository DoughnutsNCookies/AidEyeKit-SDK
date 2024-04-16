import {
  Breadcrumb as BSBreadcrumb,
  BreadcrumbItem,
  Button,
} from "react-bootstrap";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Breadcrumb() {
  const guide = async () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: "Welcome!",
            description: "This will be a tour of this dashboard!",
          },
        },
        {
          element: "#sidebar",
          popover: {
            title: "Sidebar",
            description:
              "This is a sidebar navigation menu providing access to different sections and UI components.",
          },
        },
        {
          element: "#row",
          popover: {
            title: "Category Information",
            description:
              "This section provides an overview of key metrics through tile visualizations.",
          },
        },
        {
          element: "#graph",
          popover: {
            title: "Traffic",
            description:
              "This section displays a line graph showing the traffic trends over a period. Additionally, there are filter options to view the data by day, month, or year timeframes.",
          },
        },
        {
          element: "#socials",
          popover: {
            title: "Social Media Performance",
            description:
              "This section displays metrics related to social media presence across platforms and provides an overview of the organization's reach and engagement on major social networks.",
          },
        },
        {
          element: "#tns",
          popover: {
            title: "Traffic & Sales",
            description:
              "This section displays traffic and sales metrics. It provides a comprehensive overview of key business performance indicators.",
          },
        },
      ],
    });
    driverObj.drive();
  };

  return (
    <div className="d-flex flex-row justify-content-between">
      <BSBreadcrumb listProps={{ className: "mb-0 align-items-center" }}>
        <BreadcrumbItem
          linkProps={{ className: "text-decoration-none" }}
          href="/"
        >
          Home
        </BreadcrumbItem>
        <BreadcrumbItem
          linkProps={{ className: "text-decoration-none" }}
          href="/"
        >
          Library
        </BreadcrumbItem>
        <BreadcrumbItem active>Data</BreadcrumbItem>
      </BSBreadcrumb>
      <Button onClick={guide} className="">
        Guide Me
      </Button>
    </div>
  );
}
