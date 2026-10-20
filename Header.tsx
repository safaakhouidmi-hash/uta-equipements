import { Button } from "@/components/ui/button";
import { Wrench, Home, PlusCircle, Search, LayoutDashboard, Phone, UserCog, User } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import type { Screen } from "@/App";
import { cn } from "@/lib/utils";

interface Props {
  t: Dict;
  lang: Lang;
  screen: Screen;
  role: "customer" | "employee";
  onLang: (l: Lang) => void;
  onNavigate: (s: Screen) => void;
  onRole: (r: "customer" | "employee") => void;
}

const langs: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "ع" },
];

export function Header({ t, lang, screen, role, onLang, onNavigate, onRole }: Props) {
  const navItems: { key: Screen; label: string; icon: typeof Home }[] = [
    { key: "home", label: t.nav.home, icon: Home },
    { key: "new", label: t.nav.new, icon: PlusCircle },
    { key: "track", label: t.nav.track, icon: Search },
    { key: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { key: "contact", label: t.nav.contact, icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-red-900/40 bg-black/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-3 text-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-900/40">
            <Wrench className="h-5 w-5 text-white" />
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-white">{t.appName}</span>
            <span className="block text-xs text-neutral-400">{t.tagline}</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-neutral-800 bg-neutral-900 p-0.5 sm:flex">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => onLang(l.code)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-semibold transition",
                  lang === l.code ? "bg-red-600 text-white" : "text-neutral-400 hover:text-white"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRole(role === "customer" ? "employee" : "customer")}
            className="border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 hover:text-white"
          >
            {role === "customer" ? <User className="h-4 w-4" /> : <UserCog className="h-4 w-4" />}
            <span className="hidden sm:inline">{role === "customer" ? t.role.customer : t.role.employee}</span>
          </Button>
        </div>
      </div>

      <div className="border-t border-neutral-900 bg-neutral-950/80">
        <nav className="mx-auto flex w-full max-w-5xl items-center gap-1 overflow-x-auto px-2 py-2 sm:px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = screen === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-red-600 text-white shadow-md shadow-red-900/40"
                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
          <div className="ms-auto flex items-center gap-1 sm:hidden">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => onLang(l.code)}
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-semibold",
                  lang === l.code ? "bg-red-600 text-white" : "text-neutral-400"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}