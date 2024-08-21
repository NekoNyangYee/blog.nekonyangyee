---
teaser: /TypeScript-Util-Type/thumbnail.png
category: TypeScript
title: TypeScript 유틸타입 알아보기 (Record, Pick, Omit, Partial)
date: 2024-08-21T00:00:00+00:00
time: 21:40
description: TypeScript Record, Pick, Omit, Partial에 대해 알아봅니다.
---

![thumbnail](/TypeScript-Util-Type/thumbnail.png)

안녕하세요. nekonyangyee입니다.

오늘은 타입스크립트를 한다고 하면 꼭 마주치는 유틸 타입들에 대해 알아보겠습니다.

## 유틸리티 타입이란?

---

- 쉽게 말해 제네릭타입이라고 불립니다.

- 굳이 필수로 써야하는 타입들은 아니지만 만약 쓰게 된다면 코드를 보다 짧게 압축해서 작성할 수 있습니다.

## `Pick<T, K>`

---

`Pick` 같은 경우는 `T`의 특정 프로퍼티 키(`K`)들만 선택해서 새로운 타입을 만듭니다.

```typescript
interface User {
  name: string;
  age: number;
  email?: string;
}

type UserbasicInfo = Pick<User, "name" | "age">;

const user: UserbasicInfo = {
  name: "Jhon",
  age: 25,
};

function printUser<T extends UserbasicInfo>(user: T): void {
  console.log(user.name, user.age);
}

printUser(user);
```

## `Omit<T, K>`

---

`Pick`과는 반대로 `T`의 특정 프로퍼티 키(`K`)들을 제외한 나머지에 대한 새로운 타입을 반환합니다.

```typescript
interface UserBasic {
  name: string;
  age: number;
  email?: string;
  description?: string;
}

type UserInfo = Omit<UserBasic, "name" | "age">;

const userExtends: UserInfo = {
  email: "a@kakao.com",
  description: "hello",
};

function printUserOmit<T extends UserInfo>(user: T): void {
  console.log(user.email, user.description);
}

printUserOmit(userExtends);
```

## `Record<K, T>`

---

타입스크립트에서 딕셔너리란 키-값을 한쌍으로 이루는 데이터를 의미합니다.

자바스크립트에서는 객체를 이용해 딕셔너리를 만들 수 있습니다. 타입스크립트는 이러한 딕셔너리의 타입을 강력하게 정의 할 수 있도록 `Record`가 있습니다.

`K`는 유니온 타입 혹은 일반 타입들(stirng, number, symbol)이 될 수 있습니다. 만약 일반 타입을 사용하게 된다면 반드시 기재한 3개의 타입밖에 못 씁니다.

그리고 `T`는 해당 키의 타입이 들어옵니다. 미리 정해놓은 `type` 혹은 `interface`로도 가능합니다.

```typescript
type Fruit = "apple" | "banana" | "orange";
type FruitInfo = Record<Fruit, { color: string; taste: string }>;
// 제네릭 타입변수 이용해서 과일 콘솔에 찍기
function printFruitInfo<K extends Fruit>(fruit: K, info: FruitInfo[K]): void {
  console.log(`Fruit: ${fruit}, Color: ${info.color}, Taste: ${info.taste}`);
}

const fruitInfo: FruitInfo = {
  apple: { color: "red", taste: "sweet" },
  banana: { color: "yellow", taste: "sweet" },
  orange: { color: "orange", taste: "citrusy" },
};

// 함수 호출 예시
printFruitInfo("apple", fruitInfo.apple);
printFruitInfo("banana", fruitInfo.banana);
printFruitInfo("orange", fruitInfo.orange);
```

## `Partial<T>`

---

`Partial` 타입은 객체 타입의 모든 속성을 선택적으로 만드는 데 사용됩니다. 쉽게 말해, 원래의 객체 타입에서 모든 속성을 '있어도 되고 없어도 되는' 상태로 변경하는 도구입니다.

```typescript
interface UserDB {
  id: number;
  name: string;
  age: number;
  email?: string;
  description?: string;
}

type UserOptional = Partial<UserDB>;

function createUser<T extends UserOptional>(user: T): void {
  console.log(user.name);
  console.log(user.age, user.email, user.description);
  console.log(user.id, user.name, user.age, user.email, user.description);
}

createUser({ name: "neo", age: 85 });
createUser({ name: "neo", age: 85, email: "a@kakao.com" });
```
