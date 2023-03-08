const $containers = [...document.querySelectorAll(".star-rating")];
const $currentRatings = document.querySelectorAll(".current-rating > span");

// css 파일 추가
const cssFile = document.createElement("link");
cssFile.rel = "stylesheet";
cssFile.href = "./star-rating/theme.css";
document.head.appendChild(cssFile);

$containers.forEach(($container, i) => {
  // star-rating 컨테이너 요소의 참조를 StarRating 함수에 전달해 star 요소들로 구성된 star-rating 요소를 동적 생성한다.

  // 별 모으는 상위 클래스 생성
  const starCss = document.createElement("div");
  starCss.setAttribute("class", "star-rating-container");
  $container.appendChild(starCss);

  const span = document.querySelectorAll("span")[i];

  // 설정해놓은 별 갯수 가져오기
  const count = $container.getAttribute("data-max-rating");

  // 가져온 별 갯수만큼 별 그리기
  let stars = [];
  let hoverCount = -1;
  let outCount = -1;
  let clickCount = -1;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    star.setAttribute("class", "bx bxs-star");

    // 이벤트 추가
    // 마우스 오버 시
    star.addEventListener("mouseover", () => {
      hoverCount = i;
      stars.forEach((star, index) => {
        if (index <= i) {
          if (clickCount < index && clickCount < i) {
            star.setAttribute("class", "bx bxs-star hovered");
          }
        } else {
          if (clickCount < index && clickCount <= i) {
            star.setAttribute("class", "bx bxs-star");
          }
        }
      });
    });

    // 별 클릭 시
    star.addEventListener("click", () => {
      clickCount = i;
      for (let j = 0; j <= i; j++) {
        stars[j].setAttribute("class", "bx bxs-star selected");
      }
      stars.forEach((star, index) => {
        if (index <= i) {
          star.setAttribute("class", "bx bxs-star selected");
        } else {
          star.setAttribute("class", "bx bxs-star");
        }
      });
    });
    stars.push(star);
  }

  stars.forEach((star) => {
    starCss.appendChild(star);
  });

  // 이벤트 'rating-change'를 캐치해 화면에 표시한다.
  $container.addEventListener("rating-change", (e) => {
    const rating = e.detail;
    $currentRatings[i].textContent = rating;
  });
});
