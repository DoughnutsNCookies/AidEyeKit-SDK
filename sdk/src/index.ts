import { Base } from "./base";
import { Posts } from "./posts";
import { applyMixins } from "./utils";

class AidEyeSDK extends Base {}
interface AidEyeSDK extends Posts {}

applyMixins(AidEyeSDK, [Posts]);

export default AidEyeSDK;
