# 🐾 Pet-Sitter-Platform (반려동물 돌봄 매칭 플랫폼)

![GitHub license](https://img.shields.io/github/license/semyo0513/Pet-Sitter-Platform?color=blue)
![GitHub stars](https://img.shields.io/github/stars/semyo0513/Pet-Sitter-Platform)
![GitHub issues](https://img.shields.io/github/issues/semyo0513/Pet-Sitter-Platform)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

> **"소중한 반려가족을 위한 믿을 수 있는 펫시터 매칭 서비스"**  
> Pet-Sitter-Platform은 반려동물 소유주(반려인)와 전문적이고 신뢰할 수 있는 펫시터를 빠르고 안전하게 연결해주는 웹/앱 기반 매칭 플랫폼입니다.

---

## 📌 주요 기능 (Key Features)

### 1. 사용자 맞춤형 회원가입 및 프로필 관리
* **반려인 모드**: 반려동물의 종류, 나이, 성격, 특이사항(질환, 알레르기 등) 관리 및 등록
* **펫시터 모드**: 돌봄 가능 환경(아파트, 마당 등), 자격증 보유 여부, 선호하는 반려동물 유형 및 경력 기술서 작성
* **소셜 로그인**: 카카오, 네이버, 구글 등 간편 인증 연동

### 2. 스마트 매칭 및 조건 검색 (Search & Filtering)
* **위치 기반 검색**: 사용자의 현재 위치 또는 희망 지역 기반 주변 펫시터 탐색
* **조건별 필터**: 돌봄 날짜/시간, 비용, 대형견 가능 여부, 노령견 케어 가능 여부 등 상세 필터링 제공
* **예약 현황 달력**: 펫시터의 실시간 예약 가능 일정을 한눈에 확인

### 3. 예약 및 결제 시스템 (Reservation & Payment)
* **실시간 예약 신청 및 수락**: 반려인의 신청에 대한 펫시터의 실시간 푸시 알림 및 승인 프로세스
* **안전 결제 시스템**: 예약 확정 시 안전한 에스크로(Escrow) 기반의 결제 서비스 제공

### 4. 실시간 소통 및 돌봄 일지 (Communication & Logs)
* **채팅 기능**: 예약 전후 상담 및 실시간 문의를 위한 1:1 채팅방 제공
* **돌봄 일지**: 산책 실시간 경로(GPS), 식사 및 배변 여부 등을 사진/비디오와 함께 공유하는 일지 기능

### 5. 신뢰 기반 리뷰 및 평점 시스템 (Review & Rating)
* **실제 이용자 리뷰**: 돌봄이 완료된 회원만 작성할 수 있는 투명한 후기 시스템
* **평점 및 배지**: 훌륭한 서비스를 제공한 펫시터에게 우수 배지 부여로 신뢰도 정량화

---

## 🛠 기술 스택 (Tech Stack)

### Front-end
<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</p>

### Back-end
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
</p>

### Database & Infra
<p>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
</p>

*(※ 실제 프로젝트에서 사용하지 않는 스택 아이콘은 삭제하거나 알맞게 추가하여 커스텀할 수 있습니다.)*

---

## 📂 프로젝트 구조 (Directory Structure)

```text
pet-sitter-platform/
├── client/                 # 프론트엔드 소스 코드 (React / Web)
│   ├── public/
│   └── src/
│       ├── components/     # 공통 컴포넌트
│       ├── pages/          # 페이지 단위 컴포넌트
│       └── utils/          # 유틸리티 함수 및 API 호출 정의
│
├── server/                 # 백엔드 소스 코드 (Node.js Express / Spring Boot)
│   ├── config/             # 데이터베이스 및 외부 서비스 설정
│   ├── controllers/        # 비즈니스 로직 제어층
│   ├── models/             # 데이터베이스 스키마 / 엔티티
│   └── routes/             # 라우팅 API 경로 정의
│
├── .env.example            # 환경변수 설정 샘플
├── README.md               # 프로젝트 가이드 문서
└── package.json            # 프로젝트 의존성 관리 파일
