import type { Metadata } from "next";
import { PdfSigner } from "@/components/pdf-signer/pdf-signer";

// An office tool, not a patient-facing page: keep it out of search results.
export const metadata: Metadata = {
  title: "Sign a PDF",
  robots: { index: false, follow: false },
};

export default function SignPdfPage() {
  return <PdfSigner />;
}
