export type Locale = 'ar' | 'en';

export const dictionaries = {
  ar: {
    navbar: {
      work: 'أعمالنا',
      services: 'خدماتنا',
      process: 'منهجيتنا',
      about: 'من نحن',
      projects: 'المشاريع',
      contact: 'اتصل بنا',
      getInTouch: 'تواصل معنا',
    },
    footer: {
      tagline: 'استوديو Devesters البرمجي. هندسة من أجل الأداء.',
      sitemap: 'خريطة الموقع',
      social: 'التواصل الاجتماعي',
      address: 'المنصورة قسم 2، المنصورة 1،\nمحافظة الدقهلية',
    },
    hero: {
      badge: 'استوديو مقره القاهرة · تأسس عام 2024',
      title1: 'نبني المنتجات',
      typewriterPrefix: 'التي',
      typewriterPhrases: [
        { highlight: 'تحدد', rest: 'المستقبل.' },
        { highlight: 'تطور', rest: 'الأعمال.' },
        { highlight: 'تؤتمت', rest: 'العمليات.' },
        { highlight: 'تقود', rest: 'الابتكار.' },
        { highlight: 'تمكن', rest: 'المستخدمين.' },
      ],
      description: 'منصات متكاملة، أدوات SaaS، تطبيقات جوال متعددة الأنظمة، ودمج ذكاء اصطناعي — مهندسة للتوسع والنمو من اليوم الأول.',
      contactBtn: 'تواصل معنا',
      projectsBtn: 'المشاريع',
    },
    servicesSection: {
      badge: 'ما نقوم ببنائه',
      title: 'خدماتنا.',
      description: 'هندسة برمجية متكاملة للويب والجوال والذكاء الاصطناعي — كل تقنية نعمل بها، نشحنها إلى مرحلة الإنتاج.',
      webTitle: 'تطوير الويب ومنصات الـ SaaS',
      webDesc: 'نقوم بتصميم ونشر منصات ويب كاملة باستخدام Next.js — من لوحات تحكم SaaS المعقدة إلى البوابات البرمجية للمؤسسات مع أنظمة الدفع والمصادقة المتكاملة.',
      mobileTitle: 'هندسة تطبيقات الجوال عابرة المنصات',
      mobileDesc: 'تتطبيقات iOS وأندرويد بأداء أصلي من قاعدة كود موحدة باستخدام Flutter. نبني تطبيقات تبدو كالأصيلة على كل جهاز — من النموذج الأولي إلى الإطلاق.',
      aiTitle: 'دمج الذكاء الاصطناعي وأدوات الـ LLM',
      aiDesc: 'نقوم بدمج نماذج لغوية ضخمة عملية في منتجك — خطوط إمداد RAG مخصصة، ووكلاء ذكاء اصطناعي، وميزات مدعومة بنماذج اللغة الكبيرة لحل مشاكل العمل الحقيقية.',
      explore: 'استكشف الخدمة',
      viewAll: 'عرض جميع الخدمات',
    },
    bentoGrid: {
      selectedWork: 'أعمال مختارة',
      ourStack: 'تقنياتنا',
      stackTagline: 'مهندسة لتحقيق أقصى درجات الأداء.',
      livePreview: 'معاينة مباشرة',
      viewCaseStudy: 'عرض دراسة الحالة',
    },
    capabilities: {
      badge: 'القدرات والإمكانيات',
      title: 'كيف نقوم بالبناء',
      webTitle: 'الويب والـ SaaS',
      webDesc: 'تطبيقات ويب عالية الأداء مبنية بأحدث البنيات البرمجية. نركز على السرعة، تحسين محركات البحث (SEO)، وتجربة مستخدم سلسة.',
      mobileTitle: 'تطبيقات الجوال',
      mobileDesc: 'تطوير تطبيقات جوال عابرة للمنصات دون المساومة على الأداء. نستخدم Flutter لتقديم تطبيقات بأداء أصلي من قاعدة كود موحدة.',
      aiTitle: 'دمج الذكاء الاصطناعي',
      aiDesc: 'الاستفادة من النماذج اللغوية الكبيرة (LLMs) والتعلم الآلي لبناء ميزات ذكية تحل مشاكل العمل الفعلية، من الوكلاء إلى الرؤية الحاسوبية.',
    },
    testimonials: {
      badge: 'آراء عملائنا',
      title: 'شراكات مبنية على الثقة',
    },
    processPage: {
      badge: 'كيف نعمل',
      titlePrefix: 'منهجية عمل مبنية',
      titleSuffix: 'على الوضوح.',
      description: 'لقد صممنا سير عملنا للقضاء على الغموض. من مرحلة الاستكشاف إلى النشر الفعلي، كل مرحلة قابلة للقياس، شفافة، وتخضع لمعايير هندسية صارمة.',
      theProcess: 'خطوات العمل',
      ourStandards: 'معاييرنا الهندسية',
      outputs: 'المخرجات',
      badgeLongest: 'المرحلة الأطول',
      steps: [
        {
          num: '01',
          title: 'الاستكشاف وتحديد النطاق',
          time: '2-3 أيام',
          desc: 'نتوافق على أهداف العمل، القيود التقنية، واحتياجات المستخدمين. تضمن هذه المرحلة بناء الشيء الصحيح قبل كتابة سطر كود واحد.',
          outputs: ['ميثاق المشروع', 'تقرير الجدوى التقنية', 'قائمة الميزات الأولية']
        },
        {
          num: '02',
          title: 'التصميم المعماري والتخطيط',
          time: '1-2 أسبوع',
          desc: 'هيكلة الأساس التقني. نحدد مخطط قاعدة البيانات، العقود البرمجية للـ API، ومتطلبات البنية التحتية لضمان قابلية التوسع من اليوم الأول.',
          outputs: ['مخطط البنية المعمارية للنظام', 'مخطط قاعدة البيانات', 'توثيق الـ API']
        },
        {
          num: '03',
          title: 'تصميم واجهة وتجربة المستخدم (UI/UX)',
          time: '1-2 أسبوع',
          desc: 'ترجمة المتمتلكات إلى واجهات عالية الدقة. نركز على الوضوح الهيكلي، قابلية إعادة استخدام المكونات، والتنفيذ البصري الفاخر.',
          outputs: ['مخططات هيكلية (Wireframes)', 'نماذج Figma عالية الدقة', 'رموز نظام التصميم (Tokens)']
        },
        {
          num: '04',
          title: 'التطوير البرمجي',
          time: '4-12 أسبوع',
          desc: 'مرحلة التنفيذ البرمجي. نبني في دورات رشيقة (Sprints)، ونوفر روابط بيئة تجريبية أسبوعية حتى تتمكن من رؤية التقدم في وقت حقيقي.',
          outputs: ['قاعدة كود جاهزة للإنتاج', 'روابط بيئة تجريبية أسبوعية']
        }
      ],
      standards: [
        {
          title: 'التصميم قبل الكود',
          desc: 'لا نتسرع أبداً في التطوير. النماذج الأولية الدقيقة تضمن التوافق التام وتمنع التغييرات المكلفة في منتصف عملية البرمجة.'
        },
        {
          title: 'روابط تجريبية أسبوعياً',
          desc: 'لا توجد صناديق مغلقة. تتلقى رابطاً تجريبياً حياً كل أسبوع للتفاعل مع ما قمنا ببنائه وتجربته بنفسك.'
        },
        {
          title: 'نقطة اتصال واحدة',
          desc: 'تتواصل مباشرة مع المهندس أو المصمم الرئيسي الذي يقود مشروعك. لا توجد طبقات معقدة من مدراء الحسابات.'
        }
      ]
    },
    aboutPage: {
      badge: 'الفريق',
      titlePrefix: 'بنيت بأيدي مهندسين',
      titleSuffix: 'ينجزون المهام.',
      description: 'نحن فريق برمجي هندسي متميز — لسنا مجرد سوق للعمل الحر، ولا وكالة رخيصة. فريق مركز من المتخصصين الذين يفكرون في منطق عملك، وتجربة المستخدم، والبنية المعمارية في نفس الوقت.',
      whoWeAre: 'من نحن',
      whoWeAreDesc: 'تأسست Devesters على مبدأ التميز الهندسي. بقيادة أحمد عزام، محمد بدر، أحمد فرغلي، أحمد عصام، ومنار النحتي، يركز استوديونا على إنشاء بنية تحتية رقمية قوية تتوسع بنجاح. نحن لسنا مجرد مطورين؛ نحن شركاء منتج نعمل في تقاطع الكفاءة والابتكار.',
      whatSetsUsApart: 'ما يميزنا',
      whatSetsUsApartDesc: 'نحن لا نعمل مع خمسين عميلاً في وقت واحد. بل نعمل كفريق مخصص لمنتجك، ونندمج مع رؤيتك لنضمن أن البرمجيات التي نبنيها لا تعمل فحسب — بل تسيطر وتتفوق. تركيزنا ينصب على الاستمرارية والأداء وقواعد الكود القابلة للصيانة.',
      shippedProducts: 'منتجات تم شحنها',
      launchpadAward: 'جائزة الإطلاق',
      coreEngineers: 'مهندسون أساسيون',
      coreTeamTitle: 'الفريق الهندسي الأساسي',
      whereWeAreHeaded: 'إلى أين نتجه',
      goals: [
        {
          title: 'توسيع نطاق منتجاتنا',
          desc: 'الانتقال من التميز الهندسي للغير إلى بناء نظامنا البرمجي الخاص (SaaS) وأدوات المطورين.'
        },
        {
          title: 'قيادة دمج الذكاء الاصطناعي في الشرق الأوسط',
          desc: 'تسهيل الوصول إلى نماذج لغوية ضخمة (LLMs) عالية الأداء ووكلاء ذكاء اصطناعي مخصصين للشركات المحلية.'
        },
        {
          title: 'المصدر المفتوح والمجتمع',
          desc: 'المساهمة في مجتمع البرمجة من خلال نشر أدواتنا الداخلية لتطوير التصميم إلى كود، وحزم اختبار الأداء.'
        }
      ]
    },
    servicesPage: {
      badge: 'ماذا نفعل',
      title: 'هندسة برمجية متكاملة،\nمن الفكرة إلى النشر.',
      description: 'نحن لا نكتفي بتسليم الكود. بل نقوم بتصميم وبناء ونشر منتجات رقمية كاملة. هندسة دقيقة للفرق التي تبحث عن الأداء العالي.',
      webTitle: 'تطوير الويب ومنصات الـ SaaS',
      webDesc: 'نصمم وننشر منصات قوية باستخدام Next.js — من بوابات الدفع المعقدة إلى البنى التحتية المخصصة لأنظمة إدارة التعلم (LMS).',
      mobileTitle: 'تطبيقات الجوال (Flutter)',
      mobileDesc: 'تطبيقات iOS وأندرويد مجمعة برمجياً بأداء أصلي ومن قاعدة كود واحدة، لتقديم تجربة مستخدم مثالية على كل جهاز.',
      aiTitle: 'دمج الذكاء الاصطناعي وأدوات الـ LLM',
      aiDesc: 'نقوم بدمج نماذج لغوية ضخمة عملية لحل المشكلات الحقيقية في قطاع العمل — منتجات فعلية متكاملة وليست مجرد واجهات بسيطة.',
      infraTitle: 'الباك إند والبنية التحتية',
      infraDesc: 'بنى تحتية خلفية قابلة للتوسع ومثبتة الفعالية. لقد بنينا للتعامل مع الأحمال الكبيرة — قواعد البيانات، قوائم الانتظار، المصادقة، والأنظمة السحابية.',
      viewSoubul: '↳ عرض منصة سبل لإدارة التعلم',
      viewNaptah: '↳ عرض نظام نبتة البيئي',
      howWeWork: 'منهجية عملنا',
      howWeWorkSteps: [
        {
          title: 'الاستكشاف وهيكلة النظام',
          desc: 'رسم منطق العمل، تحديد التقنيات المناسبة، وتخطيط البنية المعمارية قبل كتابة سطر كود واحد.'
        },
        {
          title: 'الهندسة الرشيقة (Agile)',
          desc: 'دورات تطوير متكررة، تواصل شفاف، وتسليم مستمر. ترى منتجك وهو يتشكل ويتحسن أسبوعاً بعد أسبوع.'
        },
        {
          title: 'النشر والترقية والتوسع',
          desc: 'شحن المنتج إلى بيئة الإنتاج، وإعداد خطوط التطوير والنشر المستمر (CI/CD)، وضمان جاهزية الخوادم للتوسع.'
        }
      ],
      readyTitle: 'جاهز للبناء؟',
      readyDesc: 'أخبرنا بما تريد بناءه، وسنخبرك كيف سنقوم بتطويره.',
      startProject: 'ابدأ مشروعك معنا',
    },
    projectsPage: {
      badge: 'أعمالنا',
      title: 'ما قمنا ببنائه.',
      description: 'كل مشروع هو منتج نفتخر بشحنه. نجمع بين الدقة التقنية والهندسة عالية الأداء لإنشاء منصات رقمية عملاقة.',
      searchPlaceholder: 'ابحث عن المشاريع...',
      newestFirst: 'الأحدث أولاً',
      emptyState: 'لم يتم العثور على مشاريع تطابق معايير البحث.',
      clearFilters: 'مسح التصفية',
      all: 'الكل',
    },
    contactPage: {
      badge: 'اتصل بنا',
      titlePrefix: 'دعنا نبني شيئاً',
      titleSuffix: 'استثنائياً.',
      description: 'أخبرنا عن متطلبات مشروعك وأهدافك. سيقوم فريقنا الهندسي بمراجعتها والرد عليك خلال 24 ساعة.',
      directEmail: 'البريد المباشر:',
      mobile: 'الجوال:',
      formName: 'اسمك الكريم',
      formEmail: 'البريد الإلكتروني',
      formProjectType: 'نوع المشروع',
      formMessage: 'تفاصيل الرسالة',
      placeholderName: 'مثال: أحمد محمد',
      placeholderEmail: 'name@example.com',
      placeholderMessage: 'أخبرنا عن أهدافك، الجدول الزمني، والمتطلبات التقنية للمشروع...',
      submitBtn: 'افتح تطبيق البريد الإلكتروني',
      projectTypes: {
        saas: 'منصة SaaS',
        mobile: 'تطبيق جوال',
        ai: 'دمج ذكاء اصطناعي',
        other: 'آخر',
      }
    },
    projects: {
      'Soubul': {
        title: 'سبل',
        category: 'منصة SaaS / إدارة تعلم',
        description: 'منصة تعليمية متكاملة (LMS) ذات بنية معمارية معقدة وأنظمة دفع متكاملة. مصممة للتوسع على مستوى المؤسسات الكبرى.'
      },
      'Naptah': {
        title: 'نبتة',
        category: 'تجارة إلكترونية',
        description: 'نظام بيئي زراعي متكامل ومنصة تجارة إلكترونية لتمكين المزارعين والمشترين المحليين.'
      },
      'Royal Village': {
        title: 'رويال فيليدج',
        category: 'منصة رياضية',
        description: 'منصة متكاملة لنادي كرة قدم تتيح حجز الملاعب، قاعات المناسبات، والتسجيل في الأكاديمية مدعومة بتقنية Angular Signals.'
      },
      'HireWire': {
        title: 'هاير واير',
        category: 'أدوات ذكاء اصطناعي',
        description: 'وكيل ذكاء اصطناعي لتصفية وترتيب فرص العمل الحر تلقائياً، لتسريع وتسهيل جلب العملاء للوكالات والشركات.'
      },
      'Luxe Direct': {
        title: 'لوكس دايركت',
        category: 'تجارة إلكترونية',
        description: 'سوق تجاري فاخر غير مركزي (Headless) مع مزامنة فورية ومستمرة للمخزون عبر 40 دولة.'
      },
      'Orbit Analytics': {
        title: 'أوربت أناليتكس',
        category: 'منصة SaaS',
        description: 'منصة نمذجة عزو التسويق بدون ملفات تعريف الارتباط (Post-cookie) مخصصة لفرق التسويق ذات العمليات واسعة النطاق.'
      },
      'Lovely Smell EG': {
        title: 'Lovely Smell EG',
        category: 'تجارة إلكترونية',
        description: 'منصة تجارة إلكترونية فاخرة للعطور في مصر، متخصصة في الروائح الشرقية والغربية الفاخرة. تشمل ميزات اختيار الأحجام وتتبع الطلبات.'
      },
      'BlackWater': {
        title: 'بلاك ووتر',
        category: 'نظام سحابي',
        description: 'منسق حاويات مخصص ذاتي الشفاء والترميم. يدمج مراقبة نواة eBPF بلغة C مع Go لإدارة موارد Docker autonomously ومنع تعطل الخوادم.'
      },
      'Sentinel AI': {
        title: 'سنتينل AI',
        category: 'ذكاء اصطناعي',
        description: 'نظام كشف تهديدات ذاتي ومستقل مخصص لمراقبة البنية التحتية السحابية الأصلية.'
      },
      'Neo Ledger': {
        title: 'نيو ليدجر',
        category: 'تكنولوجيا مالية',
        description: 'بوابة دفع لا مركزية قابلة للتوسع ونظام دفع سلس لتداول الأصول الرقمية، يتميز بتسوية فورية وأمان متعدد التوقيعات.'
      },
      'Dev Terminal': {
        title: 'ديف تيرمينال',
        category: 'تطبيقات جوال',
        description: 'محاكي شاشة طرفية أصلي لنظام iOS يتميز بزمن انتقال منخفض لجلسات SSH، تشغيل حاويات محلية، وتخطيط علامات تبويب متعددة للمطورين.'
      }
    } as Record<string, { title: string; category: string; description: string }>,
    testimonialsData: {
      'Abdullah Elshorbagy': {
        review: 'بصراحة الشغل مع تيم Devesters كان نقطة تحول كبيرة لمبادرة مسارات. منصة سُبُل مكانتش مجرد بروجيكت تقني عادي، دي كانت حل ذكي بيستوعب كل تعقيدات قطاع التعليم. احترافية الشباب في بناء السيستم وتأمين الداتا بتعكس مستوى هندسي عالمي مفيش زيه.',
        role: 'مدير العمليات، مبادرة مسارات'
      },
      'Dr. Tariq Al-Mansour': {
        review: 'ما كنا ندور على مجرد شركة تسوي لنا موقع، كنا نبي شريك هندسي يبني لنا نظام متكامل. شباب Devesters قدموا لنا بنية تحتية قوية تتحمل آلاف للمستخدمين بنفس الوقت بدون ما يطيح الأداء. اهتمامهم بهندسة الباك إند وتأمين بوابات الدفع صراحة كان شيء استثنائي.',
        role: 'المدير التنفيذي'
      },
      'Eng. Abdulrahman Al-Suwaidi': {
        review: 'العمل مع Devesters يختلف تماماً عن أي وكالة برمجيات أخرى. لديهم فهم عميق لكيفية دمج بنيات الذكاء الاصطناعي في منتجات حقيقية. بفضل هندستهم المتقدمة، توسعت شركتنا الناشئة بسهولة وفازت بالعديد من جوائز حاضنات الأعمال.',
        role: 'مؤسس، شركة AgTech الناشئة'
      },
      'Sarah Al-Ghamdi': {
        review: 'جودة الكود وتجربة المستخدم (UI/UX) التي تخرج من هذا الاستوديو تنافس كبرى الشركات العالمية. تطبيقنا، والذي تم بناؤه باستخدام Flutter، يعمل بسلاسة مذهلة وبأداء يضاهي التطبيقات الأصيلة (Native). فريق محترف وملتزم بالمواعيد بدقة متناهية.',
        role: 'مديرة المنتجات الرقمية'
      },
      'Khalid Al-Hashimi': {
        review: 'كثير أوقات بنوكل المهام البرمجية المعقدة اللي بدها أداء عالي لفريق Devesters. قدرتهم على بناء أدوات الـ AI وأتمتة العمليات وفرت علينا مئات الساعات. هدول مش مجرد مبرمجين، هدول مهندسين حلول بيمتلكوا رؤية استراتيجية ودايماً بيعطونا الأفضل.',
        role: 'المدير التقني، وكالة إقليمية'
      }
    } as Record<string, { review: string; role: string }>,
    team: {
      bios: {
        'Ahmed Azam': 'أحمد هو العقل المدبر وراء الرؤية المعمارية في Devesters. كقائد للفريق ومهندس تطوير جوال وويب أول، يمزج بسلاسة بين الاستراتيجية التقنية والتنفيذ الخالي من العيوب. يتخصص في تحويل المتطلبات المعقدة إلى منصات SaaS شاملة وتطبيقات عالية الأداء. بفضل خبرته العميقة الممتدة من تطوير الجوال عابر المنصات (Flutter) إلى أنظمة الويب الحديثة (React, Next.js)، فإن شغفه بالتفاصيل ودمج الذكاء الاصطناعي يجعله حجر الزاوية في تقديم أعمالنا الهندسية.',
        'Manar Elnahty': 'منار هي مهندسة برمجيات شغوفة ومبدعة ومكرسة لابتكار تجارب رقمية سلسة عبر منصات متعددة. مدعومة بتدريب مكثف في معهد تكنولوجيا المعلومات (ITI)، تمتلك مجموعة مهارات هجينة فريدة - تجمع بين تطبيقات الجوال المجمعة محلياً عبر Flutter وهندسة الويب المتقدمة. قدرتها على كتابة كود نظيف وقابل للتوسع باستخدام تقنيات حديثة مثل React و TypeScript تضمن أن كل واجهة تقدمها Devesters سريعة الاستجابة ومناسبة للمؤسسات.',
        'Mohamed Badr': 'محمد هو فنان الكود في الفريق، يركز بشكل مكثف على معمارية تطبيقات الجوال وتجربة المستخدم. مستفيداً من خلفيته المتخصصة في معهد تكنولوجيا المعلومات (ITI) وفهمه العميق لمبادئ واجهة وتجربة المستخدم (UI/UX)، يضفي مستوى متميزاً من الصقل لكل واجهة يبنيها. إنه مكرس لترجمة أنظمة التصميم المعقدة إلى تطبيقات Flutter عالية الأداء، مما يضمن أن كل حركة ميكرو وتفاعل 60 إطاراً في الثانية يبدو انسيائياً وأصلياً على كل من iOS وأندرويد.',
        'Ahmed Farghly': 'أحمد فرغلي هو القوة الدافعة وراء البنية التحتية القوية لـ Devesters. يجلب خبرة استثنائية في تصميم وهندسة الأنظمة الخلفية واسعة النطاق باستخدام أطر عمل احترافية مثل Laravel و Django. تمتد قدرات أحمد إلى ما هو أبعد من كتابة الكود؛ فهو يشارك بعمق في إدارة الخوادم وتصميم قواعد البيانات وأنابيب DevOps. يضمن نهجه الدقيق بقاء الخوادم والمنصات التي نبنيها متوفرة بشكل آمن وسريعة الأداء تحت الأحمال الثقيلة.',
        'Ahmed Essam': 'أحمد عصام هو مهندس المنطق والأمان والأداء وراء الكواليس. يتخصص في هندسة قواعد البيانات المعقدة وتطوير واجهات برمجة التطبيقات (APIs) باستخدام PHP و Laravel، ويركز بلا كلل على كتابة كود خلفي نظيف وقابل للاختبار والصيانة. مساهماته التقنية حاسمة في ضمان تدفق البيانات بشكل آمن وسريع للغاية بين قواعد البيانات المعقدة والواجهات الأمامية للعملاء، مما يوفر الأساس المستقر اللازم لمنتجاتنا الرقمية الأكثر تقدماً.'
      } as Record<string, string>
    }
  },
  en: {
    navbar: {
      work: 'Work',
      services: 'Services',
      process: 'Process',
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    footer: {
      tagline: '© 2026 DEVESTERS STUDIO. ENGINEERED FOR PERFORMANCE.',
      sitemap: 'Sitemap',
      social: 'Social',
      address: 'Mansoura Qism 2, El Mansoura 1,\nDakahlia Governorate',
    },
    hero: {
      badge: 'Cairo-Based Studio · Est. 2024',
      title1: 'We Build the Products',
      typewriterPrefix: 'That',
      typewriterPhrases: [
        { highlight: 'Define', rest: 'Tomorrow.' },
        { highlight: 'Scale', rest: 'Businesses.' },
        { highlight: 'Automate', rest: 'Workflows.' },
        { highlight: 'Drive', rest: 'Innovation.' },
        { highlight: 'Empower', rest: 'Users.' },
      ],
      description: 'Full-stack platforms, SaaS tools, cross-platform mobile apps, and AI integrations — engineered to scale from day one.',
      contactBtn: 'Contact Us',
      projectsBtn: 'Projects',
    },
    servicesSection: {
      badge: 'what we build',
      title: 'Our Services.',
      description: 'End-to-end engineering across web, mobile, and AI — every stack we touch, we ship to production.',
      webTitle: 'Web & SaaS Development',
      webDesc: 'We architect and deploy full-scale web platforms using Next.js — from complex SaaS dashboards to enterprise portals with integrated payment systems and authentication.',
      mobileTitle: 'Cross-Platform Mobile Engineering',
      mobileDesc: 'Native-performance iOS and Android apps from a single Flutter codebase. We build apps that feel native on every device — from MVP to App Store launch.',
      aiTitle: 'AI Integration & LLM Tooling',
      aiDesc: 'We integrate practical large language models into your product — custom RAG pipelines, AI agents, and LLM-powered features that solve real business problems, not just demos.',
      explore: 'Explore Service',
      viewAll: 'View all services',
    },
    bentoGrid: {
      selectedWork: 'Selected Work',
      ourStack: 'Our Stack',
      stackTagline: 'Engineered for absolute performance.',
      livePreview: 'Live Preview',
      viewCaseStudy: 'View Case Study',
    },
    capabilities: {
      badge: 'Capabilities',
      title: 'How We Build',
      webTitle: 'Web & SaaS',
      webDesc: 'High-performance web applications built with the most modern tech stacks. Focused on speed, SEO, and seamless user experiences.',
      mobileTitle: 'Mobile',
      mobileDesc: 'Cross-platform development without compromise. Using Flutter and React Native to deliver native-feel apps from a single codebase.',
      aiTitle: 'AI Integration',
      aiDesc: 'Leveraging LLMs and machine learning to build intelligent features that actually solve business problems, from agents to computer vision.',
    },
    testimonials: {
      badge: 'Client Feedback',
      title: 'Trusted by Partners',
    },
    processPage: {
      badge: 'How We Work',
      titlePrefix: 'A Process Built',
      titleSuffix: 'for Clarity.',
      description: 'We engineered our workflow to eliminate ambiguity. From discovery to deployment, every phase is measurable, transparent, and driven by architectural rigor.',
      theProcess: 'The Process',
      ourStandards: 'Our Standards',
      outputs: 'Outputs',
      badgeLongest: 'LONGEST PHASE',
      steps: [
        {
          num: '01',
          title: 'Discovery & Scoping',
          time: '2-3 Days',
          desc: 'We align on business objectives, technical constraints, and user needs. This phase ensures we build the right thing before writing a single line of code.',
          outputs: ['Project Charter', 'Technical Feasibility Report', 'Initial Feature Backlog']
        },
        {
          num: '02',
          title: 'Architecture & Planning',
          time: '1-2 Weeks',
          desc: 'Structuring the foundation. We define the database schema, API contracts, and infrastructure requirements to ensure scalability from day one.',
          outputs: ['System Architecture Diagram', 'Database Schema', 'API Documentation']
        },
        {
          num: '03',
          title: 'UI/UX Design',
          time: '1-2 Weeks',
          desc: 'Translating requirements into high-fidelity interfaces. We focus on structural clarity, component reusability, and premium visual execution.',
          outputs: ['Wireframes', 'High-Fidelity Figma Prototypes', 'Design System Tokens']
        },
        {
          num: '04',
          title: 'Development',
          time: '4-12 Weeks',
          desc: 'Execution phase. We build in sprints, providing weekly staging updates so you can see progress in real-time, not just on a burndown chart.',
          outputs: ['Production-Ready Codebase', 'Weekly Staging Links']
        }
      ],
      standards: [
        {
          title: 'Design Before Code',
          desc: 'We never rush into development. Pixel-perfect prototypes ensure alignment and prevent costly mid-sprint pivots.'
        },
        {
          title: 'Staging Links Weekly',
          desc: "No black boxes. You receive a live staging URL every week to interact with what we've built, exactly as it works."
        },
        {
          title: 'One Point of Contact',
          desc: 'You communicate directly with the Lead Engineer or Designer driving your project. No layers of account management.'
        }
      ]
    },
    aboutPage: {
      badge: 'The Squad',
      titlePrefix: 'Built by Engineers',
      titleSuffix: 'Who Ship.',
      description: 'We are a premium software engineering collective — not a marketplace, not a cheap agency. A focused team of specialists that thinks about your business logic, UX, and architecture at the same time.',
      whoWeAre: 'Who We Are',
      whoWeAreDesc: 'Devesters was founded on the principle of engineering excellence. Led by Ahmed Azam, Mohamed Badr, Ahmed Farghly, Ahmed Essam, and Manar Elnahty, our studio focuses on creating robust digital infrastructure that scales. We aren\'t just developers; we are product partners who live in the intersection of efficiency and innovation.',
      whatSetsUsApart: 'What Sets Us Apart',
      whatSetsUsApartDesc: 'We don\'t juggle fifty clients. We operate as dedicated product teams, embedding ourselves into your vision to ensure the software we build doesn\'t just work—it dominates. Our focus is on longevity, performance, and maintainable codebases.',
      shippedProducts: 'Shipped Products',
      launchpadAward: 'Launchpad Award',
      coreEngineers: 'Core Engineers',
      coreTeamTitle: 'Core Engineering Team',
      whereWeAreHeaded: 'Where We\'re Headed',
      goals: [
        {
          title: 'Scaling Our Products',
          desc: 'Transitioning from engineering excellence to building our own proprietary SaaS ecosystem and dev tools.'
        },
        {
          title: 'Leading MENA\'s AI Integration',
          desc: 'Democratizing access to high-performance LLMs and specialized AI agents for local enterprise ecosystems.'
        },
        {
          title: 'Open Source & Community',
          desc: 'Giving back by releasing our internal design-to-code pipelines and performance testing suites to the world.'
        }
      ]
    },
    servicesPage: {
      badge: 'What We Do',
      title: 'End-to-End Engineering,\nFrom Idea to Deployment.',
      description: 'We don\'t hand off. We architect, build, and ship complete digital products. Precision engineering for teams that demand performance.',
      webTitle: 'Web & SaaS Development',
      webDesc: 'We architect and deploy heavy-duty platforms using Next.js — from complex payment gateways to custom LMS infrastructure.',
      mobileTitle: 'Cross-Platform Mobile (Flutter)',
      mobileDesc: 'Natively compiled iOS & Android apps with a single codebase, delivering pixel-perfect UX on every device.',
      aiTitle: 'AI Integration & LLM Tooling',
      aiDesc: 'We integrate practical large language models to solve real industry problems — not wrappers, actual products.',
      infraTitle: 'Backend & Infrastructure',
      infraDesc: 'Scalable, battle-tested backends. We\'ve built for load — databases, queues, auth, and server-side architecture.',
      viewSoubul: '↳ View Soubul LMS',
      viewNaptah: '↳ View Naptah Ecosystem',
      howWeWork: 'How We Work',
      howWeWorkSteps: [
        {
          title: 'Discovery & Architecture',
          desc: 'Mapping the business logic, defining the tech stack, and planning the architecture before writing a single line of code.'
        },
        {
          title: 'Agile Engineering',
          desc: 'Iterative sprints, transparent communication, and continuous delivery. You see the product taking shape every week.'
        },
        {
          title: 'Deployment & Scale',
          desc: 'Shipping the product to production, setting up CI/CD pipelines, and ensuring the infrastructure is ready to scale.'
        }
      ],
      readyTitle: 'Ready to Build?',
      readyDesc: 'Tell us what you\'re making. We\'ll tell you how we\'d build it.',
      startProject: 'Start a Project',
    },
    projectsPage: {
      badge: 'OUR WORK',
      title: 'What We\'ve Built.',
      description: 'Every project is a product we\'d be proud to ship. We combine technical precision with high-performance engineering to create digital monoliths.',
      searchPlaceholder: 'Search projects...',
      newestFirst: 'Newest First',
      emptyState: 'No projects found matching your criteria.',
      clearFilters: 'Clear filters',
      all: 'All',
    },
    contactPage: {
      badge: 'Get In Touch',
      titlePrefix: 'Let\'s build something',
      titleSuffix: 'extraordinary.',
      description: 'Tell us about your project requirements and goals. Our engineering team will review it and get back to you within 24 hours.',
      directEmail: 'Direct Email:',
      mobile: 'Mobile:',
      formName: 'Your Name',
      formEmail: 'Email Address',
      formProjectType: 'Project Type',
      formMessage: 'Message',
      placeholderName: 'John Doe',
      placeholderEmail: 'john@example.com',
      placeholderMessage: 'Tell us about your goals, timeline, and technical requirements...',
      submitBtn: 'Open Email Client',
      projectTypes: {
        saas: 'SaaS Platform',
        mobile: 'Mobile App',
        ai: 'AI Integration',
        other: 'Other',
      }
    },
    projects: {
      'Soubul': {
        title: 'Soubul',
        category: 'SaaS / LMS',
        description: 'A comprehensive LMS platform with complex architecture and integrated payments. Designed for enterprise-level scaling.'
      },
      'Naptah': {
        title: 'Naptah',
        category: 'E-commerce',
        description: 'Comprehensive agricultural ecosystem and e-commerce platform empowering local farmers and buyers.'
      },
      'Royal Village': {
        title: 'Royal Village',
        category: 'Sports Platform',
        description: 'Full-featured football club platform offering pitch booking, event hall reservations, and academy registrations powered by Angular Signals.'
      },
      'HireWire': {
        title: 'HireWire',
        category: 'AI Tooling',
        description: 'An intelligent agent that filters and ranks freelance opportunities using AI, automating the lead-gen pipeline for agencies.'
      },
      'Luxe Direct': {
        title: 'Luxe Direct',
        category: 'E-commerce',
        description: 'Headless luxury marketplace with atomic inventory sync across 40 countries.'
      },
      'Orbit Analytics': {
        title: 'Orbit Analytics',
        category: 'SaaS',
        description: 'Post-cookie attribution modeling for high-scale marketing teams.'
      },
      'Lovely Smell EG': {
        title: 'Lovely Smell EG',
        category: 'E-commerce',
        description: 'A premium e-commerce platform for luxury fragrances in Egypt, specializing in oriental and western scents. Features include multi-size selector and order tracking.'
      },
      'BlackWater': {
        title: 'BlackWater',
        category: 'System',
        description: 'A custom auto-healing container orchestrator. Integrates C-based eBPF kernel monitoring with Go to autonomously manage Docker resources and prevent server crashes.'
      },
      'Sentinel AI': {
        title: 'Sentinel AI',
        category: 'AI',
        description: 'Autonomous threat detection for cloud-native infrastructure monitoring.'
      },
      'Neo Ledger': {
        title: 'Neo Ledger',
        category: 'Fintech',
        description: 'A highly scalable, decentralized payment gateway and frictionless checkout system for digital asset trading, featuring sub-second settlement times and multi-signature security.'
      },
      'Dev Terminal': {
        title: 'Dev Terminal',
        category: 'Mobile',
        description: 'A high-performance iOS native terminal emulator featuring low-latency SSH sessions, local container execution, multi-tab layout, and advanced key mappings for developer productivity.'
      }
    } as Record<string, { title: string; category: string; description: string }>,
    testimonialsData: {
      'Abdullah Elshorbagy': {
        review: 'Honestly, working with Devesters was a major turning point for the Masarat Initiative. The Soubul platform wasn\'t just a typical technical project; it was a smart solution that accommodated all the complexities of the education sector. The team\'s professionalism in system design and data security reflects a world-class engineering standard.',
        role: 'Operations Manager, Masarat Initiative'
      },
      'Dr. Tariq Al-Mansour': {
        review: 'We weren\'t looking for just a company to make us a website; we wanted an engineering partner to build an integrated system. The Devesters team provided us with a robust infrastructure that supports thousands of concurrent users without any performance degradation. Their attention to backend engineering and secure payment gateways was truly exceptional.',
        role: 'Executive Director'
      },
      'Eng. Abdulrahman Al-Suwaidi': {
        review: 'Working with Devesters is entirely different from any other software agency. They have a profound understanding of how to integrate AI architectures into real-world products. Thanks to their advanced engineering, our startup scaled effortlessly and won multiple accelerator awards.',
        role: 'Founder, AgTech Startup'
      },
      'Sarah Al-Ghamdi': {
        review: 'The code quality and UI/UX shipped by this studio compete with major global companies. Our app, built with Flutter, runs incredibly smooth with native-like performance. A highly professional team that strictly adheres to deadlines.',
        role: 'Digital Product Manager'
      },
      'Khalid Al-Hashimi': {
        review: 'We often outsource complex, high-performance programming tasks to the Devesters team. Their ability to build AI tools and automate processes saved us hundreds of hours. They are not just developers; they are solution engineers with a strategic vision who always deliver the best.',
        role: 'CTO, Regional Agency'
      }
    } as Record<string, { review: string; role: string }>,
    team: {
      bios: {
        'Ahmed Azam': 'Ahmed is the mastermind behind the architectural vision at Devesters. As the Team Lead and a senior Frontend/Mobile engineer, he seamlessly blends technical strategy with flawless execution. He specializes in transforming complex requirements into comprehensive, scalable SaaS platforms and high-performance applications. With deep expertise spanning cross-platform mobile development (Flutter) to modern web ecosystems (React, Next.js), his obsession with detail and AI integration makes him the cornerstone of our engineering delivery.',
        'Manar Elnahty': 'Manar is a passionate and creative software engineer dedicated to crafting seamless digital experiences across multiple platforms. Backed by rigorous training at the Information Technology Institute (ITI), she possesses a unique hybrid skill set—bridging natively compiled mobile apps via Flutter with advanced frontend web architectures. Her ability to write clean, highly scalable code using modern stacks like React and TypeScript ensures that every interface Devesters ships is responsive, fast, and enterprise-ready.',
        'Mohamed Badr': 'Mohamed is the code artist of the team, intensely focused on mobile application architecture and user experience. Leveraging his specialized ITI background and deep understanding of UI/UX principles, he brings an elite level of polish to every interface he builds. He is dedicated to translating intricate design systems into high-performance Flutter applications, ensuring that every micro-interaction and 60fps animation feels fluid and native across both iOS and Android platforms.',
        'Ahmed Farghly': 'Ahmed Farghly is the driving force behind Devesters\' robust infrastructure. He brings exceptional expertise to architecting large-scale backend systems using enterprise-grade frameworks like Laravel and Django. Ahmed\'s capabilities extend far beyond writing code; he is deeply involved in server administration, database design, and DevOps pipelines. His meticulous approach ensures that the servers and platforms we build remain highly available, secure, and performant under extreme load.',
        'Ahmed Essam': 'Ahmed Essam is the engineer of logic, security, and performance behind the scenes. Specializing in complex database architecture and API development using PHP and Laravel, he focuses relentlessly on writing clean, testable, and highly maintainable backend code. His technical contributions are critical to ensuring secure, lightning-fast data flow between complex databases and frontend clients, providing the stable foundation required for our most advanced digital products.'
      } as Record<string, string>
    }
  }
};

// Fallback logic for dynamic items
export function getDictionary(locale: Locale) {
  const dict = dictionaries[locale] || dictionaries.ar;
  return dict;
}
