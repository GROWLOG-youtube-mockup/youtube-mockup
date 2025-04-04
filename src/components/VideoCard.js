class VideoCard extends HTMLElement {
  // 웹 컴포넌트가 초기화되면 가장 먼저 constructor가 실행된다
  constructor() {
      super();
  }
  /* 웹 컴포넌트가 DOM에 추가된 이후에 호출된다.
  DOM 관련 연산이 필요한 경우 해당 라이프사이클에 정의한다. */
  connectedCallback() {
    // shadowDOM 내부의 코드가 외부 DOM 요소에 영향을 미치지 않도록 함
    // this.attachShadow({ mode: 'open' });
  }
  disconnetedCallback(){}
  
  /* 웹 컴포넌트의 static 속성인 observedAttributes에 정의된 속성값이 추가, 변경, 삭제되었을 때 호출된다. 
  특정 속성의 변화를 감지하여 그에 따른 effect를 수행한다. */
  attributeChangedCallback(){}

  /* 웹 컴포넌트가 새로운 Documnet로 이동되었을 때 호출된다. */
  adoptedCallback(){}
}
customElements.define('video-card', VideoCard);


// // 더미 비디오 데이터 반환
// function getDummyVideoData() {
//   return[
//     {
//       title: "아름다운 풍경 (1)",
//       channelId: "ID (1)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (2)",
//       channelId: "ID (2)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (3)",
//       channelId: "ID (3)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (4)",
//       channelId: "ID (4)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (5)",
//       channelId: "ID (5)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (6)",
//       channelId: "ID (6)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (7)",
//       channelId: "ID (7)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (8)",
//       channelId: "ID (8)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//     {
//       title: "아름다운 풍경 (9)",
//       channelId: "ID (9)",
//       videoState: "3M views &#183; 1 min ago"
//     },
//   ]
// }