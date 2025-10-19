// Node-ish globals for browser (some libs expect them)
import { Buffer } from "buffer";
declare global { interface Window { Buffer: any; global: any; } }
if (!(window as any).global) (window as any).global = window;
if (!(window as any).Buffer) (window as any).Buffer = Buffer;
