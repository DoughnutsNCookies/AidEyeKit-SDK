import AidEyeSDK from "@aideyekit-dev/sdk";

const aidEyeSDK = new AidEyeSDK("apiKey");

const aidEyeKit = aidEyeSDK.chat();

const question = "What is your name?";
const response = aidEyeKit.ask(question);

aidEyeKit.guide(response);
