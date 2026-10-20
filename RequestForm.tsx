import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Send, CheckCircle2, X } from "lucide-react";
import type { Dict, Lang } from "@/lib/i18n";
import type { ServiceRequest, RequestType, Priority } from "@/lib/store";

interface Props {
  t: Dict;
  lang: Lang;
  onSubmit: (data: Omit<ServiceRequest, "id" | "ref" | "status" | "createdAt" | "notes">) => ServiceRequest;
  onDone: () => void;
}

const types: RequestType[] = ["maintenance", "parts", "garage", "inspection", "install", "support"];
const priorities: Priority[] = ["low", "normal", "high", "urgent"];

export function RequestForm({ t, onSubmit, onDone }: Props) {
  const [type, setType] = useState<RequestType>("maintenance");
  const [priority, setPriority] = useState<Priority>("normal");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [equipment, setEquipment] = useState("");
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<string | undefined>();
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : undefined);
    reader.readAsDataURL(file);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !equipment || !description) {
      setError(t.form.required);
      return;
    }
    setError("");
    onSubmit({ type, name, company, phone, email, equipment, serial, priority, description, photo });
    setDone(true);
    setTimeout(onDone, 900);
  }

  if (done) {
    return (
      <Card className="border-emerald-800 bg-neutral-900">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-400" />
          <p className="text-lg font-semibold text-white">{t.form.success}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-neutral-800 bg-neutral-900 shadow-xl">
      <CardHeader className="border-b border-neutral-800">
        <CardTitle className="font-serif text-2xl text-white">{t.form.title}</CardTitle>
        <CardDescription className="text-neutral-400">{t.form.subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.type}</Label>
              <Select value={type} onValueChange={(v) => setType(v as RequestType)}>
                <SelectTrigger className="border-neutral-700 bg-neutral-950 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-neutral-700 bg-neutral-900 text-white">
                  {types.map((tp) => (
                    <SelectItem key={tp} value={tp}>
                      {t.form.types[tp]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.priority}</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="border-neutral-700 bg-neutral-950 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-neutral-700 bg-neutral-900 text-white">
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {t.form.priorities[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.name} *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.company}</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.phone} *</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.email}</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.equipment} *</Label>
              <Input value={equipment} onChange={(e) => setEquipment(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-300">{t.form.serial}</Label>
              <Input value={serial} onChange={(e) => setSerial(e.target.value)} className="border-neutral-700 bg-neutral-950 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">{t.form.description} *</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="border-neutral-700 bg-neutral-950 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-300">{t.form.photo}</Label>
            {photo ? (
              <div className="relative inline-block">
                <img src={photo} alt="preview" className="h-32 w-32 rounded-xl border border-neutral-700 object-cover" />
                <button
                  type="button"
                  onClick={() => setPhoto(undefined)}
                  className="absolute -end-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-700 bg-neutral-950 py-8 text-neutral-400 transition hover:border-red-700 hover:text-red-400">
                <ImagePlus className="h-6 w-6" />
                <span className="text-xs">{t.form.photoHint}</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </label>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-sm text-red-300">{error}</div>
          )}

          <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
            <Send className="h-4 w-4" />
            {t.form.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}