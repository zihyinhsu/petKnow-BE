import {
  catRecipes,
  catBehaviorTrainings,
  catFeeding,
  catBreed,
  catHealthCheckTips,
  catGames,
  catEating,
} from './catData.test';
import {
  dogTrainings,
  dogBreeding,
  dogBreed,
  dogHealthCheckTips,
  dogGames,
  dogEating,
} from './dogData.test';
import {
  petCommunications,
  petBaths,
  petHotelTrainings,
  handmadePetTreats,
  petCareBasics,
  petNutrition,
  petHealthCare,
  petPsychology,
  petStressRelief,
  petBehaviorProblemSolving,
  petCommunication,
  petSafety,
  petGrooming,
  petTravel,
  petAgingCare,
  qualityOfLifeForPets,
} from './petData.test';

const shortDescriptions = [
  '這堂課將教您如何建立與狗狗的良好關係，並訓練基本的指令。我們將探討正確的獎勵和糾正方法，幫助您培養狗狗的良好行為和禮儀。',
  '這堂課將教您如何幫助狗狗建立正確的社交技巧。我們將探討適應新環境、與其他狗狗和人互動的方法，讓您的狗狗成為社交得體的寵物。',
  '這堂課將教您如何選擇適合的狗糧，並提供營養均衡的飲食建議。我們將討論飲食需求、餵食時間和食物選擇，確保您的狗狗獲得健康的營養。',
  '這堂課將介紹適當的運動和活動方式，以保持狗狗的健康和活力。我們將討論適合不同品種和年齡的運動選項，並提供有趣的遊戲和訓練建議。',
  '這堂課將教您如何照顧狗狗的健康和護理需求。我們將探討常見的健康問題預防、疫苗接種和定期檢查的重要性，以確保您的狗狗保持健康和快樂。',
];

const descriptions = [
  `<p>在這堂課中，我們將介紹狗狗的基本養育需求，幫助您了解如何照顧一隻健康快樂的狗狗。</p>
<ul>
  <li>狗狗的飲食需求：選擇適合的狗糧種類和餵食方式。</li>
  <li>適合的住所環境：提供舒適的睡覺空間和適合運動的戶外區域。</li>
  <li>定期醫療護理：疫苗接種、定期驅蟲和常見疾病預防。</li>
  <li>適度的運動和遊戲：維持狗狗的身體健康和心理活躍。</li>
</ul>
<p>透過這些基本養育需求的認識，您將能夠提供一個健康快樂的生活環境給您的狗狗。</p>`,
  `<p>社交化是狗狗成長中極為重要的一部分，它可以幫助狗狗建立良好的社交技巧和行為。</p>
<ul>
  <li>與人類的社交化：如何讓狗狗適應不同人的接觸和互動。</li>
  <li>與其他狗狗的社交化：引導狗狗學習如何與其他狗狗相處和玩耍。</li>
  <li>社交化訓練技巧：使用正面強化法培養狗狗的良好行為。</li>
</ul>
<p>透過社交化訓練，您的狗狗將能夠在不同的社交場景中表現自信並與其他人和狗狗和睦相處。</p>`,
  `<ul>
  <li>坐下指令：教導狗狗在指令下坐下並保持姿勢。</li>
  <li>待命指令：讓狗狗學會在待命指令下停止動作並等待進一步指示。</li>
  <li>握手指令：培養狗狗與人互動時友善的握手行為。</li>
</ul>
<p>透過基本指令訓練，您將能夠與您的狗狗建立更緊密的關係，並提升您們之間的溝通效果。</p>`,
  `<p>尿布訓練是狗狗的基礎訓練之一，它可以幫助您的狗狗建立適當的排泄習慣。</p>
<ul>
  <li>選擇適合的尿布訓練方法：包括使用尿布墊片、尿布盆等不同方式。</li>
  <li>建立排泄地點：訓練狗狗在指定的區域內進行排泄。</li>
  <li>正確回饋和糾正方法：適時給予獎勵和糾正以加強尿布訓練效果。</li>
</ul>
<p>透過尿布訓練，您的狗狗將學會在指定的地點排泄，減少室內意外，並建立良好的衛生習慣。</p>`,
  `<p>在這堂課中，我們將分享一些基本的狗狗照顧技巧，讓您能夠更好地照顧和保護您的狗狗。</p>
<ul>
  <li>毛髮護理：適當的梳理和洗澡方法，以保持狗狗的毛髮乾淨和健康。</li>
  <li>耳朵和牙齒清潔：保持狗狗耳朵和牙齒的衛生，預防感染和口腔問題。</li>
  <li>安全和急救知識：了解常見的狗狗安全風險和基本的急救處理方法。</li>
</ul>
<p>透過這些基本的照顧技巧，您將成為一位優秀的狗狗主人，為您的狗狗提供最好的照顧。</p>`,
];

const instructors = [
  `<div>
  <h3>講師：Jane Smith</h3>
  <p>Jane Smith 是一位具有豐富經驗的狗狗訓練師和寵物行為專家。她在寵物訓練領域擁有超過十年的經驗，並且持有多項相關證書。她熱愛狗狗，並且致力於幫助狗主人建立和培養與狗狗之間的良好關係。</p>
  <p>在這堂課中，Jane將與您分享如何照顧和培養狗狗的基本需求。她擁有豐富的知識和技巧，能夠提供實用的建議和訓練方法，讓您成為一位優秀的狗狗主人。</p>
</div>`,
  `<div>
  <h3>講師：Michael Johnson</h3>
  <p>Michael Johnson 是一位專注於狗狗社交化訓練的專家。他擁有多年的狗狗訓練經驗，並且曾與各種品種的狗狗一起工作。他的熱情和耐心使他成為一位受歡迎的講師。</p>
  <p>在這堂課中，Michael將教授您如何幫助狗狗建立良好的社交技巧和行為。他將分享實用的訓練方法和技巧，讓您的狗狗能夠在各種社交場景中自信地表現。</p>
</div>`,
  `<div>
  <h3>講師：Sarah Thompson</h3>
  <p>Sarah Thompson 是一位專注於狗狗基本指令訓練的專家。她以其溫和且有效的訓練方法聞名，並且擁有協助許多狗狗主人建立良好關係的豐富經驗。</p>
  <p>在這堂課中，Sarah將教導您如何訓練狗狗基本的指令，並與您分享培養狗狗良好行為的技巧。她將提供個人化的建議，幫助您解決訓練中的困惑和挑戰。</p>
</div>`,
  `<div>
  <h3>講師：David Wilson</h3>
  <p>David Wilson 是一位尿布訓練專家，專注於幫助狗狗建立正確的排泄習慣。他擁有豐富的尿布訓練經驗，並且曾成功地幫助許多狗狗主人解決尿布訓練中的問題。</p>
  <p>在這堂課中，David將與您分享尿布訓練的技巧和方法，幫助您的狗狗建立適當的排泄習慣。他將解答您的問題，提供實用的建議，讓尿布訓練過程更順利。</p>
</div>`,
  `<div>
  <h3>講師：Emily Davis</h3>
  <p>Emily Davis 是一位寵物護理專家，擁有豐富的狗狗照顧經驗。她對狗狗的健康和福祉非常關注，並且擁有各種照顧技巧和知識。</p>
  <p>在這堂課中，Emily將與您分享基本的狗狗照顧技巧，包括毛髮護理、耳朵和牙齒清潔，以及常見的安全和急救知識。她將提供實用的建議，幫助您成為一位優秀的狗狗主人。</p>
</div>`,
];

const dogCovers: string[] = [
  'photo-1561037404-61cd46aa615b',
  'photo-1596116082596-7a0da930b9aa',
  'photo-1518056914555-de1d7f0b3967',
  'photo-1532362996300-fbce5a30bd6d',
  'photo-1592924728350-f7d4fd5d1655',
  'photo-1598134493179-51332e56807f',
  'photo-1568393691080-d016376b767d',
  'photo-1534361960057-19889db9621e',
  'photo-1554456854-55a089fd4cb2',
  'photo-1581888227599-779811939961',
  'photo-1568393691622-c7ba131d63b4',
  'photo-1597633425046-08f5110420b5',
  'photo-1583511655857-d19b40a7a54e',
  'photo-1477884213360-7e9d7dcc1e48',
  'photo-1576201836106-db1758fd1c97',
  'photo-1583512603805-3cc6b41f3edb',
  'photo-1587300003388-59208cc962cb',
  'photo-1543466835-00a7907e9de1',
];

const catCovers: string[] = [
  'photo-1584290867415-527a8475726d',
  'photo-1626602411112-10742f9a3ab8',
  'photo-1574063413132-354db9f190fd',
  'photo-1555685812-4b943f1cb0eb',
  'photo-1596854307943-279e29c90c14',
  'photo-1472491235688-bdc81a63246e',
  'photo-1442291928580-fb5d0856a8f1',
  'photo-1493406300581-484b937cdc41',
  'photo-1511275539165-cc46b1ee89bf',
  'photo-1598188306155-25e400eb5078',
  'photo-1560114928-40f1f1eb26a0',
  'photo-1518791841217-8f162f1e1131',
  'photo-1513360371669-4adf3dd7dff8',
  'photo-1501820488136-72669149e0d4',
  'photo-1478098711619-5ab0b478d6e6',
  'photo-1519052537078-e6302a4968d4',
  'photo-1514888286974-6c03e2ca1dba',
];

const petCovers = [
  'photo-1642625932641-3a52ad27e268',
  'photo-1599995821374-ea079ff4fc52',
  'photo-1606098216818-40939b7c98ad',
  'photo-1573435567032-ff5982925350',
  'photo-1450778869180-41d0601e046e',
  'photo-1623387641168-d9803ddd3f35',
  'photo-1525253013412-55c1a69a5738',
  'photo-1521247560470-d2cbfe2f7b47',
  'photo-1560743173-567a3b5658b1',
  'photo-1494947665470-20322015e3a8',
  'photo-1682448169828-039868860001',
  'photo-1532971731140-1d7cccc06c3f',
  'photo-1597046694643-b6c7e512b512',
  'photo-1606098216818-40939b7c98ad',
  'photo-1623387641168-d9803ddd3f35',
];

const dogFileNames: { id: string; time: number }[] = [
  {
    id: '45272625',
    time: 219,
  },
  {
    id: '40413733',
    time: 98,
  },
  {
    id: '32436181',
    time: 60,
  },
  {
    id: '192191',
    time: 43,
  },
  {
    id: '24106008',
    time: 204,
  },
  {
    id: '408190778',
    time: 8,
  },
  {
    id: '507507932',
    time: 16,
  },
  {
    id: '569667333',
    time: 34,
  },
  {
    id: '13539564',
    time: 16,
  },
  {
    id: '18043585',
    time: 266,
  },
  {
    id: '553706103',
    time: 35,
  },
  {
    id: '779909530',
    time: 62,
  },
  {
    id: '817863657',
    time: 26,
  },
  {
    id: '172936805',
    time: 18,
  },
  {
    id: '103125103',
    time: 45,
  },
  {
    id: '114316500',
    time: 244,
  },
];

const catFileNames: { id: string; time: number }[] = [
  {
    id: '10985679',
    time: 258,
  },
  {
    id: '75332972',
    time: 121,
  },
  {
    id: '89380851',
    time: 8,
  },
  {
    id: '658176837',
    time: 162,
  },
  {
    id: '135680918',
    time: 211,
  },
  {
    id: '139142769',
    time: 60,
  },
  {
    id: '179519510',
    time: 12,
  },
  {
    id: '783267876',
    time: 12,
  },
  {
    id: '70055264',
    time: 25,
  },
  {
    id: '402479720',
    time: 6,
  },
  {
    id: '124785259',
    time: 54,
  },
  {
    id: '149949764',
    time: 200,
  },
  {
    id: '10271609',
    time: 85,
  },
  {
    id: '783372818',
    time: 104,
  },
  {
    id: '793678108',
    time: 61,
  },
  {
    id: '295237897',
    time: 21,
  },
];

const petFileNames: { id: string; time: number }[] = [
  {
    id: '300565039',
    time: 30,
  },
  {
    id: '114960135',
    time: 29,
  },
  {
    id: '624938974',
    time: 32,
  },
  {
    id: '92823193',
    time: 119,
  },
  {
    id: '357888074',
    time: 59,
  },
  {
    id: '715678375',
    time: 40,
  },
  {
    id: '32823310',
    time: 630,
  },
  {
    id: '126758112',
    time: 691,
  },
  {
    id: '134203700',
    time: 206,
  },
  {
    id: '8327538',
    time: 127,
  },
  {
    id: '144604926',
    time: 123,
  },
  {
    id: '25335454',
    time: 46,
  },
  {
    id: '353594450',
    time: 100,
  },
  {
    id: '24480876',
    time: 63,
  },
  {
    id: '673384815',
    time: 19,
  },
  {
    id: '6223784',
    time: 251,
  },
  {
    id: '631506102',
    time: 96,
  },
  {
    id: '69582864',
    time: 179,
  },
  {
    id: '28260330',
    time: 47,
  },
  {
    id: '506067866',
    time: 61,
  },
  {
    id: '118268390',
    time: 83,
  },
  {
    id: '62084943',
    time: 161,
  },
  {
    id: '507273049',
    time: 90,
  },
  {
    id: '253442215',
    time: 233,
  },
  {
    id: '351545976',
    time: 59,
  },
];

const courseHierarchys = {
  dogCovers,
  catCovers,
  petCovers,
  dogFileNames,
  catFileNames,
  petFileNames,
  dagData: [dogTrainings, dogBreeding, dogBreed, dogGames, dogHealthCheckTips, dogEating],
  catData: [
    catRecipes,
    catBehaviorTrainings,
    catFeeding,
    catBreed,
    catGames,
    catHealthCheckTips,
    catEating,
  ],
  petData: [
    petCommunications,
    petBaths,
    petHotelTrainings,
    handmadePetTreats,
    petCareBasics,
    petNutrition,
    petHealthCare,
    petPsychology,
    petStressRelief,
    petBehaviorProblemSolving,
    petCommunication,
    petSafety,
    petGrooming,
    petTravel,
    petAgingCare,
    qualityOfLifeForPets,
  ],
};

export { courseHierarchys, shortDescriptions, descriptions, instructors };
