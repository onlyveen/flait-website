import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Terms of Service - Flait",
  description:
    "Terms of Service for flAIt - Your AI Travel Manager on WhatsApp",
};

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), "src", "content", "terms.md");
  const content = await fs.readFile(filePath, "utf8");

  return (
    <>
      <Navbar />
      <div className="max-w-3xl py-40 mx-auto px-7">
        <h2 className="font-excon font-bold h2 text-primary mb-4 max-md:text-center">
          Terms of Service
        </h2>
        <p className="mb-10 text-text/80 max-md:text-center">
          <strong>Last Updated:</strong> January 2025
        </p>
        <div className="px-8 pt-2 pb-10 bg-white rounded-4xl">
          <article className="prose prose-lg max-w-none prose-headings:font-excon prose-headings:text-primary prose-p:font-satoshi prose-p:text-text prose-a:text-primary prose-strong:text-primary prose-ul:font-satoshi prose-li:text-text">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
}
