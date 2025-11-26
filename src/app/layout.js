import "./globals.css";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";

export const metadata = {
  title: "flAIt - Your AI Travel Manager on WhatsApp",
  description: "Live flight updates, check-in reminders, gate changes, delays, and smart travel assistance — all inside WhatsApp.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg">
        <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
      </body>
    </html>
  );
}
