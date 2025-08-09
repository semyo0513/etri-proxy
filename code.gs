// Google 시트 및 드라이브 설정
const SHEET_NAMES = {
  PET_PROFILE: "PetProfile",
  CHAT_LOG: "ChatLog",
  EXAM_QUESTIONS: "ExamQuestions",
  EXAM_RESULTS: "ExamResults",
  ADOPTION_ANIMALS: "AdoptionAnimals",
  STREET_CATS: "StreetCats",
  COMMUNITY_CONTACTS: "CommunityContacts"
};

const FOLDER_NAMES = {
  ADOPTION: "입양정보",
  HEATMAP: "히트맵",
  CERTIFICATES: "인증서"
};

function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    initializeSheet(sheetName);
  }
  return sheet;
}

function initializeSheet(sheetName) {
  switch(sheetName) {
    case SHEET_NAMES.PET_PROFILE:
      getSheet(sheetName).getRange("A1:I1").setValues([
        ["Timestamp", "User ID", "Pet Type", "Pet Name", "Age", "Breed", "Weight", "Neutered", "Vaccinations", "Health Issues", "Environment", "Cohabitants", "Daily Routine"]
      ]);
      break;
    case SHEET_NAMES.CHAT_LOG:
      getSheet(sheetName).getRange("A1:G1").setValues([
        ["Timestamp", "User ID", "Category", "Message", "Risk Flag", "Score Area", "Score Value"]
      ]);
      break;
    case SHEET_NAMES.EXAM_QUESTIONS:
      getSheet(sheetName).getRange("A1:E1").setValues([
        ["Question", "Option1", "Option2", "Option3", "Option4", "Correct Answer"]
      ]);
      break;
    case SHEET_NAMES.EXAM_RESULTS:
      getSheet(sheetName).getRange("A1:E1").setValues([
        ["Timestamp", "User ID", "Score", "Passed", "Certificate ID"]
      ]);
      break;
    case SHEET_NAMES.ADOPTION_ANIMALS:
      getSheet(sheetName).getRange("A1:H1").setValues([
        ["ID", "Name", "Type", "Age", "Breed", "Health Status", "Personality", "Drive File ID"]
      ]);
      break;
    case SHEET_NAMES.STREET_CATS:
      getSheet(sheetName).getRange("A1:H1").setValues([
        ["Timestamp", "User ID", "Latitude", "Longitude", "Description", "Care Status", "Drive File ID", "Photo URL"]
      ]);
      break;
    case SHEET_NAMES.COMMUNITY_CONTACTS:
      getSheet(sheetName).getRange("A1:D1").setValues([
        ["Name", "Organization", "Phone", "Email", "Service Area"]
      ]);
      break;
  }
}

function getFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

// AI 펫 페르소나 시뮬레이션
function savePetProfile(profileData) {
  const sheet = getSheet(SHEET_NAMES.PET_PROFILE);
  const timestamp = new Date();
  sheet.appendRow([
    timestamp,
    Session.getActiveUser().getEmail(),
    profileData.petType,
    profileData.petName,
    profileData.age,
    profileData.breed,
    profileData.weight,
    profileData.neutered,
    profileData.vaccinations,
    profileData.healthIssues,
    profileData.environment,
    profileData.cohabitants,
    profileData.dailyRoutine
  ]);
  return "프로필이 저장되었습니다! 이제부터 반려동물과 함께하는 여정을 시작해볼까요?";
}

function logChatInteraction(userId, category, message, riskFlag, scoreArea, scoreValue) {
  const sheet = getSheet(SHEET_NAMES.CHAT_LOG);
  sheet.appendRow([
    new Date(),
    userId,
    category,
    message,
    riskFlag,
    scoreArea,
    scoreValue
  ]);
}

function getCareScores(userId) {
  const sheet = getSheet(SHEET_NAMES.CHAT_LOG);
  const data = sheet.getDataRange().getValues();
  
  const scores = {
    affection: 0,
    feeding: 0,
    hygiene: 0,
    exercise: 0,
    safety: 0,
    prevention: 0
  };
  
  // 간단한 점수 계산 로직 (실제로는 더 복잡한 알고리즘 필요)
  data.forEach(row => {
    if (row[1] === userId) {
      const scoreArea = row[5];
      const scoreValue = row[6];
      if (scores.hasOwnProperty(scoreArea)) {
        scores[scoreArea] = Math.max(scores[scoreArea], scoreValue);
      }
    }
  });
  
  return scores;
}

// 펫파밍 인증시험
function getRandomExamQuestions() {
  const sheet = getSheet(SHEET_NAMES.EXAM_QUESTIONS);
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 6).getValues();
  
  // 10개 랜덤 질문 선택
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

function gradeExam(userId, answers) {
  const questions = getRandomExamQuestions();
  let score = 0;
  const results = [];
  
  questions.forEach((q, i) => {
    const isCorrect = q[5] === answers[i];
    if (isCorrect) score++;
    results.push({
      question: q[0],
      options: [q[1], q[2], q[3], q[4]],
      correctAnswer: q[5],
      userAnswer: answers[i],
      isCorrect: isCorrect
    });
  });
  
  const passed = score >= 7; // 70% 이상 통과
  
  // 인증서 생성
  let certificateId = null;
  if (passed) {
    certificateId = generateCertificate(userId, score);
  }
  
  // 결과 저장
  const sheet = getSheet(SHEET_NAMES.EXAM_RESULTS);
  sheet.appendRow([
    new Date(),
    userId,
    score,
    passed,
    certificateId
  ]);
  
  return {
    score: score,
    passed: passed,
    results: results,
    certificateId: certificateId
  };
}

function generateCertificate(userId, score) {
  const templateId = "YOUR_GOOGLE_DOCS_TEMPLATE_ID"; // 실제 템플릿 문서 ID로 교체 필요
  const folder = getFolder(FOLDER_NAMES.CERTIFICATES);
  
  // 문서 복사
  const file = DriveApp.getFileById(templateId).makeCopy();
  const doc = DocumentApp.openById(file.getId());
  const body = doc.getBody();
  
  // 문서 내용 수정
  body.replaceText("#성명#", Session.getActiveUser().getEmail());
  body.replaceText("#일시#", new Date().toLocaleDateString());
  body.replaceText("#점수#", `${score}/10`);
  
  doc.saveAndClose();
  
  // PDF 생성
  const pdf = file.getAs(MimeType.PDF);
  const pdfFile = folder.createFile(pdf).setName(`인증서_${userId}_${new Date().getTime()}`);
  
  return pdfFile.getId();
}

// 입양 매칭
function getAdoptionAnimals() {
  const sheet = getSheet(SHEET_NAMES.ADOPTION_ANIMALS);
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 8).getValues();
  
  return data.map(row => ({
    id: row[0],
    name: row[1],
    type: row[2],
    age: row[3],
    breed: row[4],
    healthStatus: row[5],
    personality: row[6],
    photoUrl: `https://drive.google.com/uc?id=${row[7]}`
  }));
}

function matchAdoption(userId, preferences) {
  const animals = getAdoptionAnimals();
  
  // 간단한 매칭 알고리즘 (실제로는 더 복잡한 로직 필요)
  const matchedAnimals = animals.filter(animal => {
    if (preferences.petType && animal.type !== preferences.petType) return false;
    if (preferences.ageGroup && !checkAgeGroup(animal.age, preferences.ageGroup)) return false;
    if (preferences.personality && animal.personality !== preferences.personality) return false;
    return true;
  });
  
  return matchedAnimals;
}

function checkAgeGroup(age, group) {
  const ageNum = parseInt(age);
  switch(group) {
    case "puppy": return ageNum <= 2;
    case "adult": return ageNum > 2 && ageNum <= 7;
    case "senior": return ageNum > 7;
    default: return true;
  }
}

// 길고양이 히트맵 네트워크
function saveCatSighting(userId, data) {
  const folder = getFolder(FOLDER_NAMES.HEATMAP);
  
  // 사진 저장
  let fileId = null;
  if (data.photo) {
    const photoBlob = Utilities.newBlob(Utilities.base64Decode(data.photo.split(',')[1]), "image/jpeg", "cat.jpg");
    const file = folder.createFile(photoBlob);
    fileId = file.getId();
  }
  
  // 시트에 저장
  const sheet = getSheet(SHEET_NAMES.STREET_CATS);
  sheet.appendRow([
    new Date(),
    userId,
    data.lat,
    data.lng,
    data.description,
    data.careStatus,
    fileId,
    fileId ? `https://drive.google.com/uc?id=${fileId}` : null
  ]);
  
  return "관찰 기록이 저장되었습니다! 길고양이를 돌봐주셔서 감사합니다.";
}

function getCatSightings() {
  const sheet = getSheet(SHEET_NAMES.STREET_CATS);
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 8).getValues();
  
  return data.map(row => ({
    timestamp: row[0],
    userId: row[1],
    lat: row[2],
    lng: row[3],
    description: row[4],
    careStatus: row[5],
    photoUrl: row[7]
  }));
}

// 커뮤니티 연락처
function getCommunityContacts() {
  const sheet = getSheet(SHEET_NAMES.COMMUNITY_CONTACTS);
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 5).getValues();
  
  return data.map(row => ({
    name: row[0],
    organization: row[1],
    phone: row[2],
    email: row[3],
    serviceArea: row[4]
  }));
}

// 웹앱 진입점
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('반려동물 돌봄 플랫폼')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// 클라이언트 호출 가능 API
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}