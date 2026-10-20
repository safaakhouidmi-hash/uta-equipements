import { useState, useEffect, useCallback } from "react";

export type Status = "pending" | "progress" | "done";
export type Priority = "low" | "normal" | "high" | "urgent";
export type RequestType = "maintenance" | "parts" | "garage" | "inspection" | "install" | "support";

export interface Note {
  id: string;
  author: string;
  text: string;
  at: number;
}

export interface ServiceRequest {
  id: string;
  ref: string;
  type: RequestType;
  name: string;
  company: string;
  phone: string;
  email: string;
  equipment: string;
  serial: string;
  priority: Priority;
  description: string;
  photo?: string;
  status: Status;
  createdAt: number;
  notes: Note[];
}

const KEY = "equipcare.requests.v1";

function seed(): ServiceRequest[] {
  const now = Date.now();
  return [
    {
      id: "seed-1",
      ref: "EQ-2401",
      type: "maintenance",
      name: "Karim Ben Salah",
      company: "Auto Pro Tunis",
      phone: "+216 71 000 111",
      email: "karim@autopro.tn",
      equipment: "Pont élévateur 4T",
      serial: "PL-4T-88213",
      priority: "high",
      description: "Fuite hydraulique au niveau du vérin principal.",
      status: "progress",
      createdAt: now - 1000 * 60 * 60 * 30,
      notes: [{ id: "n1", author: "Service", text: "Technicien assigné, visite prévue demain.", at: now - 1000 * 60 * 60 * 20 }],
    },
    {
      id: "seed-2",
      ref: "EQ-2402",
      type: "inspection",
      name: "Sonia Trabelsi",
      company: "Contrôle Rapide",
      phone: "+216 71 222 333",
      email: "sonia@ctrlrapide.tn",
      equipment: "Banc de freinage",
      serial: "BF-2024-119",
      priority: "normal",
      description: "Calibration annuelle requise.",
      status: "pending",
      createdAt: now - 1000 * 60 * 60 * 6,
      notes: [],
    },
    {
      id: "seed-3",
      ref: "EQ-2403",
      type: "parts",
      name: "Mehdi Gharbi",
      company: "Garage Central",
      phone: "+216 71 444 555",
      email: "mehdi@garagecentral.tn",
      equipment: "Compresseur 500L",
      serial: "CP-500-0042",
      priority: "urgent",
      description: "Besoin d'un filtre à air de rechange.",
      status: "done",
      createdAt: now - 1000 * 60 * 60 * 72,
      notes: [{ id: "n2", author: "Pièces", text: "Filtre livré et installé.", at: now - 1000 * 60 * 60 * 48 }],
    },
  ];
}

function load(): ServiceRequest[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw) as ServiceRequest[];
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

let counter = 2404;

export function useStore() {
  const [requests, setRequests] = useState<ServiceRequest[]>(() => load());

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(requests));
    } catch {
      /* ignore */
    }
  }, [requests]);

  const addRequest = useCallback((data: Omit<ServiceRequest, "id" | "ref" | "status" | "createdAt" | "notes">) => {
    const id = `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const ref = `EQ-${counter++}`;
    const req: ServiceRequest = { ...data, id, ref, status: "pending", createdAt: Date.now(), notes: [] };
    setRequests((prev) => [req, ...prev]);
    return req;
  }, []);

  const updateStatus = useCallback((id: string, status: Status) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }, []);

  const addNote = useCallback((id: string, author: string, text: string) => {
    if (!text.trim()) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, notes: [...r.notes, { id: `n-${Date.now()}`, author, text: text.trim(), at: Date.now() }] }
          : r
      )
    );
  }, []);

  return { requests, addRequest, updateStatus, addNote };
}