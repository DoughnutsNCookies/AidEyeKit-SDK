import AidEyeSDK from "@aideyekit-dev/sdk";

const aidEyeSDK = new AidEyeSDK("apiKey");

const aidEyeKit = aidEyeSDK.chat();

const question = "How to swtich to Solana Testnet with the Phantom Wallet App?";
const response = aidEyeKit.ask(question);

aidEyeKit.guide(response);
