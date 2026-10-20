import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wrench,
  Cog,
  Car,
  ClipboardCheck,
  HardHat,
  Headphones,
  ArrowRight,
  Clock,
  Loader,
  CheckCircle2,
  Activity,
} from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import type { Screen } from "@/App";
import type { ServiceRequest, RequestType } from "@/lib/store";

interface Props {
  t: Dict;
  lang: Lang;
  onNavigate: (s: Screen) => void;
  requests: ServiceRequest[];
}

const serviceMeta: { type: RequestType; icon: typeof Wrench; accent: string }[] = [
  { type: "maintenance", icon: Wrench, accent: "bg-red-600" },
  { type: "parts", icon: Cog, accent: "bg-red-700" },
  { type: "garage", icon: Car, accent: "bg-red-600" },
  { type: "inspection", icon: ClipboardCheck, accent: "bg-red-700" },
  { type: "install", icon: HardHat, accent: "bg-red-600" },
  { type: "support", icon: Headphones, accent: "bg-red-700" },
];

export function HomeScreen({ t, onNavigate, requests }: Props) {
  const pending = requests.filter((r) => r.status === "pending").length;
  const progress = requests.filter((r) => r.status === "progress").length;
  const done = requests.filter((r) => r.status === "done").length;

  const stats = [
    { label: t.stats.total, value: requests.length, icon: Activity, color: "text-white" },
    { label: t.stats.pending, value: pending, icon: Clock, color: "text-amber-400" },
    { label: t.stats.progress, value: progress, icon: Loader, color: "text-red-400" },
    { label: t.stats.done, value: done, icon: CheckCircle2, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-red-900/40 bg-gradient-to-br from-red-700 via-red-800 to-black p-6 shadow-xl shadow-red-950/40 sm:p-10">
        <div className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-100">
            <span className="h-2 w-2 rounded-full bg-red-400" /> UTA Équipements
          </span>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
            {t.hero.title}
          </h1>
          <p className="mt-3 text-sm text-red-100/90 sm:text-base">{t.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("new")}
              className="bg-white text-red-800 hover:bg-red-50"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate("track")}
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              {t.hero.cta2}
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-neutral-800 bg-neutral-900 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800">
                  <Icon className={`h-5 w-5 ${s.color}`} />
                </span>
                <div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-neutral-400">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-serif text-2xl font-bold text-white">{t.services.title}</h2>
          <p className="text-sm text-neutral-400">{t.services.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceMeta.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.type}
                onClick={() => onNavigate("new")}
                className="group text-start"
              >
                <Card className="h-full border-neutral-800 bg-neutral-900 transition hover:border-red-700 hover:bg-neutral-800/80 hover:shadow-lg hover:shadow-red-950/30">
                  <CardContent className="flex items-start gap-4 p-5">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.accent} shadow-md shadow-red-950/40`}>
                      <Icon className="h-6 w-6 text-white" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{t.form.types[s.type]}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-red-400 opacity-0 transition group-hover:opacity-100">
                        {t.hero.cta} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}