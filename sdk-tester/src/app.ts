import AidEyeSDK from "@aideyechat-dev/sdk";

const aidEyeSDK = new AidEyeSDK("apiKey");

const aidEyeChat = aidEyeSDK.chat();

const question = "What is your name?";
const response = aidEyeChat.ask(question);

aidEyeChat.guide(response);
