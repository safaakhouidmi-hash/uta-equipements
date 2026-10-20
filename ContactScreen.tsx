import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Clock, MapPin, Wrench, Cog, ClipboardCheck, Headphones } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";

interface Props {
  t: Dict;
  lang: Lang;
}

const departments = [
  { key: "sales" as const, icon: Headphones, phone: "+216 71 100 200", email: "sales@uta-equipements.tn" },
  { key: "service" as const, icon: Wrench, phone: "+216 71 100 201", email: "service@uta-equipements.tn" },
  { key: "parts" as const, icon: Cog, phone: "+216 71 100 202", email: "parts@uta-equipements.tn" },
  { key: "inspection" as const, icon: ClipboardCheck, phone: "+216 71 100 203", email: "inspection@uta-equipements.tn" },
];

export function ContactScreen({ t }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white sm:text-3xl">{t.contact.title}</h1>
        <p className="text-sm text-neutral-400">{t.contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {departments.map((d) => {
          const Icon = d.icon;
          return (
            <Card key={d.key} className="border-neutral-800 bg-neutral-900 shadow-sm transition hover:border-red-700">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-md shadow-red-950/40">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div className="font-semibold text-white">{t.contact[d.key]}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" className="bg-red-600 text-white hover:bg-red-700">
                    <a href={`tel:${d.phone.replace(/\s/g, "")}`}>
                      <Phone className="h-4 w-4" />
                      {t.contact.call}
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="border-neutral-700 bg-neutral-950 text-neutral-200 hover:bg-neutral-800 hover:text-white">
                    <a href={`mailto:${d.email}`}>
                      <Mail className="h-4 w-4" />
                      {t.contact.email}
                    </a>
                  </Button>
                </div>
                <div className="text-xs text-neutral-400">{d.phone} · {d.email}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-neutral-800 bg-neutral-900">
        <CardContent className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 text-red-500" />
            <div>
              <div className="text-sm font-semibold text-white">{t.contact.hours}</div>
              <div className="text-sm text-neutral-400">{t.contact.hoursValue}</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
            <div>
              <div className="text-sm font-semibold text-white">{t.contact.address}</div>
              <div className="text-sm text-neutral-400">{t.contact.addressValue}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}