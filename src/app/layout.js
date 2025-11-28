import "./globals.css";
import SmoothCursor from "@/components/SmoothCursor";

export const metadata = {
  title: "Flait - Your AI Travel Manager on WhatsApp",
  description: "Live flight updates, check-in reminders, gate changes, delays, and smart travel assistance — all inside WhatsApp.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-bg">
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
