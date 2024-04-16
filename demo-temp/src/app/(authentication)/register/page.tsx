"use client";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import Register from "@/app/(authentication)/register/register";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Page() {
  const guide = async () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: "Welcome!",
            description: "Let me walk you through the registration process!",
          },
        },
        {
          element: "#user",
          popover: {
            title: "Username",
            description: "Enter your username here.",
          },
        },
        {
          element: "#email",
          popover: {
            title: "Email",
            description:
              "Enter the email address given to you by your organization for registration.",
          },
        },
        {
          element: "#password",
          popover: {
            title: "Password",
            description:
              "Create a strong password for your account. Make sure it is at least 8 characters long and includes a mix of letters, numbers, and symbols.",
          },
        },
        {
          element: "#submit",
          popover: {
            title: "Submit",
            description:
              "Once you have filled in all the fields, click here to submit your registration.",
          },
        },
      ],
    });
    driverObj.drive();
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Card className="mb-4 rounded-0">
          <CardBody className="p-4">
            <div className="d-flex flex-row justify-content-between">
              <h1>Register</h1>
              <Button onClick={guide}>Help</Button>
            </div>
            <p className="text-black-50">Create your account</p>
            <Register />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
