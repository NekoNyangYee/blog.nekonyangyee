---
teaser: /JavaScript-recursion-function/thumbnail.png
category: JavaScript
title: (Javascript) 재귀함수에 대해 알아보기
date: 2024-08-16T00:00:00+00:00
time: 20:56
description: 알고리즘에 자주 등장하는 재귀함수에 대해 알아봅니다.
---

![thumbnail](/JavaScript-recursion-function/thumbnail.png)

안녕하세요. NekoNyangYee입니다.

오늘은 자바스크립트 알고리즘에 자주 등장하는 재귀함수에 대해 알아봅니다.

## 재귀의 사전적 정의는?

---

- 원래 자리로 되돌아가거나 되돌아오는 것을 말한다.

## 자바스크립트에서의 재귀

---

```javascript
//재귀의 코드 예시
function getPermutations(str) {
  if (str.length === 0) return []; // 빈 문자열에 대한 처리
  if (str.length === 1) return [str];

  let answer = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    let remainingChars = str.slice(0, i) + str.slice(i + 1);
    let remainingPermutations = getPermutations(remainingChars);

    for (let perm of remainingPermutations) {
      answer.push(char + perm);
    }
  }
  return answer;
}

console.log(getPermutations("abc"));
```

> 여기서 `getPermutations`이 실행이 된 후 아래로 한줄 씩 내려가다가 `let remainingPermutations = getPermutations(remainingChars);`을 만나면 다시 위로 올라가 `getPermutations`이 실행되고 안에 `remainingChars`는 위에서 `str` 파라미터로 들어가서 동작하는 것을 볼 수 있다.

## 재귀함수, 언제 쓰일까?

---

보통 단순 반복하는 작업을 할 때 좀더 간결하게 쓰기 위해 많이 씁니다.

그외에도...

1. 중첩된 반복문이 많거나 반복문의 중첩 횟수를 예측하기 어려운 경우

2. 주어진 문제를 비슷한 구조의 더 작은 문제로 나눌 수 있는 경우

밑에 예시를 하나 더 들어보겠습니다.

```javascript
function fibonacci(num) {
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}
```

위 예시는 알고리즘 문제에서도 자주 보이는 피보나치의 수 관련 문제입니다.

수(`num`)를 입력받아 피보나치 수열의 `num`번째 요소를 리턴해야 합니다.

0번째 피보나치 수는 0이고, 1번째 피보나치 수는 1입니다. 그 다음 2번째 피보나치 수부터는 바로 직전의 두 피보나치 수의 합으로 정의합니다.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
