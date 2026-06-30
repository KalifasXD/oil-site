/* ============================================================
   SafetyMaster Homepage v2 — main.js
   Renders mega menu, category showcase, mobile drawer, products,
   brand swiper, and wires interactions. Vanilla JS.
   ============================================================ */

/* ---------- Embedded taxonomy (from homepage-taxonomy.json) ---------- */
const TAXONOMY = {
  logo: "https://safetymaster.gr/wp-content/uploads/2026/01/safetymaster-logo.png",
  brands: [
    { name: "Delta Plus",        logo: "https://safetymaster.gr/wp-content/uploads/2025/10/delta-plus-logo.svg",                          description: "Γαλλικός οίκος ΜΑΠ με πλήρη γκάμα ατομικής προστασίας." },
    { name: "Sir Safety",        logo: "https://safetymaster.gr/wp-content/uploads/2025/10/logo-black.svg",                              description: "Ιταλική εταιρεία με υποδήματα ασφαλείας και ρούχα εργασίας." },
    { name: "Sol's",             logo: "https://safetymaster.gr/wp-content/uploads/2025/10/sols-logo-black.svg",                         description: "Ευρωπαϊκή μάρκα ενδυμάτων εργασίας." },
    { name: "Fruit of the Loom", logo: "https://safetymaster.gr/wp-content/uploads/2026/06/fruit-of-the-loom-logo-2048x1289.png",       description: "Βασικός επαγγελματικός ρουχισμός σταθερής ποιότητας." },
    { name: "JRC",               logo: "https://safetymaster.gr/wp-content/uploads/2026/06/logo-jrc.png",                                description: "Ιταλική μάρκα ρούχων και ειδών εργασίας." }
  ],
  categories: [
    { id:300, slug:"head-protection", name_el:"Προστασία Κεφαλής", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-helmet-1.png", product_count:null, desc:"Κράνη, bump caps και αξεσουάρ για εργοτάξια, ύψη και βιομηχανία.", subcategories:[
      {name_el:"Κράνη Ασφαλείας",slug:"safety-helmets",icon:null},
      {name_el:"Κράνη Αναρρίχησης",slug:"industrial-climbing-helmets",icon:null},
      {name_el:"Ηλεκτρικά Μονωμένα Κράνη",slug:"electrically-insulated-helmets",icon:null},
      {name_el:"Κράνη Δασοκόμων",slug:"forester-safety-helmet",icon:null},
      {name_el:"Κράνη Πυροσβεστών",slug:"firefighter-helmets",icon:null},
      {name_el:"Καπέλα Προστασίας (Bump Caps)",slug:"bump-caps",icon:null},
      {name_el:"Αξεσουάρ Κεφαλής",slug:"head-protection-accessories",icon:null}
    ]},
    { id:308, slug:"eye-protection", name_el:"Προστασία Ματιών", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-glasses-1.png", product_count:null, desc:"Γυαλιά, goggles, προσωπίδες και μάσκες ηλεκτροσυγκόλλησης.", subcategories:[
      {name_el:"Γυαλιά Ασφαλείας",slug:"safety-spectacles",icon:null},
      {name_el:"Κλειστά Γυαλιά (Goggles)",slug:"goggles",icon:null},
      {name_el:"Γυαλιά πάνω από Διοπτρικά",slug:"over-spectacles",icon:null},
      {name_el:"Προσωπίδες",slug:"faceshields",icon:null},
      {name_el:"Μάσκες Ηλεκτροσυγκόλλησης",slug:"welding-shields",icon:null},
      {name_el:"Αξεσουάρ Ματιών",slug:"eye-protection-accessories",icon:null}
    ]},
    { id:315, slug:"respiratory-protection", name_el:"Προστασία Αναπνοής", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-respirator-1.png", product_count:null, desc:"Μάσκες, φίλτρα και αναπνευστικές συσκευές για σκόνη, αναθυμιάσεις και χημικά.", subcategories:[
      {name_el:"Μάσκες Φιλτραρίσματος",slug:"filtering-half-masks",icon:null},
      {name_el:"Μάσκες Ημίσεος Προσώπου",slug:"respirator-half-face-masks",icon:null},
      {name_el:"Μάσκες Ολοκλήρου Προσώπου",slug:"respirator-full-face-masks",icon:null},
      {name_el:"Φίλτρα Αναπνοής",slug:"respiratory-filters",icon:null},
      {name_el:"Αυτόνομες Αναπνευστικές Συσκευές",slug:"self-contained-breathing-apparatus",icon:null},
      {name_el:"Συσκευές Εξαναγκασμένης Ροής Αέρα",slug:"powered-air-filtering-devices",icon:null},
      {name_el:"Κουκούλες Διαφυγής",slug:"fire-escape-hood",icon:null},
      {name_el:"Ιατρικές Μάσκες",slug:"medical-face-masks",icon:null},
      {name_el:"Υφασμάτινες Μάσκες",slug:"fabric-masks",icon:null},
      {name_el:"Αξεσουάρ Αναπνοής",slug:"respiratory-protection-accessories",icon:null}
    ]},
    { id:326, slug:"hearing-protection", name_el:"Προστασία Ακοής", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-ear-muf-1.png", product_count:null, desc:"Ωτοασπίδες, ωτοβύσματα και διανομείς για θορυβώδη περιβάλλοντα.", subcategories:[
      {name_el:"Ωτοασπίδες",slug:"ear-defenders",icon:null},
      {name_el:"Ωτοβύσματα",slug:"ear-plugs",icon:null},
      {name_el:"Διανομείς Ωτοβυσμάτων",slug:"earplugs-dispensers",icon:null},
      {name_el:"Αξεσουάρ Ακοής",slug:"hearing-protection-accessories",icon:null}
    ]},
    { id:331, slug:"hand-protection", name_el:"Προστασία Χεριών", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-gloves-1.png", product_count:514, desc:"Η μεγαλύτερη κατηγορία μας: γάντια για κάθε κίνδυνο, από κοπή και χημικά έως θερμότητα και κρούση.", subcategories:[
      {name_el:"Γάντια Γενικής Χρήσης",slug:"allaround-gloves",icon:null},
      {name_el:"Γάντια Νιτριλίου",slug:"gantia-nitriliou",icon:null},
      {name_el:"Γάντια με Επικάλυψη Νιτριλίου",slug:"nitrile-coated-gloves",icon:null},
      {name_el:"Αντιδιατμητικά Γάντια",slug:"cut-resistant-gloves",icon:null},
      {name_el:"Γάντια Προστασίας Κρούσης",slug:"impact-gloves",icon:null},
      {name_el:"Αντικραδασμικά Γάντια",slug:"antivibration-gloves",icon:null},
      {name_el:"Δερμάτινα Γάντια",slug:"leather-gloves",icon:null},
      {name_el:"Γάντια Συγκόλλησης",slug:"welding-gloves",icon:null},
      {name_el:"Ηλεκτρομονωτικά Γάντια",slug:"electrical-gloves",icon:null},
      {name_el:"Γάντια Χημικής Προστασίας",slug:"chemical-gloves",icon:null},
      {name_el:"Θερμικά Γάντια",slug:"thermal-gloves",icon:null},
      {name_el:"Γάντια Κρύου",slug:"cold-gloves",icon:null},
      {name_el:"Γάντια Μιας Χρήσης",slug:"disposable-gloves",icon:null},
      {name_el:"Γάντια Τροφίμων",slug:"food-gloves",icon:null},
      {name_el:"Γάντια ESD (Αντιστατικά)",slug:"esd-gloves",icon:null},
      {name_el:"Γάντια Armanite",slug:"armanite-gloves",icon:null},
      {name_el:"Γάντια Rigger",slug:"rigger-gloves",icon:null},
      {name_el:"Γάντια Αλυσοπρίονου",slug:"chainsaw-gloves",icon:null},
      {name_el:"Γάντια Δασοπυρόσβεσης",slug:"wildland-firefighting-gloves",icon:null},
      {name_el:"Γάντια Πυροσβεστών",slug:"firefighters-gloves",icon:null},
      {name_el:"Γάντια Φυτοφαρμάκων",slug:"pesticide-gloves",icon:null},
      {name_el:"Μανίκια Προστασίας",slug:"safety-sleeves",icon:null}
    ]},
    { id:350, slug:"foot-protection", name_el:"Προστασία Ποδιών", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-shoe-1.png", product_count:176, desc:"Παπούτσια & μπότες ασφαλείας S1–S5 για κάθε κλάδο.", subcategories:[
      {name_el:"Παπούτσια Ασφαλείας",slug:"safety-shoes",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-safety-shoe-icon-1024.png"},
      {name_el:"Μπότες Ασφαλείας",slug:"safety-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-safety-boat-icon-1024.png"},
      {name_el:"Παπούτσια Εργασίας",slug:"no-safety-working-shoes",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-no-safety-working-shoe-icon-1024.png"},
      {name_el:"Μπότες Εργασίας",slug:"no-safety-working-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-no-safety-working-boat-icon-1024.png"},
      {name_el:"Παπούτσια Ηλεκτρολόγων",slug:"electricians-safety-shoes",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-electricians-safety-shoe-icon-1024.png"},
      {name_el:"Μπότες Ηλεκτρολόγων",slug:"electricians-safety-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-electrician-safety-boot-icon-1024.png"},
      {name_el:"Μπότες Συγκόλλησης",slug:"welding-safety-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-welding-safety-boot-icon-1024.png"},
      {name_el:"Μπότες Αλυσοπρίονου",slug:"chainsaw-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-chainsaw-boot-icon-1024.png"},
      {name_el:"Μπότες Πυροσβεστών",slug:"firefighters-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-firefighters-boot-icon-1024.png"},
      {name_el:"Γαλότσες Ασφαλείας",slug:"safety-wellies-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-safety-wellies-boot-icon-1024.png"},
      {name_el:"Γαλότσες",slug:"wellies-boots",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-no-safety-wellies-boot-icon-1024.png"},
      {name_el:"Σαμπό Ασφαλείας",slug:"safety-clogs",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-safety-clogs-icon-1024.png"},
      {name_el:"Σανδάλια Ασφαλείας",slug:"safety-sandals",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-safety-sandal-icon-1024.png"},
      {name_el:"Επιγονατίδες",slug:"safety-knee-pads",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-safety-knee-pad-icon-1024.png"},
      {name_el:"Αδιάβροχες Φόρμες (Waders)",slug:"safety-chest-waders",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-safety-chest-waders-icon-1024.png"},
      {name_el:"Αξεσουάρ Ποδιών",slug:"foot-protection-accessories",icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-foot-protection-accessories-insole-sock-lace-icon-1024.png"}
    ]},
    { id:364, slug:"workwear-protection", name_el:"Ρούχα Εργασίας", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-workwear-1.png", product_count:140, desc:"Πλήρης γκάμα ένδυσης εργασίας, από t-shirts έως φόρμες χημικής προστασίας.", subcategories:[
      {name_el:"T-Shirts",slug:"t-shirts",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-tshirt-icon.png"},
      {name_el:"Polo",slug:"polo-shirts",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-polo-shirts-icon.png"},
      {name_el:"Πουκάμισα Εργασίας",slug:"working-shirts",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-shirts-icon.png"},
      {name_el:"Φούτερ",slug:"sweatshirts-hoodies",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-sweatshirts-hoodies-icon.png"},
      {name_el:"Fleece",slug:"fleece-work-jackets",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-softshell-work-jackets-icon.png"},
      {name_el:"Softshell",slug:"softshell-work-jackets",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-softshell-jacket-icon.png"},
      {name_el:"Σακάκια Εργασίας",slug:"work-jackets",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-jackets-icon.png"},
      {name_el:"Παλτά και Παρκά",slug:"working-coats-parkas-jackets",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-coats-parkas-jackets-icon.png"},
      {name_el:"Παντελόνια Εργασίας",slug:"working-trousers",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-trousers-icon.png"},
      {name_el:"Βερμούδες",slug:"work-shorts",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-shorts-icon.png"},
      {name_el:"Ολόσωμες Φόρμες",slug:"working-overalls",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-coveralls-icon.png"},
      {name_el:"Φόρμες με Τιράντες",slug:"bib-and-brace-overalls",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-bib-and-brace-coveralls-icon.png"},
      {name_el:"Φόρμες Χημικής Προστασίας",slug:"chemical-protection-overalls",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-chemical-protection-coveralls-icon.png"},
      {name_el:"Γιλέκα Εργασίας",slug:"working-vests",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-vests-icon.png"},
      {name_el:"Ισοθερμικά",slug:"thermals-base-layers",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-thermals-base-layers-icon.png"},
      {name_el:"Ρόμπες",slug:"lab-food-warehouse-medical-coats",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-lab-food-warehouse-medical-coats-icon.png"},
      {name_el:"Ποδιές Εργασίας",slug:"work-aprons-tabards",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-aprons-tabards-icon.png"},
      {name_el:"Καπέλα Εργασίας",slug:"work-panel-caps",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-work-panel-caps-icon.png"},
      {name_el:"Σκούφοι",slug:"beanies",icon:"https://safetymaster.gr/wp-content/uploads/2026/03/safetymaster-beanies-icon.png"},
      {name_el:"Αξεσουάρ Ένδυσης",slug:"workwear-accessories",icon:"https://safetymaster.gr/wp-content/uploads/2026/05/hand_drawn_workwear_accessories_icon-1780248503947x.png"}
    ]},
    { id:385, slug:"fall-protection", name_el:"Προστασία Πτώσης", icon:"https://safetymaster.gr/wp-content/uploads/2026/02/safetymaster-shield-safety-full-body-harness-1.png", product_count:null, desc:"Εξαρτύσεις, ανακόπτες και συστήματα αγκύρωσης για εργασίες σε ύψος.", subcategories:[
      {name_el:"Ολόσωμες Εξαρτύσεις",slug:"full-body-harnesses",icon:null},
      {name_el:"Συστήματα Ανακοπής Πτώσης",slug:"fall-arrester-systems",icon:null},
      {name_el:"Ανακόπτες Πτώσης Επαναφοράς",slug:"retractable-fall-arrester",icon:null},
      {name_el:"Ανακόπτες Καθοδηγούμενου Τύπου",slug:"guided-type-fall-arresters",icon:null},
      {name_el:"Αναδέτες",slug:"lanyards",icon:null},
      {name_el:"Αναδέτες Θέσης Εργασίας",slug:"work-positioning-lanyards",icon:null},
      {name_el:"Αποσβεστήρες Ενέργειας",slug:"energy-absorbers",icon:null},
      {name_el:"Ζώνες Συγκράτησης Θέσης",slug:"work-positioning-belt",icon:null},
      {name_el:"Ζώνες Καθίσματος",slug:"sit-harness",icon:null},
      {name_el:"Διατάξεις Αγκύρωσης",slug:"anchor-devices",icon:null},
      {name_el:"Σύνδεσμοι",slug:"connectors",icon:null},
      {name_el:"Διάσωση και Εκκένωση",slug:"rescue-and-evacuation",icon:null},
      {name_el:"Συσκευές Διάσωσης",slug:"devices-for-rescue",icon:null},
      {name_el:"Αξεσουάρ Προστασίας Πτώσης",slug:"fall-protection-accessories",icon:null}
    ]}
  ]
};

/* ---------- Curated products (from curated-products.json) ---------- */
const PRODUCTS = [
  {name:"APOLLON VV733",cat:"Προστασία Χεριών",brand:"DELTA PLUS",from:2.6,img:"https://safetymaster.gr/wp-content/uploads/2025/09/hand-protection-deltaplus-apollon-vv733-back-yellow-black.jpg"},
  {name:"DPVV733N",cat:"Προστασία Χεριών",brand:"DELTA PLUS",from:3.5,img:"https://safetymaster.gr/wp-content/uploads/2025/09/hand-protection-deltaplus-dpvv733n-back-pink.jpg"},
  {name:"EOS VV906JA",cat:"Προστασία Χεριών",brand:"DELTA PLUS",from:17.2,img:"https://safetymaster.gr/wp-content/uploads/2025/09/hand-protection-deltaplus-eos-vv906ja-back.jpg"},
  {name:"EOS VV907",cat:"Προστασία Χεριών",brand:"DELTA PLUS",from:50.0,img:"https://safetymaster.gr/wp-content/uploads/2025/09/hand-protection-deltaplus-eos-vv907-back.jpg"},
  {name:"ASTI S1PS SR",cat:"Προστασία Ποδιών",brand:"DELTA PLUS",from:45.0,img:"https://safetymaster.gr/wp-content/uploads/2026/04/foot-protection-deltaplus-asti-s1ps-sr-single-grey-blue.jpg"},
  {name:"SAGA2 S3S SR",cat:"Προστασία Ποδιών",brand:"DELTA PLUS",from:115.0,img:"https://safetymaster.gr/wp-content/uploads/2025/10/foot-protection-deltaplus-saga2-s3s-sr-single-beige.jpg"},
  {name:"AEROBUILD S5 CI FO SR",cat:"Προστασία Ποδιών",brand:"DELTA PLUS",from:70.0,img:"https://safetymaster.gr/wp-content/uploads/2025/09/foot-protection-deltaplus-aerobuild-s5-ci-fo-sr-pair-grey-yellow.jpg"},
  {name:"AEROFOOD S4 CI FO SR",cat:"Προστασία Ποδιών",brand:"DELTA PLUS",from:50.0,img:"https://safetymaster.gr/wp-content/uploads/2025/09/foot-protection-deltaplus-aerofood-s4-ci-fo-sr-pair-white-blue.jpg"},
  {name:"Regent - 11380",cat:"Ρούχα Εργασίας",brand:"SOL'S",from:4.7,img:"https://safetymaster.gr/wp-content/uploads/2026/06/workwear-tshirts-sols-regent-11380-front-red-145.png"},
  {name:"Mach 1 | M1PA2",cat:"Ρούχα Εργασίας",brand:"DELTA PLUS",from:23.3,img:"https://safetymaster.gr/wp-content/uploads/2026/04/workwear-trousers-deltaplus-mach1-m1pa2-front-bm-navyblue-orange.png"},
  {name:"Painter | M6PAN",cat:"Ρούχα Εργασίας",brand:"DELTA PLUS",from:25.0,img:"https://safetymaster.gr/wp-content/uploads/2026/04/workwear-trousers-deltaplus-painter-m6pan-front-bc-white-gray.jpg"},
  {name:"FUSION MAS (MC1722)",cat:"Ρούχα Εργασίας",brand:"SIR SAFETY",from:22.6,img:"https://safetymaster.gr/wp-content/uploads/2026/06/workwear-work-shorts-sir-safety-fusion-mas-mc1722-front-black-z9.jpg"}
];

/* plausible standards per category */
const SPEC_BY_CAT = {
  "Προστασία Χεριών":"EN 388 · 4131X",
  "Προστασία Ποδιών":"EN ISO 20345 · S3 SRC",
  "Ρούχα Εργασίας":"EN ISO 13688"
};

/* Tabler glyph mapping for the 8 main categories (used in nav + drawer + mega panel header) */
const CAT_GLYPH = {
  "head-protection":"ti-helmet",
  "eye-protection":"ti-eyeglass",
  "respiratory-protection":"ti-lungs",
  "hearing-protection":"ti-ear",
  "hand-protection":"ti-hand-stop",
  "foot-protection":"ti-shoe",
  "workwear-protection":"ti-shirt",
  "fall-protection":"ti-stairs-up"
};

/* Tabler glyph mapping for iconless subcategories (per brief icon table) */
const SUB_GLYPH = {
  // head
  "safety-helmets":"ti-helmet","industrial-climbing-helmets":"ti-helmet","electrically-insulated-helmets":"ti-bolt",
  "forester-safety-helmet":"ti-helmet","firefighter-helmets":"ti-flame","bump-caps":"ti-helmet","head-protection-accessories":"ti-box",
  // eye
  "safety-spectacles":"ti-eyeglass","goggles":"ti-eye","over-spectacles":"ti-eyeglass","faceshields":"ti-shield",
  "welding-shields":"ti-flame","eye-protection-accessories":"ti-box",
  // respiratory
  "filtering-half-masks":"ti-lungs","respirator-half-face-masks":"ti-lungs","respirator-full-face-masks":"ti-lungs",
  "respiratory-filters":"ti-filter","self-contained-breathing-apparatus":"ti-lungs","powered-air-filtering-devices":"ti-lungs",
  "fire-escape-hood":"ti-flame","medical-face-masks":"ti-lungs","fabric-masks":"ti-lungs","respiratory-protection-accessories":"ti-box",
  // hearing
  "ear-defenders":"ti-headphones","ear-plugs":"ti-ear","earplugs-dispensers":"ti-box","hearing-protection-accessories":"ti-box",
  // hand — cohesive ti-hand-stop default; distinct glyph ONLY where it adds real meaning
  "allaround-gloves":"ti-hand-stop","gantia-nitriliou":"ti-hand-stop","nitrile-coated-gloves":"ti-hand-stop",
  "cut-resistant-gloves":"ti-hand-stop","impact-gloves":"ti-hand-stop","antivibration-gloves":"ti-hand-stop",
  "leather-gloves":"ti-hand-stop","welding-gloves":"ti-flame","electrical-gloves":"ti-bolt","chemical-gloves":"ti-flask",
  "thermal-gloves":"ti-temperature","cold-gloves":"ti-snowflake","disposable-gloves":"ti-hand-stop","food-gloves":"ti-hand-stop",
  "esd-gloves":"ti-bolt","armanite-gloves":"ti-hand-stop","rigger-gloves":"ti-hand-stop","chainsaw-gloves":"ti-flame",
  "wildland-firefighting-gloves":"ti-flame","firefighters-gloves":"ti-flame","pesticide-gloves":"ti-flask","safety-sleeves":"ti-hand-stop",
  // fall
  "full-body-harnesses":"ti-body-scan","fall-arrester-systems":"ti-arrow-bar-to-down","retractable-fall-arrester":"ti-arrow-bar-to-down",
  "guided-type-fall-arresters":"ti-arrow-bar-to-down","lanyards":"ti-link","work-positioning-lanyards":"ti-link",
  "energy-absorbers":"ti-arrows-down","work-positioning-belt":"ti-body-scan","sit-harness":"ti-body-scan",
  "anchor-devices":"ti-anchor","connectors":"ti-link","rescue-and-evacuation":"ti-lifebuoy","devices-for-rescue":"ti-lifebuoy",
  "fall-protection-accessories":"ti-box"
};

const CATEGORY_BASE = "https://safetymaster.gr/product-category/";

function fmtPrice(n){ return n.toFixed(2).replace(".", ",") + " €"; }
function subGlyph(slug){ return SUB_GLYPH[slug] || "ti-point"; }

/* icon markup for a subcategory: real PNG if present, else Tabler glyph */
function subIcon(sub, cls){
  if(sub.icon){ return `<img class="${cls||''}" src="${sub.icon}" alt="" loading="lazy">`; }
  return `<i class="ti ${subGlyph(sub.slug)} ${cls||''}"></i>`;
}

/* ============================================================
   MEGA MENU — single "Κατηγορίες" trigger + two-pane panel
   Left rail = 8 main categories; hover/focus swaps the right region.
   Panel is a full-width host (direct child of .header) — no overflow,
   no z-index bleed. Shared hover zone (trigger + panel) with 80ms grace.
   ============================================================ */
function renderMega(){
  const rail  = document.getElementById("megaRail");
  const panes = document.getElementById("megaPanes");
  if(!rail || !panes) return;

  TAXONOMY.categories.forEach((cat, idx) => {
    // ----- left rail item (real shield PNG via cat.icon) -----
    const railIcon = cat.icon
      ? `<img src="${cat.icon}" alt="">`
      : `<i class="ti ${CAT_GLYPH[cat.slug]}"></i>`;
    const railBtn = document.createElement("button");
    railBtn.type = "button";
    railBtn.className = "mega-cat" + (idx === 0 ? " active" : "");
    railBtn.setAttribute("role","tab");
    railBtn.setAttribute("aria-selected", idx === 0 ? "true" : "false");
    railBtn.setAttribute("aria-controls", "megaPane-" + cat.slug);
    railBtn.dataset.cat = cat.slug;
    railBtn.innerHTML = `${railIcon}<span>${cat.name_el}</span><i class="ti ti-chevron-right ct-chev"></i>`;
    rail.appendChild(railBtn);

    // ----- right pane (subcategories of this category) -----
    const countTxt = cat.product_count ? `${cat.product_count} προϊόντα` : "Δείτε τη συλλογή";
    const subs = cat.subcategories.map(sub => `
      <a class="mega-sub" href="${CATEGORY_BASE}${sub.slug}">
        ${subIcon(sub)}
        <span>${sub.name_el}</span>
      </a>`).join("");
    const pane = document.createElement("div");
    pane.className = "mega-pane" + (idx === 0 ? " active" : "");
    pane.id = "megaPane-" + cat.slug;
    pane.setAttribute("role","tabpanel");
    pane.innerHTML = `
      <div class="mega-pane-head">
        <div>
          <h3>${cat.name_el}</h3>
          <div class="pdesc">${cat.desc || ""}</div>
        </div>
        <a class="all-link" href="${CATEGORY_BASE}${cat.slug}">Δείτε όλα (${countTxt}) <i class="ti ti-arrow-right"></i></a>
      </div>
      <div class="mega-cols">${subs}</div>
      <div class="mega-promo">
        <a class="mega-promo-item" href="#solutions">
          <span class="pico"><i class="ti ti-briefcase"></i></span>
          <span class="ptxt">
            <span class="pt-t">Λύσεις ανά εργασία <i class="ti ti-arrow-right"></i></span>
            <span class="pt-d">Εξοπλισμός οργανωμένος ανά τύπο εργασίας</span>
          </span>
        </a>
        <a class="mega-promo-item" href="#b2b">
          <span class="pico"><i class="ti ti-building-warehouse"></i></span>
          <span class="ptxt">
            <span class="pt-t">B2B / Χονδρική <i class="ti ti-arrow-right"></i></span>
            <span class="pt-d">Τιμές χονδρικής και τιμολόγηση για επαγγελματίες</span>
          </span>
        </a>
      </div>`;
    panes.appendChild(pane);

    // swap active pane on hover OR focus of a rail item (no width jitter)
    const activate = () => setActiveCat(cat.slug);
    railBtn.addEventListener("mouseenter", activate);
    railBtn.addEventListener("focus", activate);
  });
}

function setActiveCat(slug){
  document.querySelectorAll(".mega-cat").forEach(b => {
    const on = b.dataset.cat === slug;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
  document.querySelectorAll(".mega-pane").forEach(p => {
    p.classList.toggle("active", p.id === "megaPane-" + slug);
  });
}

let megaTimer;
function openMega(){
  clearTimeout(megaTimer);
  const mega = document.getElementById("megaMenu");
  const trigger = document.getElementById("catTrigger");
  if(!mega) return;
  mega.classList.add("show");
  mega.setAttribute("aria-hidden","false");
  trigger.setAttribute("aria-expanded","true");
}
function closeMega(immediate){
  const run = () => {
    const mega = document.getElementById("megaMenu");
    const trigger = document.getElementById("catTrigger");
    if(!mega) return;
    mega.classList.remove("show");
    mega.setAttribute("aria-hidden","true");
    trigger.setAttribute("aria-expanded","false");
  };
  if(immediate){ clearTimeout(megaTimer); run(); }
  else { megaTimer = setTimeout(run, 80); }   // close grace
}
function megaIsOpen(){
  const m = document.getElementById("megaMenu");
  return m && m.classList.contains("show");
}

function wireMega(){
  const trigger = document.getElementById("catTrigger");
  const mega    = document.getElementById("megaMenu");
  if(!trigger || !mega) return;

  // shared hover zone: enter/leave on BOTH trigger and panel keep it open
  [trigger, mega].forEach(el => {
    el.addEventListener("mouseenter", openMega);
    el.addEventListener("mouseleave", () => closeMega(false));
  });

  // click toggles; keyboard opens + moves focus to first rail item
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if(megaIsOpen()) closeMega(true);
    else { openMega(); focusFirstCat(); }
  });

  // Esc closes and returns focus to the trigger
  mega.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ closeMega(true); trigger.focus(); }
  });
  trigger.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){ closeMega(true); }
    if((e.key === "ArrowDown") && megaIsOpen()){ e.preventDefault(); focusFirstCat(); }
  });

  // arrow-key navigation between rail items
  mega.addEventListener("keydown", (e) => {
    if(e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = [...mega.querySelectorAll(".mega-cat")];
    const i = items.indexOf(document.activeElement);
    if(i === -1) return;
    e.preventDefault();
    const next = e.key === "ArrowDown" ? Math.min(i+1, items.length-1) : Math.max(i-1, 0);
    items[next].focus();
  });

  // click outside closes
  document.addEventListener("click", (e) => {
    if(megaIsOpen() && !mega.contains(e.target) && !trigger.contains(e.target)) closeMega(true);
  });
}

function focusFirstCat(){
  // panel becomes visibility:visible immediately on .show; defer one frame so
  // the focus lands after paint, then move to the active (or first) rail item.
  requestAnimationFrame(() => {
    const active = document.querySelector("#megaRail .mega-cat.active");
    const first = active || document.querySelector("#megaRail .mega-cat");
    if(first){ first.focus({preventScroll:true}); }
  });
}

/* ============================================================
   CATEGORY SHOWCASE — asymmetric (3 deep = featured)
   ============================================================ */
/* Real, subject-verified industrial / PPE imagery — one per category (B5).
   Every URL returns HTTP 200 and was visually confirmed to match its subject. */
const CAT_IMG = {
  "head-protection":        "https://images.unsplash.com/photo-1632516160994-b4463d4e19d2?w=1200&q=80", // worker holding hard hat on site
  "eye-protection":         "https://images.unsplash.com/photo-1528953030358-b0c7de371f1f?w=1200&q=80", // worker in safety glasses grinding metal
  "respiratory-protection": "https://images.unsplash.com/photo-1613620855495-129bee8746b7?w=1200&q=80", // worker in dust mask in plant
  "hearing-protection":     "https://images.unsplash.com/photo-1643704169438-efd6d5707214?w=1200&q=80", // worker wearing ear defenders
  "hand-protection":        "https://images.unsplash.com/photo-1634852836003-c0aa5b67d243?w=1200&q=80", // work gloves on material/workbench
  "foot-protection":        "https://images.unsplash.com/photo-1509099074304-74309ab2af3d?w=1200&q=80", // safety boot on worksite ground
  "workwear-protection":    "https://images.unsplash.com/photo-1681812508281-7589b75b2e46?w=1200&q=80", // worker in hi-vis on rail
  "fall-protection":        "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1200&q=80"  // workers at height on rebar
};

function renderCategories(){
  const grid = document.getElementById("catGrid");
  if(!grid) return;
  const deep = ["hand-protection","foot-protection","workwear-protection"];

  // order: 3 featured first, then the rest
  const ordered = [
    ...TAXONOMY.categories.filter(c => deep.includes(c.slug)),
    ...TAXONOMY.categories.filter(c => !deep.includes(c.slug))
  ];

  ordered.forEach(cat => {
    const isFeat = deep.includes(cat.slug);
    const card = document.createElement("a");
    card.href = CATEGORY_BASE + cat.slug;
    card.className = "cat-card " + (isFeat ? "feat" : "norm");

    const iconMarkup = cat.icon
      ? `<img src="${cat.icon}" alt="">`
      : `<i class="ti ${CAT_GLYPH[cat.slug]}" style="font-size:34px;color:var(--orange)"></i>`;

    const countMarkup = cat.product_count
      ? `<div class="cc-count">${cat.product_count} προϊόντα</div>`
      : `<div class="cc-count empty">Δείτε τη συλλογή</div>`;

    const topSubs = cat.subcategories.slice(0, isFeat ? 6 : 4);
    const subChips = topSubs.map(s =>
      `<span class="cc-sub">${s.name_el}</span>`).join("");
    const more = cat.subcategories.length > topSubs.length
      ? `<span class="cc-more">+${cat.subcategories.length - topSubs.length} ακόμη</span>` : "";

    // EVERY card carries an industrial image now (badge only when count known)
    const img = CAT_IMG[cat.slug];
    const badge = cat.product_count ? `<span class="badge-count">${cat.product_count} προϊόντα</span>` : "";
    const imgMarkup = `<div class="cc-img" style="background-image:url('${img}')">${badge}</div>`;

    card.innerHTML = `
      ${imgMarkup}
      <div class="cc-top">
        <div class="cc-ico">${iconMarkup}</div>
        <div class="cc-meta">
          <div class="cc-name">${cat.name_el}</div>
          ${countMarkup}
        </div>
      </div>
      <div class="cc-subs">${subChips}${more}</div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================================
   FEATURED PRODUCTS + tabs
   ============================================================ */
/* Illustrative color swatches per category (real products come in colors).
   Neutral-ish, hairline-bordered; NO blue/yellow as UI chrome but real
   product colors are allowed. Each entry: [label_el, css-color]. */
const SWATCHES_BY_CAT = {
  "Προστασία Χεριών":[["Μαύρο","#2A2E33"],["Γκρι","#9AA0A6"],["Μπεζ","#D9C9A8"]],
  "Προστασία Ποδιών":[["Μαύρο","#2A2E33"],["Καφέ","#6B4A2B"],["Γκρι","#9AA0A6"]],
  "Ρούχα Εργασίας":[["Μαύρο","#2A2E33"],["Πράσινο","#3B6B45"],["Κόκκινο","#9B3A33"],["Γκρι","#9AA0A6"]]
};

/* A short model/SKU sub-label derived from the product name (illustrative). */
function skuOf(p){
  const m = p.name.match(/[A-Z0-9][A-Z0-9\-]{2,}/);
  return (m ? m[0] : p.name).replace(/\s+/g,"");
}

function productCard(p, variant, idx){
  const spec = SPEC_BY_CAT[p.cat] || "EN / CE";
  const sku = skuOf(p);
  const swatches = SWATCHES_BY_CAT[p.cat] || SWATCHES_BY_CAT["Ρούχα Εργασίας"];

  let badge = "";
  let priceBlock = `
    <span class="from">από</span>
    <span class="price">${fmtPrice(p.from)}</span>
    <small class="vat">(με Φ.Π.Α. 24%)</small>`;

  if(variant === "new"){
    badge = `<span class="badge badge-new">ΝΕΟ</span>`;
  } else if(variant === "sale"){
    const pct = [10,15,20,25][idx % 4];
    const old = p.from / (1 - pct/100);
    badge = `<span class="badge badge-sale">−${pct}%</span>`;
    priceBlock = `
      <span class="from">από</span>
      <span class="old">${fmtPrice(old)}</span>
      <span class="price sale">${fmtPrice(p.from)}</span>
      <small class="vat">(με Φ.Π.Α. 24%)</small>`;
  }

  /* Real, clickable color swatches: each is a <button> with the color name as its
     aria-label; the first is selected by default (aria-pressed="true"). On click the
     selected ring moves; image swap only happens when a real alternate img exists
     (data-img present), otherwise the same image crossfades in as feedback. */
  const swatchRow = swatches.map(([label,color],i) =>
    `<button type="button" class="sw${i===0?" selected":""}" style="--sw:${color}" title="${label}" aria-label="${label}" aria-pressed="${i===0?"true":"false"}"></button>`
  ).join("");

  /* Hover action rail (WoodMart .wd-buttons.wd-pos-r-t). Each button is a real
     <button> with a Greek aria-label and is keyboard-focusable; only its
     opacity/position animate on hover so it is never hidden from assistive tech.
     A visible tooltip chip (.rail-tip) opens to the LEFT on hover/focus. */
  const railTip = (label,glyph) =>
    `<button type="button" class="rail-btn" aria-label="${label}"><i class="ti ${glyph}" aria-hidden="true"></i><span class="rail-tip" aria-hidden="true">${label}</span></button>`;
  const rail = `
    <div class="prod-rail" role="group" aria-label="Ενέργειες προϊόντος">
      ${railTip("Προσθήκη στο καλάθι","ti-shopping-cart")}
      ${railTip("Γρήγορη προβολή","ti-eye")}
      ${railTip("Σύγκριση","ti-arrows-shuffle")}
      ${railTip("Προσθήκη στα αγαπημένα","ti-heart")}
    </div>`;

  return `
    <article class="prod">
      <div class="ph">
        ${badge}
        <a class="ph-link" href="#" tabindex="-1" aria-hidden="true">
          <img class="ph-img" src="${p.img}" alt="${p.name}" loading="lazy">
        </a>
        ${rail}
        <div class="ph-dots" aria-hidden="true"><span class="dot active"></span></div>
      </div>
      <div class="body">
        <div class="brand-lbl">${p.brand}</div>
        <h3 class="pt"><a href="#">${p.name}</a></h3>
        <div class="sku">${sku} · ${spec}</div>
        <div class="swatches" role="group" aria-label="Διαθέσιμα χρώματα">${swatchRow}</div>
        <div class="price-row">${priceBlock}</div>
        <div class="actions">
          <button class="btn btn-primary btn-sm" type="button"><i class="ti ti-shopping-cart" aria-hidden="true"></i> Προσθήκη στο καλάθι</button>
          <a class="b2b-link" href="#"><i class="ti ti-file-invoice" aria-hidden="true"></i> Ζητήστε προσφορά</a>
        </div>
      </div>
    </article>`;
}

function renderProducts(variant){
  const grid = document.getElementById("prodGrid");
  if(!grid) return;
  // Popular = mix; New = a rotated subset; Sale = a rotated subset
  let list = PRODUCTS.slice();
  if(variant === "new"){ list = PRODUCTS.slice(4,12).concat(PRODUCTS.slice(0,2)); }
  if(variant === "sale"){ list = PRODUCTS.slice(2,12).concat(PRODUCTS.slice(0,2)); }
  list = list.slice(0,8);
  const html = list.map((p,i) => productCard(p, variant === "popular" ? "" : variant, i)).join("");
  // Lightweight crossfade on tab switch (fade old out, swap, fade new in).
  if(grid.children.length){
    grid.classList.add("is-fading");
    setTimeout(() => {
      grid.innerHTML = html;
      grid.classList.remove("is-fading");
      wireSwatches();
    }, 160);
  } else {
    grid.innerHTML = html;
    wireSwatches();
  }
}

/* Make color swatches real, keyboard-accessible controls. Selecting a swatch
   moves the orange ring (aria-pressed) and crossfades the product image. The demo
   data has ONE image per product, so we crossfade the SAME src as feedback and
   never inject a guessed URL that could 404. If a real alternate exists on the
   swatch (data-img), it is used instead. */
function wireSwatches(){
  document.querySelectorAll(".prod .swatches").forEach(group => {
    const img = group.closest(".prod").querySelector(".ph-img");
    const sws = [...group.querySelectorAll(".sw")];
    sws.forEach(sw => {
      sw.addEventListener("click", () => {
        if(sw.classList.contains("selected")) return;
        sws.forEach(s => { s.classList.remove("selected"); s.setAttribute("aria-pressed","false"); });
        sw.classList.add("selected");
        sw.setAttribute("aria-pressed","true");
        if(!img) return;
        const next = sw.dataset.img || img.getAttribute("src");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if(reduce){ img.src = next; return; }
        img.classList.add("swapping");          // fade out
        setTimeout(() => {
          img.src = next;                        // swap at the dimmed midpoint
          // fade back in on the next tick (timer, not rAF, so a throttled/background
          // tab can never leave the image stuck invisible)
          setTimeout(() => img.classList.remove("swapping"), 20);
        }, 150);
      });
    });
  });
}

function wireTabs(){
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active","new","sale"));
      tab.classList.add("active");
      const v = tab.dataset.variant;
      if(v === "new") tab.classList.add("new");
      if(v === "sale") tab.classList.add("sale");
      renderProducts(v);
    });
  });
}

/* ============================================================
   BRANDS — premium Swiper carousel (5 real logos, visible at rest)
   with an elegant hover/focus popup card per brand.
   ============================================================ */
let brandSwiper = null;

function renderBrands(){
  const wrap = document.getElementById("brandWrapper");
  if(!wrap) return;
  wrap.innerHTML = TAXONOMY.brands.map(b => `
    <div class="swiper-slide">
      <div class="brand-slide" tabindex="0" role="button" aria-label="${b.name}" aria-haspopup="true" data-brand="${b.name}">
        <img src="${b.logo}" alt="${b.name}" loading="lazy">
        <div class="brand-pop" role="dialog" aria-label="${b.name}">
          <div class="bp-name">${b.name}</div>
          <p class="bp-desc">${b.description || ""}</p>
          <a class="bp-link" href="#">Δείτε προϊόντα <i class="ti ti-arrow-right" aria-hidden="true"></i></a>
        </div>
      </div>
    </div>`).join("");

  initBrandSwiper();
  wireBrandPopups();
}

function initBrandSwiper(){
  if(!window.Swiper) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(brandSwiper){ brandSwiper.destroy(true,true); brandSwiper = null; }
  brandSwiper = new Swiper("#brandSwiper", {
    loop: true,
    speed: 650,
    spaceBetween: 18,
    slidesPerView: 2,
    grabCursor: true,
    autoplay: reduce ? false : {
      delay: 2200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    breakpoints: {
      520:  { slidesPerView: 3 },
      768:  { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1180: { slidesPerView: 5 }
    }
  });
}

/* Hover/focus popup: pause autoplay while open, resume on leave/blur. The popup is
   positioned within the section (section clips overflow) so it never bleeds. */
function wireBrandPopups(){
  const stop = () => { if(brandSwiper && brandSwiper.autoplay) brandSwiper.autoplay.stop(); };
  const start = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(!reduce && brandSwiper && brandSwiper.autoplay) brandSwiper.autoplay.start();
  };
  document.querySelectorAll(".brand-slide").forEach(slide => {
    slide.addEventListener("mouseenter", stop);
    slide.addEventListener("mouseleave", start);
    slide.addEventListener("focusin", stop);
    slide.addEventListener("focusout", start);
    // Esc closes the popup by removing focus from the slide
    slide.addEventListener("keydown", (e) => {
      if(e.key === "Escape"){ slide.blur(); start(); }
    });
  });
}

/* ============================================================
   MOBILE DRAWER — full 8 -> subcategory tree
   ============================================================ */
function renderDrawer(){
  const tree = document.getElementById("drawerTree");
  if(!tree) return;
  TAXONOMY.categories.forEach(cat => {
    const item = document.createElement("div");
    item.className = "dt-item";
    const iconMarkup = cat.icon
      ? `<img class="cat-ico" src="${cat.icon}" alt="">`
      : `<i class="ti ${CAT_GLYPH[cat.slug]} cat-ico-i"></i>`;
    const subs = cat.subcategories.map(s => `
      <a class="dt-sub" href="${CATEGORY_BASE}${s.slug}">${subIcon(s)}<span>${s.name_el}</span></a>`).join("");
    item.innerHTML = `
      <div class="dt-head">
        ${iconMarkup}
        <span>${cat.name_el}</span>
        <i class="ti ti-chevron-down chev"></i>
      </div>
      <div class="dt-subs">
        <a class="dt-sub" href="${CATEGORY_BASE}${cat.slug}" style="color:var(--orange);font-weight:600"><i class="ti ti-arrow-right"></i><span>Δείτε όλα${cat.product_count ? " ("+cat.product_count+")" : ""}</span></a>
        ${subs}
      </div>`;
    tree.appendChild(item);
    item.querySelector(".dt-head").addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

function wireDrawer(){
  const overlay = document.getElementById("drawerOverlay");
  const drawer = document.getElementById("drawer");
  const open = () => { overlay.classList.add("open"); drawer.classList.add("open"); document.body.style.overflow="hidden"; };
  const close = () => { overlay.classList.remove("open"); drawer.classList.remove("open"); document.body.style.overflow=""; };
  document.getElementById("burger").addEventListener("click", open);
  document.getElementById("drawerClose").addEventListener("click", close);
  overlay.addEventListener("click", close);
  // Esc-to-close (B9)
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && drawer.classList.contains("open")) close();
  });
}

/* ============================================================
   SEARCH — functional, over the demo data (no backend)
   Shared implementation for header + hero (+ drawer) inputs.
   ============================================================ */
/* Greek-aware, case + diacritic insensitive normalizer. */
function normGr(s){
  return (s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g,"") // strip accents
    .replace(/ς/g,"σ");                     // final sigma -> sigma
}

/* Build a flat, searchable index once: products + 8 categories + subcategories. */
let SEARCH_INDEX = null;
function buildSearchIndex(){
  if(SEARCH_INDEX) return SEARCH_INDEX;
  const idx = [];
  PRODUCTS.forEach(p => {
    const sku = skuOf(p);
    idx.push({
      type:"product", name:p.name, brand:p.brand, cat:p.cat, sku, img:p.img, from:p.from,
      hay: normGr([p.name, p.brand, p.cat, sku].join(" "))
    });
  });
  TAXONOMY.categories.forEach(cat => {
    idx.push({
      type:"category", name:cat.name_el, slug:cat.slug, glyph:CAT_GLYPH[cat.slug],
      hay: normGr(cat.name_el)
    });
    cat.subcategories.forEach(sub => {
      idx.push({
        type:"subcategory", name:sub.name_el, parent:cat.name_el, slug:sub.slug,
        glyph: subGlyph(sub.slug),
        hay: normGr(sub.name_el + " " + cat.name_el)
      });
    });
  });
  SEARCH_INDEX = idx;
  return idx;
}

function runSearch(q){
  const nq = normGr(q.trim());
  if(!nq) return [];
  return buildSearchIndex()
    .filter(e => e.hay.includes(nq))
    // products first, then categories, then subcategories
    .sort((a,b) => {
      const order = { product:0, category:1, subcategory:2 };
      return order[a.type] - order[b.type];
    });
}

function searchRowHTML(e, i){
  const opt = `role="option" id="sr-${i}" tabindex="-1"`;
  if(e.type === "product"){
    return `<a class="sr sr-prod" href="#" ${opt} data-i="${i}">
      <span class="sr-thumb"><img src="${e.img}" alt="" loading="lazy"></span>
      <span class="sr-main">
        <span class="sr-name">${e.name}</span>
        <span class="sr-meta">${e.brand}</span>
      </span>
      <span class="sr-price mono">από ${fmtPrice(e.from)}</span>
    </a>`;
  }
  const label = e.type === "category" ? "Κατηγορία" : e.parent;
  return `<a class="sr sr-cat" href="#" ${opt} data-i="${i}">
    <span class="sr-ico"><i class="ti ${e.glyph}" aria-hidden="true"></i></span>
    <span class="sr-main">
      <span class="sr-name">${e.name}</span>
      <span class="sr-meta">${label}</span>
    </span>
    <i class="ti ti-arrow-right sr-go" aria-hidden="true"></i>
  </a>`;
}

const SEARCH_CAP = 7;
function wireSearch(){
  const wraps = [...document.querySelectorAll("[data-search]")];
  if(!wraps.length) return;

  wraps.forEach(wrap => {
    const input = wrap.querySelector("input");
    if(!input) return;

    // results panel
    const panel = document.createElement("div");
    panel.className = "search-results";
    panel.setAttribute("role","listbox");
    panel.setAttribute("aria-label","Αποτελέσματα αναζήτησης");
    panel.hidden = true;
    wrap.appendChild(panel);

    let results = [];
    let active = -1;
    let timer;

    const close = () => {
      panel.hidden = true;
      input.setAttribute("aria-expanded","false");
      active = -1;
    };
    const setActive = (n) => {
      const rows = [...panel.querySelectorAll(".sr")];
      if(!rows.length) return;
      active = (n + rows.length) % rows.length;
      rows.forEach((r,i) => r.classList.toggle("active", i === active));
      const el = rows[active];
      el.scrollIntoView({block:"nearest"});
      input.setAttribute("aria-activedescendant", el.id);
    };

    const render = (q) => {
      results = runSearch(q);
      active = -1;
      input.removeAttribute("aria-activedescendant");
      if(!q.trim()){ close(); return; }
      if(!results.length){
        panel.innerHTML = `<div class="sr-empty">Δεν βρέθηκαν αποτελέσματα για <b>"${q.trim().replace(/</g,"&lt;")}"</b></div>`;
      } else {
        const shown = results.slice(0, SEARCH_CAP);
        panel.innerHTML = shown.map((e,i) => searchRowHTML(e,i)).join("")
          + `<a class="sr-all" href="#">Δείτε όλα τα αποτελέσματα (${results.length}) <i class="ti ti-arrow-right" aria-hidden="true"></i></a>`;
      }
      panel.hidden = false;
      input.setAttribute("aria-expanded","true");
    };

    input.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => render(input.value), 120);
    });
    input.addEventListener("focus", () => { if(input.value.trim()) render(input.value); });

    input.addEventListener("keydown", (e) => {
      if(e.key === "Escape"){ close(); return; }
      if(panel.hidden) return;
      if(e.key === "ArrowDown"){ e.preventDefault(); setActive(active + 1); }
      else if(e.key === "ArrowUp"){ e.preventDefault(); setActive(active - 1); }
      else if(e.key === "Enter"){
        const rows = [...panel.querySelectorAll(".sr")];
        if(active > -1 && rows[active]){ e.preventDefault(); rows[active].click(); }
      }
    });

    // pointer hover updates active row for consistent highlight
    panel.addEventListener("mousemove", (e) => {
      const row = e.target.closest(".sr");
      if(!row) return;
      const rows = [...panel.querySelectorAll(".sr")];
      const i = rows.indexOf(row);
      if(i !== active){ active = i; rows.forEach((r,n) => r.classList.toggle("active", n === i)); }
    });

    // outside click / blur closes
    document.addEventListener("click", (e) => {
      if(!wrap.contains(e.target)) close();
    });
  });
}

/* ============================================================
   NEWSLETTER — non-functional submit with a small visual confirmation
   ============================================================ */
function wireNewsletter(){
  const form = document.querySelector(".nl-form");
  if(!form) return;
  const confirmEl = document.getElementById("nlConfirm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    if(input && !input.value.trim()){ input.focus(); return; }
    if(confirmEl){
      confirmEl.innerHTML = `<i class="ti ti-circle-check" aria-hidden="true"></i> Ευχαριστούμε, η εγγραφή σας καταχωρήθηκε.`;
      confirmEl.classList.add("show");
    }
    if(input) input.value = "";
  });
}

/* ============================================================
   STICKY HEADER compression
   ============================================================ */
function wireSticky(){
  const header = document.getElementById("siteHeader");
  // Materialization threshold: the header starts transparent (merged with the hero)
  // and materializes into a solid frosted-glass bar once you scroll past ~30px
  // (roughly when the utility bar scrolls away). This makes the transition dramatic
  // and natural — the header "appears" as you leave the hero zone.
  let ticking = false;
  const apply = () => {
    ticking = false;
    header.classList.toggle("stuck", window.scrollY > 30);
  };
  const onScroll = () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  apply();
}

/* ============================================================
   GSAP hero animation (respects reduced motion)
   ============================================================ */
function heroMotion(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce || !window.gsap) return;
  const tl = gsap.timeline({ defaults:{ ease:"power3.out" }});
  tl.from(".hero .eyebrow", { opacity:0, x:-12, duration:.4 })
    .from(".hero h1", { opacity:0, y:24, duration:.6 }, "-=.2")
    .from(".hero .lead", { opacity:0, y:16, duration:.5 }, "-=.35")
    .from(".hero-search", { opacity:0, y:16, duration:.5 }, "-=.3")
    .from(".hero-chips", { opacity:0, y:12, duration:.45 }, "-=.3")
    .from(".hero-cta", { opacity:0, y:12, duration:.45 }, "-=.35")
    .from(".hero-stats .st", { opacity:0, y:16, duration:.4, stagger:.08 }, "-=.2");
}

/* ============================================================
   FINAL MOTION LAYER — parallax + environmental drift + reveals
   Additive, reduced-motion guarded, single rAF scroll loop.
   Parallax/drift write a CSS custom property (--py/--py2) on DECORATIVE
   CHILD layers only — never on .header, never on a layout box.
   ============================================================ */
const prefersReduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Parallax: one rAF-throttled scroll listener reads scrollY once per frame and
   sets translateY on hero + dark-section decorative layers based on how far each
   section has scrolled through the viewport. Small amplitude, clipped by the
   overflow:hidden parents. No layout/height change; .header is never touched. */
function initParallax(){
  if(prefersReduce()) return;

  // [element, parentSection, rate, cssVar, atTop]
  // rate = fraction of scroll-through distance the layer moves by (the larger the
  // rate, the slower the layer appears vs the foreground). bg and grid get clearly
  // different rates so they separate in depth. `atTop` layers (the hero) are driven
  // directly by scrollY because the hero starts at the very top of the document, so a
  // rectangle-progress model barely moves before it scrolls away.
  const layers = [];
  const hero = document.querySelector(".hero");
  if(hero){
    const bg = hero.querySelector(".bg-img");
    const grid = hero.querySelector(".grid-mask");
    // Clearly visible: bg drifts down ~28% of scroll distance, grid ~14% (half the
    // rate) so the worksite photo and the blueprint grid separate noticeably. The
    // hero is overflow:hidden so this never bleeds or changes page height.
    if(bg)   layers.push({ el:bg,   sec:hero, rate:0.28, varName:"--py",  atTop:true });
    if(grid) layers.push({ el:grid, sec:hero, rate:0.14, varName:"--py2", atTop:true });
  }
  const trust = document.querySelector(".trust");
  if(trust){
    const bp = trust.querySelector(".bp");
    if(bp) layers.push({ el:bp, sec:trust, amp:30, varName:"--py" });
  }
  const nlBox = document.querySelector(".nl-box");
  if(nlBox){
    const grid = nlBox.querySelector(".nl-grid");
    if(grid) layers.push({ el:grid, sec:nlBox, amp:22, varName:"--py" });
  }
  if(!layers.length) return;

  let ticking = false;
  const apply = () => {
    ticking = false;
    const vh = window.innerHeight || 1;
    const sy = window.pageYOffset || document.documentElement.scrollTop || 0;
    layers.forEach(l => {
      let y;
      if(l.atTop){
        // Direct scroll-driven parallax for the top-anchored hero: the layer moves
        // DOWN as you scroll DOWN, slower than the page (rate < 1), giving the
        // classic "background lags the foreground" depth. The travel is capped so
        // the downward drift never exceeds the layer's 12% over-extension headroom
        // (so the bottom edge of the photo can never scroll into view).
        const h = (l.sec.offsetHeight || vh);
        const maxY = h * 0.12;                 // matches the CSS over-extension
        y = Math.min(Math.min(sy, h) * l.rate, maxY);
      } else {
        const r = l.sec.getBoundingClientRect();
        // progress: 0 when the section's top hits the bottom of the viewport,
        // 1 when its bottom passes the top — clamped, centered around 0.5.
        const denom = (r.height + vh) || 1;
        let p = (vh - r.top) / denom;          // 0..1 across the scroll range
        p = Math.max(0, Math.min(1, p));
        y = (p - 0.5) * 2 * l.amp;             // -amp..+amp
      }
      l.el.style.setProperty(l.varName, y.toFixed(2) + "px");
    });
  };
  const onScroll = () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  window.addEventListener("resize", onScroll, { passive:true });
  apply();
}

/* Calm on-enter reveals. Adds .reveal (+ optional stagger index) to section
   heads/content that don't already use AOS, then reveals them via an
   IntersectionObserver adding .in. Reduced-motion: everything is shown at once
   and no classes that animate are added. */
function initReveals(){
  // Targets: section eyebrow+heading blocks and a few content groups that are
  // NOT already AOS-driven. We deliberately skip elements carrying [data-aos]
  // so the two systems never double-animate the same node.
  const heads = [...document.querySelectorAll("section .sec-head .ht")]
    .filter(el => !el.closest("[data-aos]") && !el.querySelector("[data-aos]"));

  // also reveal the trust chips row and footer CTA copy (plain spots)
  const extra = [
    ...document.querySelectorAll(".trust-chips .trust-chip"),
    ...document.querySelectorAll(".footer-cta h2, .footer-cta p, .footer-cta .row")
  ];

  if(prefersReduce()){
    // ensure nothing is left hidden (no .reveal added at all)
    return;
  }

  heads.forEach(el => el.classList.add("reveal"));
  extra.forEach((el,i) => { el.classList.add("reveal"); el.setAttribute("data-r-d", String((i % 3) + 1)); });

  const targets = [...heads, ...extra];
  if(!targets.length || !("IntersectionObserver" in window)){
    targets.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold:0.12, rootMargin:"0px 0px -8% 0px" });
  targets.forEach(el => io.observe(el));
}

/* ============================================================
   AOS
   ============================================================ */
function initAOS(){
  if(window.AOS){
    AOS.init({
      duration: 500,
      easing: "ease-out",
      once: true,
      offset: 60,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderMega();
  wireMega();
  renderCategories();
  renderProducts("popular");
  wireTabs();
  renderBrands();
  renderDrawer();
  wireDrawer();
  wireSearch();
  wireNewsletter();
  wireSticky();
  heroMotion();
  initAOS();
  initParallax();
  initReveals();

  // demo: prevent default on non-functional search submit
  document.querySelectorAll("form.search-form").forEach(f =>
    f.addEventListener("submit", e => e.preventDefault()));

  // BUG FIX (A): bare href="#" anchors scroll the page to the top (amplified by
  // html{scroll-behavior:smooth}), which reads as a "jump" when clicked while the
  // mega menu is open. Delegated guard scoped EXACTLY to href="#" so real category
  // URLs and in-page anchors (#categories/#solutions/#products/#b2b) still work.
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href="#"]');
    if(a) e.preventDefault();
  });
});
