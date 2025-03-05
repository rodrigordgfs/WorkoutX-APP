declare module "use-react-screenshot" {
  import { MutableRefObject } from "react";

  export function useScreenshot<T extends HTMLElement>(
    ref?: MutableRefObject<T>
  ): [(node: T) => Promise<string | null>, any];
}
