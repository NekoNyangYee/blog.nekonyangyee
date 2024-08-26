---
teaser: /TypeScript-As/thumbnail.png
category: TypeScript
title: TypeScript 타입단언 as 알아보기
date: 2024-08-26T00:00:00+00:00
time: 22:51
description: TypeScript as에 대해 알아봅니다.
---

![thumbnail](/TypeScript-As/thumbnail.png)

안녕하세요. NekoNyangYee입니다.

오늘은 타입스크립트 하다보면 한번은 써보게 되는 타입 단언에 대해 알아보겠습니다.

## 1. 타입 단언(Type Assertion)이란?

---

> 타입스크립트 컴파일 단계에서 컴파일러가 타입을 정확하게 추론하지 못하거나, 개발자가 더 명확하게 타입을 지정해주고 싶을 때 쓰이는 방식입니다.

- 쉽게 말해서 이 변수나 오브젝트 타입은 이거다!! 라고 명시해주는거죠.

### 예시

```typescript
const arr: Array<string | number> = ["Hello World", 1234];

const returnString = (arr: Array<string>) => {
  return arr.includes("Hello");
};

returnString(arr);
```

자 위에처럼 문자열, 숫자 유니온 타입을 가진 `arr`변수가 있습니다. 이 `arr`변수가 `returnString`함수의 파라미터로 들어가게 된다면 에러를 낼 것입니다.

그 이유는 `returnString`함수는 문자열 배열만 받고 싶어하는데 `arr`변수는 문자열 일수도 숫자일 수도 있는 애매한 타입이기 때문입니다.

이럴 때 as를 사용합니다.

```typescript
const arr: Array<string | number> = ["Hello World", 1234];

const returnString = (arr: Array<string>) => {
  return arr.includes("Hello");
};

returnString(arr as Array<string>);
```

위 코드처럼 as를 넣어주게 되면 타입 에러는 발생하지 않게 됩니다.

단, 이렇게 하는 경우 `arr`변수에 포함된 `number`타입은 무시하게 되며, 배열의 모든 요소들이 `string`타입으로 취급된다는 접이 있습니다. 그래서 이 방법은 `arr`의 모든요소가 `string`이라고 확신할 때만 사용하는 것이 좋습니다.

## 2. 그럼 `number`타입을 무시 안하면서 타입 단언을 하고 싶으면?

---

```typescript
const arr: Array<string | number> = ["Hello World", 1234];

const returnString = (arr: Array<string>) => {
  return arr.includes("Hello");
};

// 문자열 요소만 추출하여 함수에 전달
const stringElements = arr.filter(
  (element): element is string => typeof element === "string"
);

returnString(stringElements);
```

사람마다 짜는 방법은 다르겠지만 저같은 경우 찾아보니 `filter`메서드로 요소의 타입이 `string`인 경우만 따로 필터링해서 `returnString`함수에 전달하는 방법이 적합하다 생각했습니다.
