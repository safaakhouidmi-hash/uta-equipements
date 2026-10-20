export type Lang = "fr" | "en" | "ar";

export interface Dict {
  appName: string;
  tagline: string;
  nav: { home: string; new: string; track: string; dashboard: string; contact: string };
  role: { customer: string; employee: string };
  hero: { title: string; subtitle: string; cta: string; cta2: string };
  services: { title: string; subtitle: string };
  stats: { total: string; pending: string; progress: string; done: string };
  form: {
    title: string;
    subtitle: string;
    type: string;
    types: { maintenance: string; parts: string; garage: string; inspection: string; install: string; support: string };
    name: string;
    company: string;
    phone: string;
    email: string;
    equipment: string;
    serial: string;
    priority: string;
    priorities: { low: string; normal: string; high: string; urgent: string };
    description: string;
    photo: string;
    photoHint: string;
    submit: string;
    required: string;
    success: string;
  };
  track: {
    title: string;
    subtitle: string;
    empty: string;
    search: string;
    status: { pending: string; progress: string; done: string };
    ref: string;
    notes: string;
    addNote: string;
    notePlaceholder: string;
    created: string;
    equipment: string;
    customer: string;
    noNotes: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    filter: string;
    all: string;
    update: string;
    empty: string;
    details: string;
    close: string;
  };
  contact: {
    title: string;
    subtitle: string;
    sales: string;
    service: string;
    parts: string;
    inspection: string;
    call: string;
    email: string;
    hours: string;
    hoursValue: string;
    address: string;
    addressValue: string;
  };
  footer: string;
}

export const translations: Record<Lang, Dict> = {
  fr: {
    appName: "EquipCare",
    tagline: "UTA Équipements — Service & Support",
    nav: { home: "Accueil", new: "Nouvelle demande", track: "Suivi", dashboard: "Tableau de bord", contact: "Contact" },
    role: { customer: "Client", employee: "Employé" },
    hero: {
      title: "Votre partenaire équipement, toujours disponible.",
      subtitle: "Demandes de maintenance, pièces de rechange, installation et support technique — suivis en temps réel.",
      cta: "Créer une demande",
      cta2: "Suivre mes demandes",
    },
    services: { title: "Nos services", subtitle: "Sélectionnez un service pour démarrer votre demande." },
    stats: { total: "Total", pending: "En attente", progress: "En cours", done: "Terminées" },
    form: {
      title: "Nouvelle demande",
      subtitle: "Remplissez les détails de votre équipement et de votre besoin.",
      type: "Type de demande",
      types: {
        maintenance: "Maintenance",
        parts: "Pièces de rechange",
        garage: "Équipement de garage",
        inspection: "Contrôle technique",
        install: "Installation",
        support: "Support technique",
      },
      name: "Nom complet",
      company: "Société",
      phone: "Téléphone",
      email: "Email",
      equipment: "Équipement",
      serial: "Numéro de série",
      priority: "Priorité",
      priorities: { low: "Basse", normal: "Normale", high: "Haute", urgent: "Urgente" },
      description: "Description du problème",
      photo: "Photo (optionnel)",
      photoHint: "Ajoutez une photo de l'équipement ou du problème.",
      submit: "Envoyer la demande",
      required: "Veuillez remplir tous les champs obligatoires.",
      success: "Demande envoyée avec succès.",
    },
    track: {
      title: "Suivi des demandes",
      subtitle: "Consultez l'état de vos demandes en temps réel.",
      empty: "Aucune demande pour le moment.",
      search: "Rechercher par référence, nom ou équipement...",
      status: { pending: "En attente", progress: "En cours", done: "Terminée" },
      ref: "Réf",
      notes: "Notes",
      addNote: "Ajouter",
      notePlaceholder: "Ajouter une note...",
      created: "Créée le",
      equipment: "Équipement",
      customer: "Client",
      noNotes: "Aucune note.",
    },
    dashboard: {
      title: "Tableau de bord employé",
      subtitle: "Gérez et mettez à jour les demandes clients.",
      filter: "Filtrer",
      all: "Toutes",
      update: "Mettre à jour",
      empty: "Aucune demande à afficher.",
      details: "Détails",
      close: "Fermer",
    },
    contact: {
      title: "Contact direct",
      subtitle: "Contactez le service concerné.",
      sales: "Commercial",
      service: "Service après-vente",
      parts: "Pièces de rechange",
      inspection: "Contrôle technique",
      call: "Appeler",
      email: "Email",
      hours: "Horaires",
      hoursValue: "Lun – Ven : 08:00 – 18:00",
      address: "Adresse",
      addressValue: "Zone Industrielle, Tunis, Tunisie",
    },
    footer: "© 2025 UTA Équipements — EquipCare. Tous droits réservés.",
  },
  en: {
    appName: "EquipCare",
    tagline: "UTA Equipment — Service & Support",
    nav: { home: "Home", new: "New request", track: "Tracking", dashboard: "Dashboard", contact: "Contact" },
    role: { customer: "Customer", employee: "Employee" },
    hero: {
      title: "Your equipment partner, always available.",
      subtitle: "Maintenance requests, spare parts, installation and technical support — tracked in real time.",
      cta: "Create a request",
      cta2: "Track my requests",
    },
    services: { title: "Our services", subtitle: "Select a service to start your request." },
    stats: { total: "Total", pending: "Pending", progress: "In progress", done: "Completed" },
    form: {
      title: "New request",
      subtitle: "Fill in your equipment and request details.",
      type: "Request type",
      types: {
        maintenance: "Maintenance",
        parts: "Spare parts",
        garage: "Garage equipment",
        inspection: "Technical inspection",
        install: "Installation",
        support: "Technical support",
      },
      name: "Full name",
      company: "Company",
      phone: "Phone",
      email: "Email",
      equipment: "Equipment",
      serial: "Serial number",
      priority: "Priority",
      priorities: { low: "Low", normal: "Normal", high: "High", urgent: "Urgent" },
      description: "Problem description",
      photo: "Photo (optional)",
      photoHint: "Attach a photo of the equipment or issue.",
      submit: "Submit request",
      required: "Please fill in all required fields.",
      success: "Request submitted successfully.",
    },
    track: {
      title: "Request tracking",
      subtitle: "Check the status of your requests in real time.",
      empty: "No requests yet.",
      search: "Search by reference, name or equipment...",
      status: { pending: "Pending", progress: "In progress", done: "Completed" },
      ref: "Ref",
      notes: "Notes",
      addNote: "Add",
      notePlaceholder: "Add a note...",
      created: "Created",
      equipment: "Equipment",
      customer: "Customer",
      noNotes: "No notes.",
    },
    dashboard: {
      title: "Employee dashboard",
      subtitle: "Manage and update customer requests.",
      filter: "Filter",
      all: "All",
      update: "Update",
      empty: "No requests to display.",
      details: "Details",
      close: "Close",
    },
    contact: {
      title: "Direct contact",
      subtitle: "Reach the relevant department.",
      sales: "Sales",
      service: "After-sales service",
      parts: "Spare parts",
      inspection: "Technical inspection",
      call: "Call",
      email: "Email",
      hours: "Hours",
      hoursValue: "Mon – Fri: 08:00 – 18:00",
      address: "Address",
      addressValue: "Industrial Zone, Tunis, Tunisia",
    },
    footer: "© 2025 UTA Equipment — EquipCare. All rights reserved.",
  },
  ar: {
    appName: "EquipCare",
    tagline: "UTA للمعدات — الخدمة والدعم",
    nav: { home: "الرئيسية", new: "طلب جديد", track: "المتابعة", dashboard: "لوحة التحكم", contact: "اتصل بنا" },
    role: { customer: "عميل", employee: "موظف" },
    hero: {
      title: "شريكك في المعدات، دائماً في خدمتك.",
      subtitle: "طلبات الصيانة، قطع الغيار، التركيب والدعم الفني — مع متابعة فورية.",
      cta: "إنشاء طلب",
      cta2: "متابعة طلباتي",
    },
    services: { title: "خدماتنا", subtitle: "اختر خدمة لبدء طلبك." },
    stats: { total: "الإجمالي", pending: "قيد الانتظار", progress: "قيد التنفيذ", done: "مكتملة" },
    form: {
      title: "طلب جديد",
      subtitle: "املأ تفاصيل المعدات والطلب.",
      type: "نوع الطلب",
      types: {
        maintenance: "الصيانة",
        parts: "قطع الغيار",
        garage: "معدات المرآب",
        inspection: "الفحص الفني",
        install: "التركيب",
        support: "الدعم الفني",
      },
      name: "الاسم الكامل",
      company: "الشركة",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      equipment: "المعدات",
      serial: "الرقم التسلسلي",
      priority: "الأولوية",
      priorities: { low: "منخفضة", normal: "عادية", high: "عالية", urgent: "عاجلة" },
      description: "وصف المشكلة",
      photo: "صورة (اختياري)",
      photoHint: "أضف صورة للمعدات أو المشكلة.",
      submit: "إرسال الطلب",
      required: "يرجى ملء جميع الحقول المطلوبة.",
      success: "تم إرسال الطلب بنجاح.",
    },
    track: {
      title: "متابعة الطلبات",
      subtitle: "تحقق من حالة طلباتك في الوقت الفعلي.",
      empty: "لا توجد طلبات بعد.",
      search: "ابحث بالمرجع أو الاسم أو المعدات...",
      status: { pending: "قيد الانتظار", progress: "قيد التنفيذ", done: "مكتملة" },
      ref: "المرجع",
      notes: "ملاحظات",
      addNote: "إضافة",
      notePlaceholder: "أضف ملاحظة...",
      created: "تاريخ الإنشاء",
      equipment: "المعدات",
      customer: "العميل",
      noNotes: "لا توجد ملاحظات.",
    },
    dashboard: {
      title: "لوحة تحكم الموظف",
      subtitle: "إدارة وتحديث طلبات العملاء.",
      filter: "تصفية",
      all: "الكل",
      update: "تحديث",
      empty: "لا توجد طلبات للعرض.",
      details: "التفاصيل",
      close: "إغلاق",
    },
    contact: {
      title: "اتصال مباشر",
      subtitle: "تواصل مع القسم المختص.",
      sales: "المبيعات",
      service: "خدمة ما بعد البيع",
      parts: "قطع الغيار",
      inspection: "الفحص الفني",
      call: "اتصال",
      email: "البريد",
      hours: "ساعات العمل",
      hoursValue: "الإثنين – الجمعة: 08:00 – 18:00",
      address: "العنوان",
      addressValue: "المنطقة الصناعية، تونس",
    },
    footer: "© 2025 UTA للمعدات — EquipCare. جميع الحقوق محفوظة.",
  },
};