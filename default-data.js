/* SHAHID ERP 2.0 - DEFAULT / MASTER DATA
   Separated from application logic.
   This file contains master lists and UI field schemas. Local Charge rates are intentionally NOT factory-seeded; configure them in Local Charges Management.
*/

// ==================== DATA DEFINITIONS ====================
const AIR_MIN_THRESHOLDS = {
    'CARTAGE': 450,
    'MCC': 550,
    'XRAY': 850,
    'GATE PASS': 850
};

const airChargePlaceholders = {
    "AIR FREIGHT": "Min 850 INR",
    "CARTAGE": "Rate per KGS (min 450)",
    "MCC": "Rate per KGS (min 550)",
    "XRAY": "Rate per KGS (min 850)",
    "GATE PASS": "Rate per KGS ×4 (min 850)",
    "PALLETISATION": "₹1,875/pallet (auto)",
    "PLY": "₹1,000/pallet (auto)"
};



// UI field catalog only (charge names; no seeded rates or amounts).
const chargeFieldCatalog = {
    sea: ["FREIGHT", "THC", "SEAL", "MUC", "DOCS", "SEAWAY BL", "ETS", "HAZ DOCS", "AMS", "CFS", "CLEARANCE", "VGM",
        "TOLL", "LASHING & CHOKING", "HAZ STICKER", "TRANSPORTATION", "LOLO", "ON WHEEL", "OTHER LOCALS"
    ],
    air: ["AIR FREIGHT", "CARTAGE", "MCC", "XRAY", "GATE PASS", "ASI GMAX", "CUSTOM CLEARANCE", "TERMINAL TRANSFER",
        "AWB FEES", "TEDI", "AMS", "PALLETISATION", "PLY", "LOADING & UNLOADING", "DG FEES", "DG AGENT FEE",
        "REPACKING", "TRANSPORATION", "ADD.SURCHARGE"
    ],
    lcl: ["FREIGHT", "THC", "MUC", "DOCS", "SEAWAY BL", "HAZ DOCS", "AMS", "CLEARANCE", "VGM"]
};

const chargeCategories = {
    sea: {
        "Freight": ["FREIGHT"],
        "Carrier Charges": ["THC", "SEAL", "MUC", "DOCS", "SEAWAY BL", "ETS", "HAZ DOCS", "AMS"],
        "CFS / Transport Charges": ["CFS", "CLEARANCE", "VGM", "TOLL", "LASHING & CHOKING", "HAZ STICKER",
            "ON WHEEL", "TRANSPORTATION", "LOLO", "OTHER LOCALS"
        ]
    },
    air: {
        "Freight": ["AIR FREIGHT"],
        "Origin Charges": ["CARTAGE", "MCC", "XRAY", "GATE PASS", "ASI GMAX", "AMS", "PALLETISATION", "PLY",
            "LOADING & UNLOADING", "DG FEES", "DG AGENT FEE", "REPACKING", "AWB FEES", "TEDI",
            "ADD.SURCHARGE", "TRANSPORATION"
        ],
        "Local Charges": ["CUSTOM CLEARANCE", "TERMINAL TRANSFER"]
    },
    lcl: {
        "Freight": ["FREIGHT"],
        "Origin Charges": ["THC", "MUC", "DOCS", "SEAWAY BL", "HAZ DOCS", "AMS", "CLEARANCE", "VGM", "CFS", "SEAL", "TOLL", "LOLO", "LASHING & CHOKING", "ON WHEEL", "OTHER LOCALS"]
    }
};


const defaultContainerDimensions = [
    { type: "20 GP", length: "5.898m", width: "2.352m", height: "2.393m", maxWeight: "28,200 kg", cbm: "33.2" },
    { type: "40 GP", length: "12.032m", width: "2.352m", height: "2.393m", maxWeight: "26,580 kg", cbm: "67.7" },
    { type: "40 HC", length: "12.032m", width: "2.352m", height: "2.698m", maxWeight: "26,480 kg", cbm: "76.3" },
    { type: "20 RF", length: "5.444m", width: "2.286m", height: "2.275m", maxWeight: "27,700 kg", cbm: "28.4" },
    { type: "40 RF", length: "11.572m", width: "2.286m", height: "2.275m", maxWeight: "26,500 kg", cbm: "54.3" },
    { type: "20 TK", length: "5.898m", width: "2.352m", height: "2.393m", maxWeight: "24,000 kg", cbm: "33.2" },
    { type: "40 TK", length: "12.032m", width: "2.352m", height: "2.393m", maxWeight: "26,000 kg", cbm: "67.7" }
];

// ==================== EMBEDDED BACKUP DATA (FULL) ====================
const EMBEDDED_BACKUP = {
  "carriers": [
    "MSC", "COSCO", "CMA", "HAPAG", "EVERGREEN", "WAN HAI", "UNI FEEDER", "SAMSARA", "ESL", "AIYER",
    "SCI", "WIN WIN", "SEA BRIDGE", "SEA HORSE", "ECON", "KMTC", "PIL", "OOCL", "SINOKOR", "ONE",
    "SAMUDERA", "HMM", "ANL", "MAERSK", "25", "GOOD RICH", "SEA LEAD", "INTER ASIA", "SIMA MARINE",
    "RCL", "YML", "T S LINE", "33", "BEN LINE", "ZIM", "FESCO", "Z LINE", "SEMA MARINE",
    "QNL / MILAHA", "GIGA", "GOLD", "DGR", "NVOCC", "ALADIN EXP", "SEAPOL", "MAXICON", "RADIANT",
    "HUB & LINK", "TURKON", "GOLDAIR"
  ],
  "pol": [
    "-", "MUMBAI, IN", "AHMEDABAD, IN", "HYDERABAD, IN", "DELHI, IN", "NHAVA SHEVA, IN",
    "MUNDRA, IN", "HAZIRA, IN", "ANKLESWAR, IN", "VADODRA, IN", "PIPAVAV, IN", "CHENNAI, IN",
    "JAIPUR, IN"
  ],
  "pod": [
    "ALGIERS, DZ", "ANNABA, DZ", "ORAN, DZ", "LOBITO, AO", "LUANDA, AO", "BAHIA BLANCA, AR",
    "BUENOS AIRES, AR", "PUERTO BELGRANO, AR", "ROSARIO, AR", "ADELAIDE, AU", "BRISBANE, AU",
    "FREMANTLE, AU", "GLADSTONE, AU", "MELBOURNE, AU", "NEWCASTLE, AU", "PORT HEDLAND, AU",
    "SYDNEY, AU", "VIENNA, AT", "BAHRAIN, BH", "CHATTOGRAM, BD", "ICD DHAKA, BD", "ANTWERP, BE",
    "BELIZE CITY, BZ", "COTONOU, BJ", "FORTALEZA, BR", "ITAJAI, BR", "ITAPOA, BR", "NAVEGANTES, BR",
    "PARANAGUA, BR", "PECEM, BR", "RIO DE JANEIRO, BR", "SANTOS, BR", "SUAPE, BR", "VILA DO CONDE, BR",
    "PHNOM PENH, KH", "SIHANOUKVILLE, KH", "DOUALA, CM", "HALIFAX, CA", "MONTREAL, CA",
    "PRINCE RUPERT, CA", "VANCOUVER, CA", "TORONTO, CA", "ARICA, CL", "IQUIQUE, CL", "SAN ANTONIO, CL",
    "VALPARAISO, CL", "BEICUN, CN", "BEIJAO, CN", "CHANGSHA, CN", "CHANGZHOU, CN", "CHIWAN, CN",
    "CHONGQING, CN", "DALIAN, CN", "DOU MEN, CN", "FOSHAN JIUJIANG, CN", "GAOMING, CN", "GAOYAO, CN",
    "GAOLAN, CN", "GAOSHA, CN", "HAIKOU, CN", "HEFEI, CN", "HONGWAN, CN", "HUADU, CN", "HUANGPU, CN",
    "HUMEN, CN", "JIANGMEN, CN", "JIANGYIN, CN", "JIAOXIN, CN", "JIUJIANG, CN", "LIANHUA SHAN, CN",
    "LIANYUNGANG, CN", "MAWEI, CN", "NANCHANG, CN", "NANJING, CN", "NANSHA, CN", "NANTONG, CN",
    "NINGBO, CN", "PSA DONGGUAN, CN", "QINGDAO, CN", "QINGYUAN, CN", "QINZHOU, CN", "SANSHAN, CN",
    "SANSHUI, CN", "SHANGHAI, CN", "SHANTOU, CN", "SHATIAN, CN", "SHEKOU, CN", "SHENZHEN, CN",
    "SHUNDE LELIU, CN", "SHUNDE NEW PORT, CN", "SI HUI, CN", "TAICANG, CN", "TIANJIN, CN",
    "XINGANG, CN", "WENZHOU, CN", "WU ZHOU, CN", "WUHAN, CN", "WUHU, CN", "XIAMEN, CN",
    "XIAOLAN, CN", "XINHUI, CN", "YANGZHOU, CN", "YANGPU, CN", "YANTIAN, CN", "YICHANG, CN",
    "YUEYANG, CN", "ZHANGJIAGANG, CN", "ZHANJIANG, CN", "ZHAOQING, CN", "ZHAPU, CN", "ZHONGSHAN, CN",
    "BARRANQUILLA, CO", "BUENAVENTURA, CO", "CARTAGENA, CO", "COMUNION, CO", "MATADI, CD",
    "POINTE-NOIRE, CG", "PUERTO CALDERA, CR", "PUERTO LIMON, CR", "HAVANA, CU", "MARIEL, CU",
    "ESBJERG, DK", "AARHUS, DK", "DJIBOUTI, DJ", "CAUCEDO, DO", "GUAYAQUIL, EC", "MANTA, EC",
    "PUERTO BOLIVAR, EC", "AL SOKHNA, EG", "ALEXANDRIA, EG", "DAMIETTA, EG", "PORT SAID, EG",
    "ACAJUTLA, SV", "MASSAWA, ER", "HELSINKI, FI", "FOS SUR MER, FR", "LE HAVRE, FR", "MARSEILLE, FR",
    "LIBREVILLE, GA", "BREMERHAVEN, DE", "HAMBURG, DE", "ACCRA (TEMA), GH", "TAKORADI, GH",
    "HERAKLION, GR", "PIRAEUS, GR", "THESSALONIKI, GR", "PUERTO QUETZAL, GT", "CONAKRY, GN",
    "MALABO, GQ", "PUERTO CORTES, HN", "HONG KONG, HK", "BUDAPEST, HU", "BALIKPAPAN, ID",
    "BATAM, ID", "BELAWAN, ID", "JAKARTA, ID", "PALEMBANG, ID", "PANJANG, ID", "PONTIANAK, ID",
    "SEMARANG, ID", "SURABAYA, ID", "BANDAR ABBAS, IR", "CHABAHAR, IR", "BUSHEHR, IR", "BASRA, IQ",
    "UMM QASR, IQ", "ASHDOD, IL", "HAIFA, IL", "GENOA, IT", "GIOIA TAURO, IT", "NAPLES, IT",
    "RAVENNA, IT", "TRIESTE, IT", "LA SPEZIA, IT", "LIVORNO, IT", "TARANTO, IT", "ABIDJAN, CI",
    "SAN PEDRO, CI", "KINGSTON, JM", "FUKUYAMA, JP", "HAKATA, JP", "HIROSHIMA, JP", "KAWASAKI, JP",
    "KOBE, JP", "MATSUYAMA, JP", "MIZUSHIMA, JP", "MOJI, JP", "NAGOYA, JP", "OSAKA, JP",
    "SENDAI, JP", "SHIMIZU, JP", "TOKYO, JP", "YOKKAICHI, JP", "YOKOHAMA, JP", "LAMU, KE",
    "MOMBASA, KE", "NAIROBI, KE", "KUWAIT, KW", "SHUAIBA, KW", "RIGA, LV", "KLAIPEDA, LT",
    "TOAMASINA, MG", "BINTULU, MY", "KOTA KINABALU, MY", "KUCHING, MY", "MIRI, MY",
    "PASIR GUDANG, MY", "PENANG, MY", "PORT KLANG, MY", "SANDAKAN, MY", "SIBU, MY",
    "TANJUNG PELEPAS, MY", "TAWAO, MY", "MALTA FREEPORT, MT", "PORT LOUIS, MU", "ALTAMIRA, MX",
    "ENSENADA, MX", "LAZARO CARDENAS, MX", "MANZANILLO, MX", "TAMPICO, MX", "VERACRUZ, MX",
    "AGADIR, MA", "CASABLANCA, MA", "TANGER MED, MA", "BEIRA, MZ", "MAPUTO, MZ", "NACALA, MZ",
    "YANGON, MM", "ROTTERDAM, NL", "AUCKLAND, NZ", "LYTTELTON, NZ", "NAPIER, NZ", "TAURANGA, NZ",
    "WELLINGTON, NZ", "CORINTO, NI", "LAGOS, NG", "APAPA, NG", "ONNE, NG", "PORT HARCOURT, NG",
    "OSLO, NO", "STAVANGER, NO", "SALALAH, OM", "SOHAR, OM", "KARACHI, PK", "CALLAO, PE",
    "CHIMBOTE, PE", "MATARANI, PE", "PAITA, PE", "BATANGAS, PH", "CAGAYAN DE ORO, PH", "CEBU, PH",
    "DAVAO, PH", "GENERAL SANTOS, PH", "MANILA NORTH, PH", "MANILA SOUTH, PH", "MANILA, PH",
    "SUBIC BAY, PH", "GDANSK, PL", "GDYNIA, PL", "LISBON, PT", "SINES, PT", "HAMAD, QA",
    "CONSTANTA, RO", "NOVOROSSIYSK, RU", "ST PETERSBURG, RU", "VLADIVOSTOK, RU", "DAMMAM, SA",
    "JEDDAH, SA", "RIYADH, SA", "YANBU, SA", "DAKAR, SN", "SINGAPORE, SG", "BERBERA, SO",
    "BOSASO, SO", "KISMAYO, SO", "MERCA, SO", "MOGADISHU, SO", "CAPE TOWN, ZA", "DURBAN, ZA",
    "JOHANNESBURG, ZA", "PORT ELIZABETH, ZA", "RICHARDS BAY, ZA", "BUSAN, KR", "GWANGYANG, KR",
    "INCHON, KR", "ULSAN, KR", "ALGECIRAS, ES", "BARCELONA, ES", "BILBAO, ES", "VALENCIA, ES",
    "VIGO, ES", "COLOMBO, LK", "HAMBANTOTA, LK", "PORT SUDAN, SD", "GOTHENBURG, SE", "KAOHSIUNG, TW",
    "KEELUNG, TW", "TAICHUNG, TW", "TAIPEI, TW", "TAOYUAN, TW", "BAGAMOYO, TZ", "DAR ES SALAAM, TZ",
    "ZANZIBAR, TZ", "BANGKOK PAT, TH", "BANGKOK, TH", "LAEM CHABANG, TH", "LAT KRABANG, TH",
    "LOME, TG", "BIZERTE, TN", "RADES, TN", "SFAX, TN", "GABZE, TR", "GEMLIK, TR", "ISKENDERUN, TR",
    "ISTANBUL, TR", "IZMIR, TR", "IZMIT, TR", "MERSIN, TR", "ABU DHABI, AE", "JEBEL ALI, AE",
    "KHALIFA PORT, AE", "SHARJAH, AE", "FELIXSTOWE, GB", "LIVERPOOL, GB", "LONDON GATEWAY, GB",
    "SOUTHAMPTON, GB", "MONTEVIDEO, UY", "NUEVA PALMIRA, UY", "LONG BEACH, US", "LOS ANGELES, US",
    "OAKLAND, US", "SEATTLE, US", "TACOMA, US", "PORTLAND, US", "SAN DIEGO, US", "NEW YORK, US",
    "NEW JERSEY, US", "SAVANNAH, US", "NORFOLK, VA", "CHARLESTON, US", "JACKSONVILLE, US",
    "BALTIMORE, US", "COLUMBUS, OH", "BOSTON, US", "HOUSTON, US", "GALVESTON, US", "FREEPORT, US",
    "MOBILE, US", "MIAMI, US", "PORT EVERGLADES, US", "TAMPA, US", "NEW ORLEANS, US", "NORFOLK, US",
    "PHILADELPHIA, US", "CHICAGO, US", "KINGSBURY, US", "DALLAS, US", "MEMPHIS, US",
    "MINNEAPOLIS, US", "ATLANTA, US", "KANSAS CITY, US", "LA GUAIRA, VE", "MARACAIBO, VE",
    "PUERTO CABELLO, VE", "CAI MEP, VN", "CAT LAI, VN", "DANANG, VN", "HAIPHONG, VN",
    "HO CHI MINH, VN", "PHUOC LONG ICD, VN", "QUY NHON, VN", "VUNG TAU, VN", "ADEN, YE",
    "AL HODEIDAH, YE", "AL MUKALLA, YE", "ASH SHIHR, YE", "MOKHA, YE", "NASHTOON, YE",
    "RAS ISA, YE", "SALEEF, YE", "SOCOTRA, YE", "MUARA, BN", "SAN JUAN, PR", "TAMATAVE, MG",
    "LEIXOES, PT", "PORT OF SPAIN", "BRIDGETOWN, BB", "PARANGUA, BR", "BEIRUT, LB",
    "LOUISVILLE, KY", "NOUAKCHOTT, MR", "FUJAIRAH, AE", "KHOR FAKKAN, AE", "AQABA, JD",
    "INDIANAPOLIS, US", "KOPER, SI"
  ],
  "incoterms": ["EXW", "FOB", "CIF", "CFR", "DAP", "DDP", "FCA", "CPT"],
  "containers": ["20 GP", "40 GP", "40 HC", "20 RF", "40 RF", "20 TK", "40 TK"],
  "containerDimensions": [
    {"type":"20 GP","length":5.898,"width":2.352,"height":2.393,"maxWeight":28200,"cbm":33.2,"tareWeight":"0 kg","unit":"m"},
    {"type":"40 GP","length":12.032,"width":2.352,"height":2.393,"maxWeight":26580,"cbm":67.7,"tareWeight":"0 kg","unit":"m"},
    {"type":"40 HC","length":12.032,"width":2.352,"height":2.698,"maxWeight":26480,"cbm":76.3,"tareWeight":"0 kg","unit":"m"},
    {"type":"20 RF","length":5.444,"width":2.286,"height":2.275,"maxWeight":27700,"cbm":28.4,"tareWeight":"0 kg","unit":"m"},
    {"type":"40 RF","length":11.572,"width":2.286,"height":2.275,"maxWeight":26500,"cbm":54.3,"tareWeight":"0 kg","unit":"m"},
    {"type":"20 TK","length":5.898,"width":2.352,"height":2.393,"maxWeight":24000,"cbm":33.2,"tareWeight":"0 kg","unit":"m"},
    {"type":"40 TK","length":12.032,"width":2.352,"height":2.393,"maxWeight":26000,"cbm":67.7,"tareWeight":"0 kg","unit":"m"}
  ],
  "companyName": "GATEWAY EXIM",
  "companyAddress": "OFFICE NO.523, TOWER 1A, 73, EAST AVENUE, NR. GENDA CIRCLE, SARA BHAI CAMPUS, VADODARA, GUJARAT 390007 - INDIA",
  "defaultUser": "Shaikh Shahid",
  "exchangeRates": {"USD":97,"GBP":105.2,"RMB":11.5,"EUR":90.1,"AED":22.75,"INR":1},
  "defaultSeaCharges": [],
  "defaultAirCharges": [],
  "defaultLclCharges": [],
  "carrierChargesSeaLcl": [],
  "carrierChargesAir": [],
  "drafts": {"sea":[],"air":[],"lcl":[]},
  "rates": {"sea":[],"air":[],"lcl":[]},
  "rateSheet": [],
  "hiddenItems": {"pol":[],"pod":[],"incoterms":[],"containers":[],"carriers":[]},
  "theme": "light",
  "lastBackup": "2026-07-30T18:09:22.760Z",
  "duplicateDetectionDays": 30,
  "navState": {"expandedCategories":["newQuote","quoteSheet","dsrCat","reports","admin"],"lastTab":"database"},
  "shipments": [],
  "bldrafts": [],
  "cargoStatusMaster": ["RATES REQUESTED","RATES RECEIVED","RATES QUOTED","INQUERY","LOST","NO SERVICE","HIGH RATES","RATES APPROVED","BOOKING PLACED","BOOKING RECEIVED","BOOKING SENT","CARGO PICKED","TRANSPORATION","AT CFS","UNDER CLEARANCE","CONTAINER GATEIN","BY ROAD MOVEMENT","BY RAIL MOVEMENT","SOB DONE","COMPLETED","PLANNING","DUPLICATE"],
  "docsStatusMaster": ["DOCS RECEIVED","CHECKLIST PENDING","CHECKLIST SHARED","CHECKLIST CORRECTION","CHECKLIST APPROVED","LEO RECEIVED","SI SUBMITED","DRAFT SHARED","BL CORRECTION","BL APPROVED","SELL GIVEN","INVOICE PENDING","PERFORMA INVOICE SENT","INVOICE APPROVED","TAX INVOICE SEND"],
  "users": [{"id":"SHAIKH SHAHID","name":"SHAIKH SHAHID","role":"master","permissions":"all","passwordHashV2":"uO7BE596c/idbk+G5//B0ijdsExbUSjznNZgqNo2fWo=","passwordSalt":"V+tjwhYel8JuFhFTNivR+w==","passwordHash":null},{"id":"SHAIKH SHADAB","name":"SHAIKH SHADAB","role":"dsr_user","permissions":["dsr","bldraft","data-backup","planner"],"passwordHashV2":"BVEUiRf1YOQizxVGCklvHUz3DSvhXEByKZlQtEGeAxU=","passwordSalt":"CiJHgU+ZOogrkQ/NWaeddw==","passwordHash":null},{"id":"SUBHASH ROY","name":"SUBHASH ROY","role":"user","permissions":["raterequest","export-quote","rrdrafts","drafts","rates","ratesheet","reporting","measurement","routing","localcharges","data-backup","planner"],"passwordHashV2":"J5mD9aibCIJYhZ2qs4qK+U4Fg21/fXoUnzi99OoWEjg=","passwordSalt":"tAez5NLg3lzeMTDJ0nwdYQ==","passwordHash":null},{"id":"KUNJ PATEL","name":"KUNJ PATEL","role":"user","permissions":["raterequest","export-quote","rrdrafts","drafts","rates","ratesheet","reporting","measurement","routing","localcharges","data-backup","planner"],"passwordHashV2":"9hH8/BdihueRFoxUH1OqgQbPAos3bVty4eFyAFsm/sU=","passwordSalt":"19azcmBVr+ymmQPHo8K4bg==","passwordHash":null},{"id":"MEHUL","name":"MEHUL","role":"user","permissions":["dsr","bldraft","data-backup","planner"],"passwordHashV2":"L8dwI0BsBAUY7Phox5gIB+350+ZF29DmnvQ9na1RvwQ=","passwordSalt":"DHOYfyyZhStLhb1Eh9iZRw==","passwordHash":null},{"id":"RAHUL BORSE","name":"RAHUL BORSE","role":"user","permissions":["raterequest","import-quote","rrdrafts","drafts","rates","ratesheet","dsr","bldraft","reporting","measurement","routing","localcharges","data-backup","planner"],"passwordHashV2":"Lk+bqUT6JbtXIeMsvep/z8Oro5J6Y9mNqlS/m3m5xfk=","passwordSalt":"DSuh0q4Wk/vrj6QvB/kOaQ==","passwordHash":null},{"id":"RAJAN JOSHI","name":"RAJAN JOSHI","role":"master","permissions":"all","passwordHashV2":"v8CAHbcvrVnhs9wFk3v63o+zMjjh7YnwAxOlo7OdYBo=","passwordSalt":"KolntAdr9E2vsYkPyS1uJw==","passwordHash":null},{"id":"DHARMESH V.","name":"DHARMESH V.","role":"master","permissions":"all","passwordHashV2":"RzNTtbTYACtuaTKW40oqBmVhvcaoKqs+GueiBUbksLQ=","passwordSalt":"WmMlgAeqJxodYdRxJRhPvQ==","passwordHash":null}],
  "defaults": {"gst":18,"insurance":0.05,"profitMargin":15,"defaultCurrency":"USD","usDuty":0,"usTariff":0,"usMPF":0.3464,"usHMF":0.125,"inDuty":7.5,"inSocialWelfare":10,"drawback":0,"rodtep":0},
  "stuffing": [],
  "truckingShipments": [],
  "detentionLots": [
    {"id":"lot-1","name":"20 GP Standard","freeDays":5,"slabs":[{"from":1,"to":5,"rate":10},{"from":6,"to":10,"rate":30},{"from":11,"to":20,"rate":50},{"from":21,"to":30,"rate":70},{"from":31,"to":999,"rate":100}]},
    {"id":"lot-2","name":"40 GP Standard","freeDays":5,"slabs":[{"from":1,"to":5,"rate":10},{"from":6,"to":10,"rate":30},{"from":11,"to":20,"rate":50},{"from":21,"to":30,"rate":70},{"from":31,"to":999,"rate":100}]},
    {"id":"lot-3","name":"40 HC Standard","freeDays":5,"slabs":[{"from":1,"to":5,"rate":10},{"from":6,"to":10,"rate":30},{"from":11,"to":20,"rate":50},{"from":21,"to":30,"rate":70},{"from":31,"to":999,"rate":100}]},
    {"id":"lot-4","name":"Reefer 20 RF","freeDays":3,"slabs":[{"from":1,"to":5,"rate":10},{"from":6,"to":10,"rate":30},{"from":11,"to":20,"rate":50},{"from":21,"to":30,"rate":70},{"from":31,"to":999,"rate":100}]},
    {"id":"lot-5","name":"Reefer 40 RF","freeDays":3,"slabs":[{"from":1,"to":5,"rate":10},{"from":6,"to":10,"rate":30},{"from":11,"to":20,"rate":50},{"from":21,"to":30,"rate":70},{"from":31,"to":999,"rate":100}]}
  ],
  "detentionRecords": [],
  "freightCalculations": [],
  "plannerNotes": [],
  "plannerTasks": []
};




// ==================== USER ACCESS DEFAULT STRUCTURE ====================
// Mirrors the actual left-sidebar navigation. Permission values are the real data-tab IDs.
const DEFAULT_USER_ACCESS_GROUPS = [
  {
    key: 'newQuote',
    title: 'A. 📝 NEW QUOTE',
    items: [
      { id: 'raterequest', label: '📩 Rate Request' },
      { id: 'export-quote', label: '📤 Export Quote' },
      { id: 'import-quote', label: '📥 Import Quote' }
    ]
  },
  {
    key: 'quoteSheet',
    title: 'B. 💾 QUOTE & RATE SHEET',
    items: [
      { id: 'rrdrafts', label: '📩 Rate Requested' },
      { id: 'drafts', label: '📝 Drafts' },
      { id: 'rates', label: '💰 Rates Quoted' },
      { id: 'ratesheet', label: '📋 Rate Sheet' }
    ]
  },
  {
    key: 'dsrCat',
    title: 'C. 📊 DSR',
    items: [
      { id: 'dsr', label: '🚢 Shipment List' },
      { id: 'bldraft', label: '📄 BL Draft' },
      { id: 'invoice', label: '🧾 Invoice' }
    ]
  },
  {
    key: 'reports',
    title: 'D. 📈 REPORTS',
    items: [
      { id: 'finance', label: '💳 Finance & Accounts' },
      { id: 'planner', label: '📅 Planner' },
      { id: 'reporting', label: '📊 Reporting' },
      { id: 'measurement', label: '📏 Measurement' }
    ]
  },
  {
    key: 'admin',
    title: 'E. ⚙️ ADMIN',
    items: [
      { id: 'routing', label: '🧭 Routing' },
      { id: 'database', label: '🗄️ Database' },
      { id: 'localcharges', label: '📋 Local Charges' }
    ]
  }
];

// Default access configuration is kept in the separate default-data.js file.
// Master user remains full-access; new normal users start with no selected tabs.
const DEFAULT_USER_ACCESS = {
  groups: DEFAULT_USER_ACCESS_GROUPS,
  newUserPermissions: []
};

// Expose the access configuration through the default embedded application state as well.
EMBEDDED_BACKUP.userAccessGroups = DEFAULT_USER_ACCESS_GROUPS;
EMBEDDED_BACKUP.defaultUserAccess = DEFAULT_USER_ACCESS;
