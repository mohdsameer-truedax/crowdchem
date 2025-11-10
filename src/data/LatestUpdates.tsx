type Post = {
    id: number;
    slug: string;
    date: string;
    type: 'twitter' | 'linkedin';
    caption: string;
    url?: string;
    publicUrl?: string;
    hashtags?: string[];
    author?: string;
}
export const getAllPosts: Post[] = [
    {
        "id": 201,
        "slug": "twitter-post-12345",
        "date": "2025-10-27T10:00:00",
        "type": "twitter",
        "caption": "Check out our new thread on React performance! 🚀", 
        "hashtags": ["#ReactJS", "#Performance", "#WebDev"],
        "author": "@h_ikebata",
        "publicUrl": "https://x.com/h_ikebata/status/1914493374838792629"
    },
    {
        "id": 302,
        "slug": "linkedin-crowdchem-1",
        "date": "2025-10-28T09:30:00",
        "type": "linkedin",
        "caption": "At CrowdChem, we pursue excellence in every discovery, combining scientific rigor with cutting-edge AI t",
        "hashtags": ["#materialinnovation", "#ai", "#deeptech", "#aiformaterials", "#technology"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7388875536552366080",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_materialinnovation-ai-deeptech-activity-7388888540371177473-6Y4c?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 303,
        "slug": "linkedin-crowdchem-2",
        "date": "2025-10-30T14:20:00",
        "type": "linkedin",
        "caption": "Data security and confidentiality is at the core of CrowdChem which is why we’re proud to be ISO 27001 certified. ",
        "hashtags": ["#future", "#datasecurity","#AI", "#deeptech" ,"#materialinnovation"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7389625802218164224?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_future-datasecurity-ai-activity-7389625803661070336-3dIr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 304,
        "slug": "linkedin-crowdchem-3",
        "date": "2025-07-05T11:45:00",
        "type": "linkedin",
        "caption": "Exciting news from CrowdChem! After an incredible first month at STATION F in Paris as part of the J-StarX program",
        "hashtags": [ "#CrowdChem", "#JStarX", "#JETRO", "#STATIONF" ,"#TEDxSaclay", "#R&DInnovation", "#AIinChemistry" ,"#MaterialScience", "#DeepTech", "#OpenInnovation", "#EuropeanExpansion", "#AdditiveManufacturing", "#MedTech", "#SustainableInnovation"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7340714995376173056?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_crowdchem-jstarx-jetro-activity-7340715113223520257-COjB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 305,
        "slug": "linkedin-crowdchem-4",
        "date": "2025-03-28T16:00:00",
        "type": "linkedin",
        "caption": "NEW COLUMN: What Are the Challenges in the Practical Implementation of Material",
        "hashtags": ["#Linkedln"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7306137065249812480?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_new-column-what-are-the-challenges-in-the-activity-7306137066050883586-P-rn?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-05-20T10:15:00",
        "type": "linkedin",
        "caption": "CrowdChem PH is now open for full-time & part-time applications! 📥",
        "hashtags": ["#chemistry," ,"#chemistryph" ,"#hiring" ,"#hiringph" ,"#crowdchem"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7336221470076882944?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_chemistry-chemistryph-hiring-activity-7337659712785526785-ecOr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-05-20T10:15:00",
        "type": "linkedin",
        "caption": "🚀 We're excited to be attending hashtag#SubCon2025 this year!",
        "hashtags": ["#SubCon2025" ,"#MaterialsScience" ,"#ChemicalEngineering" ,"#RAndD" ,"#Innovation" ,"#AdvancedManufacturing" ,"#SmartMaterials" ,"#ProductDevelopment" ,"#UKManufacturing" ,"#EngineeringExcellence" ,"#TechInnovation" ,"#LabToMarket" ,"#ManufacturingInnovation" ,"#FutureOfRAndD" ,"#MaterialsInnovation" ,"#ProcessEngineering","#ExhibitorSpotlight"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7333060314831220738?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_subcon2025-subcon2025-materialsscience-activity-7333060316005548034-m7do?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-03-20T10:15:00",
        "type": "linkedin",
        "caption": "Chemical manufacturers often encounter the following obstacles when integrating",
        "hashtags": ["#CrowdChem" ,"#Chemistry" ,"#MaterialsInformatics" ,"#MI" ,"#AI" ,"#startup" ,"#research" ,"#article"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7312312504414519296?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_crowdchem-chemistry-materialsinformatics-activity-7313847825539178498-OAem?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-03-20T10:15:00",
        "type": "linkedin",
        "caption": "Notice of Head Office Relocation (Tokyo, Japan)",
        "hashtags": ["#CrowdChem","#Relocation"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7297810120996966400?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_crowdchem-relocation-activity-7297810122062344194-jHWB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-01-20T10:15:00",
        "type": "linkedin",
        "caption": "New team members at the start of the year✨",
        "hashtags": ["#TeamLunch","#WelcometoCrowdChem"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7289469937838895104?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_teamlunch-welcometocrowdchem-activity-7289469939550142465-uJs0?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-01-20T10:15:00",
        "type": "linkedin",
        "caption": "milli, micro, NANO! CrowdChem to exhibit at nano tech 2025: The 24th Internationa",
        "hashtags": ["#nanotech2025"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7288473036129812480?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_nanotech2025-activity-7288473037136441344-9H_l?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-01-20T10:15:00",
        "type": "linkedin",
        "caption": "Welcome to 2025! The CrowdChem",
        "hashtags": ["#HAPPYNEWYEAR" ,"#LunchMeeting" ,"#NewBegninng"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7285169609060634627?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_happynewyear-lunchmeeting-newbegninng-activity-7285169609928798210-d3LO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-01-01T10:15:00",
        "type": "linkedin",
        "caption": "Happy New Year from CrowdChem! 🎇",
        "hashtags": ["#HAPPYNEWYEAR"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7281897007831531520?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_happynewyear-activity-7281897008766861312-HD0l?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2025-01-01T10:15:00",
        "type": "linkedin",
        "caption": "Thank you for your support in CrowdChem all throughout 2024!",
        "hashtags": ["#ThankYouAll","#ThankYou2024","#BestWishesForTheNewYear"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7278331650948702209?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_thankyouall-thankyou2024-bestwishesforthenewyear-activity-7278331651921780736-sKF6?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
    {
        "id": 306,
        "slug": "linkedin-crowdchem-5",
        "date": "2024-12-23T10:15:00",
        "type": "linkedin",
        "caption": "CrowdChem to Exhibit at Chemical Material Japan 2024,",
        "hashtags": ["#Crowdchem" ,"#chemistry" ,"#startup" ,"#research" ,"#science" ,"#material" ,"#AI" ,"#MI" ,"#MarerialInformatics" ,"#ChemicalMaterialJapan2024"],
        "author": "CrowdChem Company Page",
        "url": "https://www.linkedin.com/embed/feed/update/urn:li:share:7263011714294587393?collapsed=1",
        "publicUrl": "https://www.linkedin.com/posts/crowdchem_crowdchem-chemistry-startup-activity-7263011715418632193-_Y32?utm_source=share&utm_medium=member_desktop&rcm=ACoAADgUdiYBwmDQHuB5mncCGqUcQ4UVEvDw2f4"
    },
]
