import { Header, Footer, ChatWidget } from "@/components/common";
import { HeroSection } from "@/app/pages";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}