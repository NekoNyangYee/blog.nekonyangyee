---
teaser: /TypeScript-Generic/thumbnail.jpg
category: TypeScript
title: TypeScript keyof, typeof에 대해 알아보기
date: 2024-09-12T00:00:00+00:00
time: 22:27
description: TypeScript keyof, typeof에 대해 알아봅니다.
---

안녕하세요. nekonyangyee입니다.

오늘은 타입스크립트에 `keyof`, `typeof` 연산자에 대해 알아보려합니다.

## 1. keyof 타입 연산자

---

`keyof` 타입 연산자는 객체 타입에서 객체의 키 값들을 추출합니다. 객체 내에 존재하는 모든 값들을 유니온 타입으로 반환시킵니다.

```typescript
type Person = {
  name: string;
  age: number;
  location: string;
};

type PersonKeys = keyof Person; // "name" | "age" | "location"

const key: PersonKeys = "name"; // "name", "age", "location" 중 하나여야 함
```

`keyof Person`을 `PersonKeys`라는 타입에 저장 후 `key`의 변수 타입으로 `PersonKeys`으로 지정하게 되면 `Person` 타입에 있는 `name`, `age`, `location` 중 하나가 와야 합니다.

만약 저 값들 말고 `"address"`라는 값을 넣으면 타입스크립트는 컴파일 단계에서 에러를 낼 것입니다.

> Type '"address"' is not assignable to type '"name" | "age" | "location"'.

## 2. typeof 타입 연산자

---

`typeof`를 들으셨을 때 이미 자바스크립트에 존재하는 거 아닌가? 라는 생각을 하셨을 텐데 맞습니다. 단, 타입스크립트에서는 변수나 프로퍼티의 타입을 추론하는 역할로 쓰입니다.

```typescript
const car = {
  brand: "Toyota",
  year: 2020,
};

type CarKeys = keyof typeof car; // "brand" | "year"

const key: CarKeys = "brand"; // "brand" 또는 "year" 가능
```

해석 순서를 설명드리자면 `car` 객채의 `typeof`를 먼저 해석하여 `{brand: string, year: number}`로 해석합니다. 그 후에 `keyof`로 위에 설명했던 것처럼 키 값들을 추출하고 객체 내에 존재하는 모든 값들을 유니온 타입으로 반환시킵니다.

만약 `car` 객채의 값들 말고 다른 값을 넣으면 역시 타입스크립트는 컴파일 단계에서 에러를 낼 것입니다.
