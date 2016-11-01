# 2 정보 시각화 데이터 흐름

## 2.1 데이터 다루기
로딩 - 포멧 - 측정 - 생성 - 갱신

### 2.1.1 데이터 로딩
d3.text()
d3.xml()
d3.json()
d3.csv()
d3.html()

파일 포멧

로딩할 파일의 경로와 콜백 함수를 인자로 받는다.
```javascript
d3.csv("cities.csv", function(error, data) {
  console.log(error, data);
});
```

error 변수는 선택적이므로 콜백 함수 안에서 변수를 하나만 정의하면 다음과 같이 데이터만 인자로 받는다.
```javascript
d2.csv("cities.csv", function(d) {
  console.log(d);
});
```

```javascript
d3.csv("cities.csv", function(data) {
  console.log(data);
});
```

d3.xhr()

### 2.1.2 데이터 포맷팅

정량적 데이터
범주 데이터
위상 데이터
기하학적 데이터
날씨/시간 데이터
원시 데이터

### 2.1.3 데이터 변환

캐스팅 : 데이터 형변환
```javascript
parseInt("77");
parseFloat("3.14");
Date.parse("Sun, 22 Dec 2013 08:00:00 GMT");
var text = "alpha,beta,gamma"; text.split(",");
```

정규화 : 스케일과 규모 변경
```javascript
var newRamp = d3.scaleLinear().domain([500000,13000000]).range([0,500]);
// 20
newRamp(1000000);
// 340
newRamp(9000000);
// 8325000
newRamp.invert(313);
```

```javascript
var newRamp = d3.scaleLinear().domain([500000,13000000]).range(["blue","red"]);
// "rgb(10, 0, 245)"
newRamp(1000000);
// "rgb(173, 0, 82)"
newRamp(9000000);
// NaN
newRamp.invert("#ad0052");
```

비닝 : 데이터 분류
```javascript
var sampleArray = [423,124,66,424,58,10,900,44,1];
var qScale = d3.scaleQuantile().domain(sampleArray).range([0,1,2]);
// 2
qScale(423);
// 0
qScale(20);
// 2
qScale(10000)
```

```javascript
var qScaleName = d3.scaleQuantile().domain(sampleArray).range(["small","medium","large"]);
// "medium"
qScaleName(68);
// "small"
qScaleName(20);
// "large"
qScaleName(10000);
```

내포
```javascript
d3.json("tweets.json", function(data) {
  var tweetData = data.tweets;
  var nestedTweets = d3.nest()
                       .key(function(el) {return el.user})
                       .entries(tweetData);
});
```

### 2.1.4 데이터 측정
```javascript
var testArray = [88,10000,1,75,12,35];

d3.min(testArray);
d3.max(testArray);
d3.mean(testArray);

d3.csv("cities.csv", function(error, data) {
  var min = d3.min(data, function(el) {return +el.population});
  var max = d3.max(data, function(el) {return +el.population});
  var mean = d3.mean(data, function(el) {return +el.population});
  console.log(min);
  console.log(max);
  console.log(mean);
});
```

## 2.2 데이터 바인딩

### 2.2.1 셀렉션과 바인딩

d3.selectAll()
data()
enter() 와 exit()
append() 와 insert()
attr()
html()

### 2.2.2 인라인 함수로 데이터 접근하기

## 2.3 데이터 표현 스타일, 속성, 콘텐츠

### 2.3.1 로딩된 데이터로부터의 시각화
d3-e.html 참조

### 2.3.2 채널 설정
d3-f.html 참조

### 2.3.3 enter(), update(), exit()
d3-g.html 참조

exit()
```js
d3.selectAll('g').data([1,2,3,4]).exit().remove();
```

update()
```js
d3.selectAll('g').select('text').text(function(d) { return d; });
```
