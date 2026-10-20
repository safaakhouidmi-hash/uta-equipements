import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/HomeScreen";
import { RequestForm } from "@/components/RequestForm";
import { TrackingScreen } from "@/components/TrackingScreen";
import { Dashboard } from "@/components/Dashboard";
import { ContactScreen } from "@/components/ContactScreen";
import { useStore } from "@/lib/store";
import { translations, type Lang } from "@/lib/i18n";

export type Screen = "home" | "new" | "track" | "dashboard" | "contact";

export default function App() {
  const [lang, setLang] = useState<Lang>("fr");
  const [screen, setScreen] = useState<Screen>("home");
  const [role, setRole] = useState<"customer" | "employee">("customer");
  const { requests, addRequest, updateStatus, addNote } = useStore();

  const t = translations[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  const content = useMemo(() => {
    switch (screen) {
      case "new":
        return <RequestForm t={t} lang={lang} onSubmit={addRequest} onDone={() => setScreen("track")} />;
      case "track":
        return <TrackingScreen t={t} lang={lang} requests={requests} onNote={addNote} />;
      case "dashboard":
        return <Dashboard t={t} lang={lang} requests={requests} onUpdate={updateStatus} onNote={addNote} />;
      case "contact":
        return <ContactScreen t={t} lang={lang} />;
      default:
        return <HomeScreen t={t} lang={lang} onNavigate={setScreen} requests={requests} />;
    }
  }, [screen, t, lang, requests, addRequest, updateStatus, addNote]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header
        t={t}
        lang={lang}
        screen={screen}
        role={role}
        onLang={setLang}
        onNavigate={setScreen}
        onRole={setRole}
      />
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6 sm:px-6">{content}</main>
      <footer className="border-t border-neutral-800 bg-black py-6 text-center text-xs text-neutral-500">
        {t.footer}
      </footer>
    </div>
  );
}