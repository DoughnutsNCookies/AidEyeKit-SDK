import { StageDefinition } from "./overlay";
import { PopoverDOM } from "./popover";
import { AidEyeStep } from "./aideye";

export type State = {
  isInitialized?: boolean;

  activeIndex?: number;
  activeElement?: Element;
  activeStep?: AidEyeStep;
  previousElement?: Element;
  previousStep?: AidEyeStep;

  popover?: PopoverDOM;

  // actual values considering the animation
  // and delays. These are used to determine
  // the positions etc.
  __previousElement?: Element;
  __activeElement?: Element;
  __previousStep?: AidEyeStep;
  __activeStep?: AidEyeStep;

  __activeOnDestroyed?: Element;
  __resizeTimeout?: number;
  __transitionCallback?: () => void;
  __activeStagePosition?: StageDefinition;
  __overlaySvg?: SVGSVGElement;
};

let currentState: State = {};

export function setState<K extends keyof State>(key: K, value: State[K]) {
  currentState[key] = value;
}

export function getState(): State;
export function getState<K extends keyof State>(key: K): State[K];
export function getState<K extends keyof State>(key?: K) {
  return key ? currentState[key] : currentState;
}

export function resetState() {
  currentState = {};
}
