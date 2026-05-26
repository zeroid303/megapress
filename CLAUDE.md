# CLAUDE.md

메가프레스(MEGA PRESS) 회사 소개 랜딩 사이트. 빌드 도구·번들러·패키지 매니저 없는
**순수 정적 멀티페이지 사이트**다. 그냥 정적 서버로 띄우거나 HTML 파일을 열면 동작한다.

## 실행

빌드 단계가 없다. `package.json`, `node_modules`, 테스트, 린터 전부 없음.
로컬에서 보려면 정적 서버 하나면 된다 (`file://`로는 컴포넌트 `fetch`가 막혀서 안 됨):

```powershell
python -m http.server 8000   # 또는 npx serve
```

진입점은 페이지별 `*.html` (대표 페이지: `index.html` → about). `/`로 접속하면 `index.html`.

## 아키텍처

브라우저에서 직접 도는 React다. **빌드 트랜스파일이 아니라 런타임 트랜스파일**:

- React 18.3.1 / ReactDOM / `@babel/standalone`를 CDN `<script>`로 로드 (모든 HTML `<head>` 동일).
- 컴포넌트는 `<script type="text/babel" src="components/X.jsx">`로 로드 → 브라우저에서 Babel이 즉석 변환.
- 모듈 시스템 없음. **모든 스크립트가 하나의 전역 스코프를 공유**한다. import/export 쓰지 말 것.

### 페이지 = 공용 셸 + 바디 컴포넌트

모든 페이지는 `js/app.js`의 `MegaPressApp`가 그리는 동일한 셸을 쓴다:
`<SiteHeader> + <main>{바디 컴포넌트들}</main> + <SiteFooter>`.

각 HTML은 `<head>`까지 똑같고 `<body>`에서 세 가지만 다르다 (`work.html` 참고):

1. `<div id="app" data-page="work">` — `data-page`가 헤더 nav의 활성 링크를 정함.
2. 해당 페이지 바디 `.jsx`를 `<script type="text/babel" src=...>`로 추가 로드.
3. 부트스트랩: `window.MP_PAGE = "Work"; window.MP_MOUNT();`
   - `MP_PAGE`는 콤마로 구분된 컴포넌트 **이름** 문자열. `app.js`가 split 해서 `window[name]`을
     순서대로 `<main>`에 렌더한다.

### 컴포넌트는 window에 등록한다

모듈이 없으므로 각 컴포넌트는 끝에서 전역에 자기를 단다: `window.About = About;`.
부트스트랩과 다른 컴포넌트는 이 전역 이름으로 서로를 참조한다 (예: `<window.SiteHeader>`).

> **전역 스코프 충돌 주의.** `const`/함수 이름이 페이지 내 모든 스크립트에서 공유된다.
> 그래서 각 파일은 훅을 파일별 별칭으로 가져온다 — `App.js`의 `useStateApp`,
> `SiteHeader.jsx`의 `useStateHeader`, `About.jsx`의 `useStateAbout` 등.
> 새 컴포넌트에서 `useState`/`useEffect`가 필요하면 **같은 패턴으로 고유 별칭**을 만들 것.

## 텍스트 / 다국어 (i18n)

화면에 보이는 거의 모든 문구는 `js/i18n.js`의 `window.MP_I18N`에 있다. `ko` / `en` 두 트리,
구조 동일. 컴포넌트는 `const t = window.MP_I18N[lang].<섹션>`으로 읽는다.

- `lang` 상태는 `MegaPressApp`이 들고 있고 헤더의 KO/EN 토글로 바뀐다. props로 모든 바디에 내려감.
- 한국어 제목은 `lang === "ko"`일 때 `kr-display` 클래스를 붙여 폰트를 바꾼다 (각 컴포넌트의 `krCls`).
- 제목 안의 `<em>강조어</em>`는 의도된 것 (오렌지 악센트). 그래서 `dangerouslySetInnerHTML`로
  렌더한다 — 제목 문자열에 HTML이 들어있을 수 있다는 뜻.
- **문구 수정은 거의 항상 `i18n.js`만 고치면 된다.** `ko`/`en` 양쪽을 같이 손볼 것.
  (단 `about.hero.images`처럼 일부러 양쪽에 같은 데이터를 복제해 둔 곳도 있음.)

## image-slot (`js/image-slot.js`)

사용자가 이미지를 드래그/클릭해서 채우는 placeholder용 커스텀 엘리먼트 `<image-slot>`.
현재 `Work.jsx`에서만 쓴다. 드롭한 이미지는 `.image-slots.state.json` 사이드카에 저장되는데,
이 저장(write)은 **호스트 omelette 런타임(`window.omelette.writeFile`)에서만** 동작한다.
일반 정적 서버에서는 읽기 전용으로 보이고 드롭은 세션 한정. 각 슬롯은 고유 `id` 필수(영속화 키).
자세한 동작은 파일 상단 주석 참고.

## 스타일

- `css/tokens.css` — 디자인 토큰(색·타입스케일·간격·라운드 등) + 기본 엘리먼트 스타일.
  **단일 화이트 테마** (다크 테마 제거됨). 폰트는 Pretendard(Google/CDN import).
- `css/styles.css` — 페이지/컴포넌트 레이아웃 (약 1,150줄).
- 컴포넌트는 className만 붙이고 스타일은 CSS에. 인라인 스타일은 최소.

## 새 페이지 추가하기

1. 기존 `*.html` 하나 복사 → `<head>`는 그대로, `data-page` / `MP_PAGE` / 로드할 `.jsx`만 교체.
2. `components/NewPage.jsx` 작성, 끝에 `window.NewPage = NewPage;`. 훅은 고유 별칭으로.
3. `js/i18n.js`의 `ko`·`en` 양쪽에 해당 섹션 추가.
4. nav에 넣으려면 `components/SiteHeader.jsx`의 `NAV_ITEMS`와 `nav` i18n 키 추가.

## 디렉터리

```
*.html              페이지 (about=index, work, history, facilities, sectors, press, contact)
js/app.js           공용 부트스트랩(MegaPressApp, MP_MOUNT)
js/i18n.js          모든 문구 (ko/en) — 콘텐츠 수정의 주 진입점
js/image-slot.js    <image-slot> 커스텀 엘리먼트
components/*.jsx    SiteHeader, SiteFooter + 페이지 바디들
css/tokens.css      디자인 토큰
css/styles.css      레이아웃 스타일
assets/             logo(+affiliates), images, press
```

## 주의

- `.gitignore`에서 밑줄 접두사(`_*.py`, `_*.png`, `_*.html` …)는 분석/변환용 임시 산출물 컨벤션 —
  커밋하지 말 것. `.image-slots.state.json`, `.claude/`도 무시 대상.
- 회사 정보(주소·연락처·사업자번호 등 footer/contact)는 i18n에 하드코딩돼 있으니 변경 시 그쪽을 수정.
