const NATIONALITE = {
    0: "Bénin",
    1: "Burkina",
    2: "Côte d'Ivoire",
    3: "Gambie",
    4: "Ghana",
    5: "Guinée",
    6: "Guinée-Bissau",
    7: "Liberia",
    8: "Mali",
    9: "Niger",
    10: "Nigeria",
    11: "Sénégal",
    12: "Sierra Leone",
    13: "Togo",
    53: "Cap-Vert",


    15: "Cameroun",
    16: "Gabon",
    17: "Guinée équatoriale",
    18: "République Démocratique du Congo",
    37: "République du Congo",
    19: "São Tomé-et-Príncipe",
    20: "Tchad",
    21: "République centrafricaine",


    22: "Erythrée",
    23: "Kenya",
    24: "Ouganda",
    25: "Rwanda",
    27: "Sud-Soudan",
    28: "Tanzanie",
    29: "Burundi",
    30: "Djibouti",
    31: "Somalie",
    38: "Seychelles",
    54: "Soudan du Sud",


    32: "Maroc",
    33: "Algérie",
    34: "Tunisie",
    35: "Libye",
    36: "Égypte",
    14: "Mauritanie",
    26: "Soudan",


    39: "Afrique du Sud",
    41: "Angola",
    42: "Botswana",
    43: "Lesotho",
    44: "Malawi",
    45: "Mozambique",
    46: "Namibie",
    47: "Swaziland",
    48: "Zambie",
    49: "Zimbabwe",
    50: "Madagascar",
    51: "Eswatini",
    52: "Maurice",
    55: "Autres"
}

const REGION_LIST = {
    0: 'DAKAR',
    1: 'DIOURBEL',
    2: 'FATICK',
    3: 'KAFFRINE',
    4: 'KAOLACK',
    5: 'KEDOUGOU',
    6: 'KOLDA',
    7: 'LOUGA',
    8: 'MATAM',
    9: 'SAINT-LOUIS',
    10: 'SEDHIOU',
    11: 'TAMBACOUNDA',
    12: 'THIES',
    13: 'ZINGUINCHOR'
}

const DEPARTEMENT = {
    //Dakar
    0: {
        0: 'Dakar',
        1: 'Guédiawaye',
        2: 'Pikine',
        3: 'Rufisque',
    },


    //Diourbel
    1:{
        4: 'Bambey',
        5: 'Diourbel',
        6: 'Mbacké',
    },


    //Fatick
    2: {
        7: 'Fatick',
        8: 'Foundiougne',
        9: 'Gossas',
    },


    //KAOLACK
    4: {
        10: 'Kaolack',
        11: 'Guinguinéo',
        12: 'Nioro du Rip',
    },

    //Kolda
    6: {
        13: 'Kolda',
        14: 'Vélingara',
        15: 'Médina Yoro Foulah',
    },

    //Louga
    7: {
        16: 'Kébémer',
        17: 'Linguère',
        18: 'Louga',
    },


    //Matam
    8: {
        19: 'Kanel',
        20: 'Matam',
        21: 'Ranérou',
    },


    //Saint-louis
    9: {
        22: 'Dagana',
        23: 'Podor',
        24: 'Saint-Louis',
    },


    //Tambacounda
    11: {
        25: 'Bakel',
        26: 'Koumpentoum',
        27: 'Tambacounda',
        28: 'Goudiry',
    },


    //Thies
    12: {
        29: 'Mbour',
        30: 'Thiès',
        31: 'Tivaouane',
    },


    //Ziguinchor
    13: {
        32: 'Bignogna',
        33: 'Oussouye',
        34: 'Ziguinchor',
    },


    //Kaffrine
    3: {
        35: 'Birkilane',
        36: 'Kaffrine',
        37: 'Malem-Hodar',
        38: 'Kounghel',
    },


    //Kedougou
    5: {
        39: 'Kédougou',
        40: 'Salemata',
        41: 'Saraya',
    },


    //Sédhiou
    10: {
        42: 'Bounkiling',
        43: 'Goudomp',
        44: 'Sédhiou'
    }
}

const TYPE = {
    0: 'Candidat officiel au bac',
    1: 'Candidat libre',
    2: 'Bachelier'
}
const SERIE = {
    1: 'S1',
    2: 'S2',
    3: 'S3',
    4: 'T1',
    5: 'T2'
}
const FILIERE = {
    1: 'GENIE CIVIL',
    2: 'GENIE ELECTROMECANIQUE',
    3: 'GENIE AERONAUTIQUE',
    4: 'GENIE INFORMATIQUE ET TELECOMMUNICATIONS'
}

const MENTION = {
    0: "EXCELLENTE",
    1: "TRÈS-BIEN",
    2: "BIEN",
    3: "ASSEZ-BIEN",
    4: "PASSABLE"
}

const TYPE_JUSTIF = {
    0: 'BULLETIN',
    1: 'RELEVE'
}

const CLASSE = {
    0: 'TERMINALE',
    1: 'PREMIERE',
    2: 'SECONDE'
}

const STATE = {
    1: 'inscription',
    2: 'concours',
    3: 'final'
}
const CENTRE = {
    'UCAD': 'Faculté Medecine UCAD',
    'LYMAMOULAYE': 'Lycée Seydina Lymamoulaye de DAKAR',
    'SADJI': 'Lycée Abdoulaye Sadji RUFISQUE',
    'LTAB': 'Lycée Technique Ahmadou Bamba de DIOURBEL',
    'CND_FATICK': 'Lycée Coumba Ndoffene Diouf de FATICK',
    'VND_KAOLACK': 'Lycée Valdiodio Ndiaye de KAOLACK',
    'LMS_LOUGA': 'Lycée Malick Sall de LOUGA',
    'LAS_TIVAOUANE': 'Lycee Ababacar Sy de TIVAOUANE',
    'LM_MATAM': 'Lycée de MATAM',
    'LDD_MBOUR': 'Lycée Demba Diop de MBOUR',
    'LAP_ST_LOUIS': 'Lycée Technique André Peytavin de SAINT-LOUIS',
    'LMCMB_TAMBA': 'Lycée Mame Cheikh Mbaye de TAMBACOUNDA',
    'LMB_KEDOUGOU': 'Lycée Maciré Ba de KEDOUGOU',
    'LMS_THIES': 'Lycée Malick Sy de THIES',
    'LDJZ_ZIGUINCHOR': 'Lycée Djignabo de ZIGUINCHOR',
    'LEBND_PODOR': 'Lycée El Hadj Baba Ndiongue de PODOR',
    'LAMB_KOLDA': 'Lycee Alpha Molo Balde de KOLDA'
}
const SEXE = {
    "M": "HOMME",
    "F": "FEMME"
}
const all = {
    NATIONALITE,
    REGION_LIST,
    TYPE,
    SERIE,
    FILIERE,
    MENTION,
    TYPE_JUSTIF,
    CLASSE,
    STATE,
    CENTRE,
    SEXE,
    DEPARTEMENT
}

export default all;