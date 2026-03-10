import * as React from "react";
import type { SVGProps } from "react";
const Cursor = (props: SVGProps<SVGSVGElement>) => <svg height="1em" style={{
    flex: "none",
    lineHeight: 1
}} viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}><title>{"Cursor"}</title><path d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z" opacity={0.6} /><path d="M22.35 18V6L11.925 0v12l10.425 6z" opacity={0.4} /><path d="M11.925 0L1.5 6v12l10.425-6V0z" opacity={0.5} /><path d="M22.35 6L11.925 24V12L22.35 6z" opacity={0.7} /><path d="M22.35 6l-10.425 6L1.5 6h20.85z" opacity={0.8} /></svg>;
export default Cursor;