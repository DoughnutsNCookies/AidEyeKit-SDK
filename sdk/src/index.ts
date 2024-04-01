import { Base } from "./base";
import { Chat } from "./chat";
import { applyMixins } from "./utils";

class AidEyeSDK extends Base {}
interface AidEyeSDK extends Chat {}

applyMixins(AidEyeSDK, [Chat]);

export default AidEyeSDK;
