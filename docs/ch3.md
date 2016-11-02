# 3 데이터 주도 설계와 상호작용성

## 3.1 프로젝트 아키텍처

### 3.1.1 데이터

### 3.1.2 리소스

### 3.1.3 그림

### 3.1.4 스타일시트

### 3.1.5 외부 라이브러리
ch3/1 참조

## 3.2 대화형 스타일과 DOM

### 3.2.1 이벤트
ch3/2 참조

### 3.2.2 그래픽 전환
ch3/3 참조

### 3.2.3 DOM 조작
ch3/4 참조

```js
d3.select('circle').each(function(d, i) {
  console.log(d);
  console.log(i);
  console.log(this);
});
```

```js
d3.select('circle').node();
```

### 3.2.4 현명한 색상 선택법

```js
d3.rgb('red');
d3.rgb('#ff0000');
d3.rgb('rgb(255,0,0)');
d3.rgb(255,0,0);
```
