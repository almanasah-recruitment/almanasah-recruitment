import {
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  Headphones,
  Home,
  PlaneLanding,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  UsersRound
} from "lucide-react";

export const serviceRequests = [
  { label: "طلب استقدام", href: "/request/recruitment" },
  { label: "طلب نقل خدمات", href: "/request/transfer" },
  { label: "طلب تأجير", href: "/request/rental" }
];

export const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/services", dropdown: serviceRequests },
  { label: "عن الاستقدام", href: "/recruitment-info" },
  { label: "دول الاستقدام", href: "/countries" },
  { label: "الأسئلة الشائعة", href: "/faq" },
  { label: "تواصل معنا", href: "/contact" }
];

export const heroSlides = [
  {
    image: "/office-slide-1.jpeg",
    eyebrow: "شركة المنصة للاستقدام",
    title: "حلول استقدام متكاملة للأسر السعودية",
    body: "نقدم تجربة واضحة من إصدار التأشيرة واختيار السيرة الذاتية حتى إنشاء العقد عبر مساند ووصول العمالة."
  }
];

export const stats = [
  { value: "10+", label: "أعوام خبرة" },
  { value: "6", label: "دول استقدام" },
  { value: "24/7", label: "دعم ومتابعة" },
  { value: "24", label: "ضمان وتأمين" }
];

export const features = [
  {
    icon: Headphones,
    title: "خدمة عملاء راقية",
    body: "فريق متخصص يرافقك في كل خطوة ويجيبك بسرعة ووضوح."
  },
  {
    icon: ShieldCheck,
    title: "مرخصون وموثوقون",
    body: "إجراءات منظمة ومتوافقة مع متطلبات الجهات الرسمية ومنصة مساند."
  },
  {
    icon: BadgeCheck,
    title: "اختيار دقيق",
    body: "نرشح السير الذاتية الأنسب حسب احتياج الأسرة والخبرة المطلوبة."
  },
  {
    icon: Clock3,
    title: "متابعة مستمرة",
    body: "إشعارات ومتابعة من بداية الطلب حتى الوصول والاستلام."
  }
];

export const services = [
  {
    icon: Home,
    title: "استقدام العمالة المنزلية",
    body: "خدمة متكاملة لاختيار العمالة وتوثيق الطلب ومتابعة الوصول.",
    href: "/request/recruitment"
  },
  {
    icon: RefreshCw,
    title: "نقل الخدمات",
    body: "إدارة طلبات نقل الخدمات بسلاسة مع توضيح المتطلبات والخطوات.",
    href: "/request/transfer"
  },
  {
    icon: UsersRound,
    title: "التأجير الشهري",
    body: "حلول مرنة للأسر التي تحتاج دعما شهريا منظما وموثوقا.",
    href: "/request/rental"
  },
  {
    icon: Headphones,
    title: "الدعم والمتابعة",
    body: "قنوات تواصل واضحة ومتابعة دقيقة لحالة الطلبات والاستفسارات.",
    href: "/contact"
  },
  {
    icon: SearchCheck,
    title: "اختيار السير الذاتية",
    body: "عرض ملفات مرشحة بعناية تساعدك على اتخاذ قرار مطمئن.",
    href: "/request/recruitment"
  }
];

export const steps = [
  {
    icon: FileCheck2,
    title: "تحديد الاحتياج",
    body: "نستمع لمتطلباتك ونقترح المسار الأنسب للاستقدام أو نقل الخدمات."
  },
  {
    icon: SearchCheck,
    title: "اختيار السيرة",
    body: "نساعدك في مقارنة الخبرات والمهارات والاختيار بثقة."
  },
  {
    icon: ClipboardCheck,
    title: "توثيق الطلب",
    body: "تجهيز المتطلبات وتوثيق الإجراءات عبر القنوات الرسمية."
  },
  {
    icon: PlaneLanding,
    title: "الوصول والمتابعة",
    body: "تنسيق الاستقبال والتسليم ثم متابعة ما بعد الوصول."
  }
];

export const recruitmentSteps = [
  {
    title: "إصدار التأشيرة",
    body: "نبدأ بالتأكد من جاهزية التأشيرة والمتطلبات الأساسية قبل فتح الطلب."
  },
  {
    title: "إنهاء الإجراءات",
    body: "يتم ترتيب المستندات والتنسيق مع الجهات ذات العلاقة وفق المسار الرسمي."
  },
  {
    title: "اختيار السيرة الذاتية",
    body: "نعرض السير المناسبة حسب الجنسية، الخبرة، العمر، واحتياج الأسرة."
  },
  {
    title: "إنشاء العقد عبر مساند",
    body: "بعد اعتماد الاختيار، يتم إنشاء العقد عبر منصة مساند وتوضيح الالتزامات والمدة المتوقعة."
  },
  {
    title: "وصول العمالة",
    body: "نتابع الوصول والاستقبال والتسليم، ثم نواصل الدعم بعد إتمام الخدمة."
  }
];

export const recruitmentRequirements = [
  {
    icon: FileText,
    title: "المستندات المطلوبة",
    items: ["الهوية / الإقامة سارية المفعول", "التأشيرة", "الرقم المسجل في أبشر"]
  },
  {
    icon: ClipboardCheck,
    title: "إجراءات الاستقدام",
    items: ["إصدار التأشيرة", "اختيار السيرة الذاتية", "إنشاء العقد عبر مساند", "بدء الإجراءات", "وصول العمالة"]
  }
];

export const policyDocuments = [
  { title: "حقوق وواجبات صاحب العمل", href: "/docs/employer-rights.pdf" },
  { title: "حقوق وواجبات العمالة المنزلية", href: "/docs/worker-rights.pdf" }
];

export const countries = [
  {
    name: "الفلبين",
    en: "Philippines",
    duration: "45 يوم",
    flag: "https://flagcdn.com/w640/ph.png"
  },
  {
    name: "إثيوبيا",
    en: "Ethiopia",
    duration: "30 يوم",
    flag: "https://flagcdn.com/w640/et.png"
  },
  {
    name: "أوغندا",
    en: "Uganda",
    duration: "35 يوم",
    flag: "https://flagcdn.com/w640/ug.png"
  },
  {
    name: "كينيا",
    en: "Kenya",
    duration: "30 يوم",
    flag: "https://flagcdn.com/w640/ke.png"
  },
  {
    name: "بنغلاديش",
    en: "Bangladesh",
    duration: "40 يوم",
    flag: "https://flagcdn.com/w640/bd.png"
  },
  {
    name: "تنزانيا",
    en: "Tanzania",
    duration: "45 يوم",
    flag: "https://flagcdn.com/w640/tz.png"
  }
];

export const testimonials = [
  {
    name: "أم عبدالعزيز",
    quote: "التجربة كانت واضحة من أول اتصال. متابعة محترمة وسرعة في الرد."
  },
  {
    name: "خالد العتيبي",
    quote: "أعجبني ترتيب الخطوات وتوضيح المتطلبات قبل بدء الطلب."
  },
  {
    name: "نورة السالم",
    quote: "اختيار السير الذاتية كان مناسب جدا لاحتياج الأسرة."
  }
];

export const faqs = [
  {
    question: "كيف يتم استخراج التأشيرة ؟",
    answer: "شركة المنصة الذهبية للاستقدام تقدم خدمة استخراج التأشيرة مجانا للعميل او يمكن للعميل استخراجها عن طريق منصة مساند."
  },
  {
    question: "ماهي المستندات المطلوبة للاستقدام؟",
    answer: "1- الهوية / الإقامة سارية المفعول\n\n2- التأشيرة\n\n3- الرقم المسجل في أبشر"
  },
  {
    question: "ماهي أسباب رفض إصدار التأشيرة؟",
    answer: "1- المخالفات\n\n2- إيقاف الخدمات\n\n3- عدم سداد الرسوم"
  },
  {
    question: "كم من الوقت تستغرقه عملية الاستقدام ؟",
    answer: "20 يوم الى 60 يوم كحد اقصى."
  },
  {
    question: "كيف تتم عملية تسليم العاملة ؟",
    answer: "تقدم شركة المنصة الذهبية للاستقدام خدمة تسليم العاملة في جميع انحاء المملكة أو من خلال زيارة مقر المكتب."
  },
  {
    question: "ما هي طرق السداد المتاحة ؟",
    answer: "الدفع امن عن طريق منصة مساند ولا تقبل شركة المنصة الذهبية للاستقدام أي وسيلة دفع أخرى."
  },
  {
    question: "هل إيقاف الخدمات يعيق استخراج التأشيرة ؟",
    answer: "من الأسباب التي تودي لرفض التأشيرة إيقاف الخدمات."
  }
];

export const contact = {
  phone: "920028848",
  whatsapp: "966558811538",
  mobileDisplay: "0558811538",
  email: "almanasah.g@gmail.com",
  address: "جدة - حي المروة - شارع حراء"
};

export const requestPageContent = {
  recruitment: {
    title: "طلب استقدام",
    eyebrow: "نموذج طلب استقدام",
    description: "حدد الخيارات المناسبة وسيتم تجهيز رسالة واتساب تشمل بيانات الطلب كاملة.",
    messageTitle: "مرحبًا، أريد طلب استقدام",
    icon: BriefcaseBusiness
  },
  transfer: {
    title: "طلب نقل خدمات",
    eyebrow: "نموذج نقل خدمات",
    description: "أرسل بيانات نقل الخدمات لفريق المنصة ليتم التواصل معك بالمتطلبات والخطوة التالية.",
    messageTitle: "مرحبًا، أريد طلب نقل خدمات",
    icon: RefreshCw
  },
  rental: {
    title: "طلب تأجير",
    eyebrow: "نموذج التأجير الشهري",
    description: "اختر نوع التأجير والمدة المناسبة وسيصل الطلب مباشرة لفريق الخدمة عبر واتساب.",
    messageTitle: "مرحبًا، أريد طلب تأجير",
    icon: UsersRound
  }
} as const;
