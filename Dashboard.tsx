import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Loader, CheckCircle2, Inbox, ChevronRight } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import type { ServiceRequest, Status } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Props {
  t: Dict;
  lang: Lang;
  requests: ServiceRequest[];
  onUpdate: (id: string, status: Status) => void;
  onNote: (id: string, author: string, text: string) => void;
}

const statuses: Status[] = ["pending", "progress", "done"];
const statusMeta: Record<Status, { icon: typeof Clock; cls: string; btn: string }> = {
  pending: { icon: Clock, cls: "border-amber-700 bg-amber-950/60 text-amber-300", btn: "bg-amber-600 hover:bg-amber-700" },
  progress: { icon: Loader, cls: "border-red-700 bg-red-950/60 text-red-300", btn: "bg-red-600 hover:bg-red-700" },
  done: { icon: CheckCircle2, cls: "border-emerald-700 bg-emerald-950/60 text-emerald-300", btn: "bg-emerald-600 hover:bg-emerald-700" },
};

export function Dashboard({ t, requests, onUpdate }: Props) {
  const [filter, setFilter] = useState<Status | "all">("all");

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    progress: requests.filter((r) => r.status === "progress").length,
    done: requests.filter((r) => r.status === "done").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t.dashboard.title}</h1>
        <p className="text-sm text-neutral-400">{t.dashboard.subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", ...statuses] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
              filter === f
                ? "border-red-600 bg-red-600 text-white"
                : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
            )}
          >
            {f === "all" ? t.dashboard.all : t.track.status[f]}
            <span className="ms-2 rounded bg-black/30 px-1.5 text-xs">{counts[f]}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="border-neutral-800 bg-neutral-900">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-neutral-400">
            <Inbox className="h-12 w-12 text-neutral-600" />
            <p>{t.dashboard.empty}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const meta = statusMeta[r.status];
            const Icon = meta.icon;
            return (
              <Card key={r.id} className="border-neutral-800 bg-neutral-900 shadow-sm">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{r.ref}</span>
                      <span className="text-sm font-semibold text-white">{t.form.types[r.type]}</span>
                      <Badge variant="outline" className={cn("gap-1", meta.cls)}>
                        <Icon className="h-3 w-3" />
                        {t.track.status[r.status]}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-neutral-300">
                      {r.name} — {r.equipment}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{r.description}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {statuses.map((s) => {
                      const SIcon = statusMeta[s].icon;
                      const active = r.status === s;
                      return (
                        <Button
                          key={s}
                          size="sm"
                          variant={active ? "default" : "outline"}
                          disabled={active}
                          onClick={() => onUpdate(r.id, s)}
                          className={cn(
                            active
                              ? `${statusMeta[s].btn} text-white`
                              : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:bg-neutral-800 hover:text-white"
                          )}
                        >
                          <SIcon className="h-3.5 w-3.5" />
                          {t.track.status[s]}
                        </Button>
                      );
                    })}
                    <ChevronRight className="hidden h-4 w-4 text-neutral-600 sm:block rtl:rotate-180" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}