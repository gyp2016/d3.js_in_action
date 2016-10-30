# 1 D3.js 개요

## 1.1 D3.js는 무엇인가?

## 1.2 D3 작동 방식

### 1.2.1 단순한 그림을 넘어선 데이터 시각화

### 1.2.2 D3는 셀렉션과 바인딩이다

```js
d3.selectAll("circle.a").style("fill", "red").attr("cx", 100);
```

```js
d3.selectAll("div.market").data([1,5,11,3]);
```

### 1.2.3 D3는 바인딩된 데이터로 웹 페이지 요소의 외형을 유도한다

### 1.2.4 <div>, 나라, 흐름도, 어떤 것이든 웹 페이지 요소가 될 수 있다

## 1.3 HTML5 이용

### 1.3.1 DOM

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

  </body>
</html>
```

스타일style, 속성attribute, 프로퍼티property
```js
d3.select("#someDiv").style("border", "5px darkgray dashed");
d3.select("#someDiv").attr("id", "newID");
d3.select("#someCheckbox").property("checked", true);
```

### 1.3.3 SVG
<svg> 요소
<circle>, <rect>, <line>, <polygon> 요소
<text> 요소
<g> 요소
<path> 요소

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://d3js.org/d3.v4.min.js"></script>
  </head>
  <body>
    <div class="" id="infovizDiv">
      <svg style="width:500px;height:500px;border:1px ligthgray solid;">
        <path d="M 10, 60 40, 30 50, 50 60, 30 70, 80"
          style="fill:black;stroke:gray;stroke-width:4px;" />
        <polygon style="fill:gray;"
          points="80,400 120,400 160,440 120,480 60,460" />
        <g>
          <line x1="200" y1="100" x2="450" y2="225"
            style="stroke:black;stroke-width:2px;" />
          <circle cy="100" cx="200" r="30" />
          <rect x="410" y="200" width="100" height="50"
            style="fill:pink;stroke:black;stroke-width:1px;" />
        </g>
      </svg>
    </div>
  </body>
</html>
```

```js
d3.select('circle').remove();
d3.select('rect').style("fill","purple");
```

### 1.3.4 CSS

### 1.3.5 자바스크립트

## 1.4 데이터 표준

### 1.4.1 표 데이터

### 1.4.2 내포된 데이터

### 1.4.3 네트워크 데이터

### 1.4.4 지리 데이터

### 1.4.6 객체

## 1.5 D3로 표현된 정보 시각화 표준들

## 1.6 처음 만들어보는 D3 앱

### 1.6.1 <div>를 추가한 Hello World

### 1.6.2 원을 추가한 Hello World

### 1.6.3 D3와의 대화

## 1.7 마치며
