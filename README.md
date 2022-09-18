# scroll-visualization

스크롤 시각화 코드

- 바닐라코드로 구현한 스크롤 시각화입니다.
- 아래 `#scroll-box` 에 원하는 문단들을 차례대로 작성하면 스크롤을 내릴 때마다 바뀝니다.

```html
<div id="scroll-box">
  <div>HI</div>
  <div>HI2</div>
  <div>HI3</div>
  <div>HI4</div>
  <div>HI5</div>
</div>
```

```js
import { scroller } from "./scroller.js";

scroller("#scroll-box").run();
```
