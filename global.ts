// global.ts
import { TextDecoder, TextEncoder } from "text-encoding";

declare global {
  interface Window {
    TextDecoder: typeof TextDecoder;
    TextEncoder: typeof TextEncoder;
  }
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as any;
  global.TextEncoder = TextEncoder as any;
}
