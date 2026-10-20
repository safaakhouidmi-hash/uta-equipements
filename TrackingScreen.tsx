import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Loader, CheckCircle2, Search, MessageSquarePlus, Package } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import type { ServiceRequest, Status } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Props {
  t: Dict;
  lang: Lang;
  requests: ServiceRequest[];
  onNote: (id: string, author: string, text: string) => void;
}

const statusMeta: Record<Status, { icon: typeof Clock; cls: string }> = {
  pending: { icon: Clock, cls: "border-amber-700 bg-amber-950/60 text-amber-300" },
  progress: { icon: Loader, cls: "border-red-700 bg-red-950/60 text-red-300" },
  done: { icon: CheckCircle2, cls: "border-emerald-700 bg-emerald-950/60 text-emerald-300" },
};

export function TrackingScreen({ t, requests, onNote }: Props) {
  const [query, setQuery] = useState("");
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});

  const filtered = requests.filter((r) => {
    const q = query.toLowerCase();
    return (
      r.ref.toLowerCase().includes(q) ||
      r.name.toLowerCase().includes(q) ||
      r.equipment.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t.track.title}</h1>
        <p className="text-sm text-neutral-400">{t.track.subtitle}</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.track.search}
          className="border-neutral-800 bg-neutral-900 ps-9 text-white"
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="border-neutral-800 bg-neutral-900">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-neutral-400">
            <Package className="h-12 w-12 text-neutral-600" />
            <p>{t.track.empty}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => {
            const meta = statusMeta[r.status];
            const Icon = meta.icon;
            return (
              <Card key={r.id} className="border-neutral-800 bg-neutral-900 shadow-sm">
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white">{r.ref}</span>
                        <span className="text-sm font-semibold text-white">{t.form.types[r.type]}</span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        {t.track.created}: {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <Badge variant="outline" className={cn("gap-1", meta.cls)}>
                      <Icon className="h-3 w-3" />
                      {t.track.status[r.status]}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div>
                      <span className="text-neutral-500">{t.track.customer}: </span>
                      <span className="text-neutral-200">{r.name}{r.company ? ` — ${r.company}` : ""}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500">{t.track.equipment}: </span>
                      <span className="text-neutral-200">{r.equipment}{r.serial ? ` (${r.serial})` : ""}</span>
                    </div>
                  </div>

                  <p className="rounded-lg bg-neutral-950 p-3 text-sm text-neutral-300">{r.description}</p>

                  {r.photo && (
                    <img src={r.photo} alt="request" className="h-40 w-full rounded-lg border border-neutral-800 object-cover sm:w-64" />
                  )}

                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{t.track.notes}</div>
                    {r.notes.length === 0 ? (
                      <p className="text-xs text-neutral-600">{t.track.noNotes}</p>
                    ) : (
                      <ul className="space-y-1.5">
                        {r.notes.map((n) => (
                          <li key={n.id} className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs">
                            <span className="font-semibold text-red-400">{n.author}</span>
                            <span className="text-neutral-500"> · {new Date(n.at).toLocaleString()}</span>
                            <p className="mt-0.5 text-neutral-300">{n.text}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex gap-2">
                      <Input
                        value={noteDraft[r.id] ?? ""}
                        onChange={(e) => setNoteDraft((p) => ({ ...p, [r.id]: e.target.value }))}
                        placeholder={t.track.notePlaceholder}
                        className="border-neutral-800 bg-neutral-950 text-white"
                      />
                      <Button
                        size="sm"
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => {
                          onNote(r.id, r.name, noteDraft[r.id] ?? "");
                          setNoteDraft((p) => ({ ...p, [r.id]: "" }));
                        }}
                      >
                        <MessageSquarePlus className="h-4 w-4" />
                        {t.track.addNote}
                      </Button>
                    </div>
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