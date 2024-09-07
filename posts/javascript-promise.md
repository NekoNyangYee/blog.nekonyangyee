---
teaser:
category: JavaScript
title: Promise에 대해 알아보기
date: 2024-09-07T00:00:00+00:00
time: 23:39
description: 비동기로 유명한 Promise에 대해 알아보기입니다.
---

안녕하세요. nekonyangyee입니다.

오늘은 자바스크립트를 하다보면 데이터 처리를 하게 되는데 그 중에서 비동기 처리를 하게 되면 알게 되는 `Promise`에 대해 알아보겠습니다.

`Promise`를 알기 전에 먼저 비동기가 무엇인지에 대해 알아보겠습니다.

## 1. 동기/비동기 방식이란?

---

- 동기(`Synchronous`): 클라이언트가 서버에 요청을 보낼 때 서버에서 응답이 돌아와야 다음 작업을 수행할 수 있게 됩니다. 따라서 A라는 작업을 요청하여 응답이 돌아오기 전까지 밑에 있는 B작업은 수행할 수 없게 됩니다.

- 비동기(`Asynchronous`): 동기 방식과는 반대로 응답 상태와 관계 없이 다음 작업을 수행할 수 있음을 나타냅니다. A작업을 요청함과 동시에 B작업도 같이 수행할 수 있습니다. A작업은 결과물이 나오는대로 출력을 하게 됩니다.

동기/비동기 관련은 따로 글 다루겠습니다. 이정도만 아셔도 이번 게시물 이해하는데는 큰 무리가 없을거라 예상갑니다.

### 콜백 지옥

콜백함수는 예전에 설명드린바 있습니다. 간략하게 설명드리자면, 비동기 작업이 완료되면 함수 안에 매개변수로 함수 객체를 넘겨주는 역할을 말합니다. 그래서 함수 내부에서 또 함수 호출을 할 수 있어 비동기 작업의 결과를 받아서 인자로 넘겨주면 후속처리가 가능하다는 점이 있습니다.

다만, 이렇게 할 경우, 코드가 복잡해지고, 코드의 깊이가 깊어지는 콜백 지옥 현상이 나타나게 됩니다.

```javascript
function getData(callback) {
  setTimeout(() => {
    console.log("Data fetched");
    callback(null, "Data");
  }, 1000);
}

function processData(data, callback) {
  setTimeout(() => {
    console.log("Data processed");
    callback(null, "Processed " + data);
  }, 1000);
}

function displayData(processedData, callback) {
  setTimeout(() => {
    console.log(processedData);
    callback(null, "Displayed");
  }, 1000);
}

getData((err, data) => {
  if (err) throw err;
  processData(data, (err, processedData) => {
    if (err) throw err;
    displayData(processedData, (err, result) => {
      if (err) throw err;
      console.log("Done");
    });
  });
});
```

위 코드는 `getData`함수에서 1초 후 데이터를 가져오고 반환된다면 `processData`함수로 데이터를 넘기고 이 함수에서도 에러 없이 반환된다면 `displayData`함수로 데이터를 넘겨서 최종적으로 데이터를 화면에 출력하는 코드입니다.

이렇게 코드에서 나온 데이터를 꼐속 함수의 인자로 넘겨주게 되면 가독성이 떨어질 뿐만이 아니라 코드의 깊이가 깊어지게 됩니다.

이런 문제를 막기 위해 자바스크립트에서는 `Promise`객체가 나오게 됩니다.

## 2. Promise

---

- `Promise`는 객체이기 때문에 인스턴스화가 가능합니다.

- `Promise`의 생성자 함수는 `resolve`, `reject`함수를 인자로 받는 콜백함수를 인자로 받습니다.

- `Promise`는 비동기 처리를 성공(`fullfilled`) 아니면 실패(`rejected`)로 반환합니다.

### `Promise`객체 사용법

`Promise`객체를 사용하려면 `new` 키워드와 함께 `Promise()` 생성자 함수를 사용하면 됩니다.

- 참고로 `Promise` 생성자 안에 들어가는 콜백함수를 `executor`라고 합니다.

아래 프로미스로 개선 시킨 코드입니다.

```javascript
function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data fetched");
      resolve("Data");
    }, 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Data processed");
      resolve("Processed " + data);
    }, 1000);
  });
}

function displayData(processedData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(processedData);
      resolve("Displayed");
    }, 1000);
  });
}

getData()
  .then((data) => processData(data))
  .then((processedData) => displayData(processedData))
  .then((result) => console.log("Done"))
  .catch((err) => console.error(err));
```

이렇게 프로미스로 처리할 때는 `then` 체인을 이용해 각 작업을 순차적으로 처리합니다. 이렇게 하면 코드가 더 읽기 쉽고 관리하기 쉬워집니다.

항상 모든 결과가 성공만은 있는 것이 아니므로 에러를 대비하는 예외처리 `.catch()`도 필수로 해줍니다.

함수를 만들고 그 함수를 호출하면 프로미스 생성자를 리턴 함으로써, 생성된 프로미스 객체를 함수 반환값으로 받아 사용하는 기법이다. 이렇게 프로미스 객체를 함수로 만드는 이유는 3가지 정도가 있습니다.

1. **재사용성** : 프로미스 객체를 함수로 만들면 필요할 때마다 호출하여 사용함으로써, 반복되는 비동기 작업을 효율적으로 처리 할 수 있다.

2. **가독성** : 프로미스 객체를 함수로 만들면 코드의 구조가 명확해져, 비동기 작업의 정의와 사용을 분리하여 코드의 가독성을 높힐 수 있다.

3. **확장성** : 프로미스 객체를 함수로 만들면 인자를 전달하여 동적으로 비동기 작업을 수행할 수 있다. 또한 여러 개의 프로미스 객체를 반환하는 함수들을 연결하여 복잡한 비동기 로직을 구현 할 수 있다.
