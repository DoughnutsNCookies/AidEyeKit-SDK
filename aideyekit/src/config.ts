import { AidEyeStep } from "./aideye";
import { AllowedButtons, PopoverDOM } from "./popover";
import { State } from "./state";

export type AidEyeHook = (
  element: Element | undefined,
  step: AidEyeStep,
  opts: { config: Config; state: State }
) => void;

export type Config = {
  steps?: AidEyeStep[];

  animate?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  smoothScroll?: boolean;
  allowClose?: boolean;
  stagePadding?: number;
  stageRadius?: number;

  disableActiveInteraction?: boolean;

  allowKeyboardControl?: boolean;

  // Popover specific configuration
  popoverClass?: string;
  popoverOffset?: number;
  showButtons?: AllowedButtons[];
  disableButtons?: AllowedButtons[];
  showProgress?: boolean;

  // Button texts
  progressText?: string;
  nextBtnText?: string;
  prevBtnText?: string;
  doneBtnText?: string;

  // Called after the popover is rendered
  onPopoverRender?: (
    popover: PopoverDOM,
    opts: { config: Config; state: State }
  ) => void;

  // State based callbacks, called upon state changes
  onHighlightStarted?: AidEyeHook;
  onHighlighted?: AidEyeHook;
  onDeselected?: AidEyeHook;
  onDestroyStarted?: AidEyeHook;
  onDestroyed?: AidEyeHook;

  // Event based callbacks, called upon events
  onNextClick?: AidEyeHook;
  onPrevClick?: AidEyeHook;
  onCloseClick?: AidEyeHook;
};

let currentConfig: Config = {};

export function configure(config: Config = {}) {
  currentConfig = {
    animate: true,
    allowClose: true,
    overlayOpacity: 0.7,
    smoothScroll: false,
    disableActiveInteraction: false,
    showProgress: false,
    stagePadding: 10,
    stageRadius: 5,
    popoverOffset: 10,
    showButtons: ["next", "previous", "close"],
    disableButtons: [],
    overlayColor: "#000",
    ...config,
  };
}

export function getConfig(): Config;
export function getConfig<K extends keyof Config>(key: K): Config[K];
export function getConfig<K extends keyof Config>(key?: K) {
  return key ? currentConfig[key] : currentConfig;
}
