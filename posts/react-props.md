---
teaser: /React-props/thumbnail.png
category: React
title: React Props에 대해 알아보기
date: 2024-08-18T00:00:00+00:00
time: 21:17
description: React Props에 대해 알아봅니다.
---

![thumbnail](/React-props/thumbnail.png)

안녕하세요 nekonyangyee입니다.

오늘은 리액트를 입문하시거나 자바스크립트를 하시는 분들이라면 한번쯤 접해봤을법한 `props`에 대해 알아보려합니다.

## Props란?

---

초보분들에겐 아직 `Props`라는 단어가 어색할겁니다. 저도 한창 그랬었고요....

정의는 아래와 같습니다.

- 프로퍼티(`Properties`)의 줄임말입니다.

- 상위 컴포넌트에서 하위 컴포넌트로 특정 데이터를 넘길 때 사용됩니다.(단방향 특성)

- 프로퍼티는 받는 입장이 자식컴포넌트에서는 수정이 불가능하다.(자식 컴포넌트는 읽기전용 데이터이며, 부모 컴포넌트만 수정이 가능하다.)

## Props로 데이터 넘기는 방법은?

---

리액트를 사용하시는 분들에게는 익숙하게도 문자열일 경우에는 `" "`, 그 외에는 `{ }` 이런 식으로 중괄호를 사용합니다.

### ex) 프로퍼티 값이 문자열인 경우

```javascript
function App() {
  return (
    <div>
      <Header />
      <Main name="김삼성" />
      <Footer />
    </div>
  );
}

export default App;
```

### 그 외 프로퍼티 값

```javascript
function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <ChildComponent count={count} onIncrement={handleIncrement} />
    </div>
  );
}
```

### 2개이상 넘기는 경우

```javascript
function App() {
  return (
    <div>
      <Header />
      <Main name="김삼성" color="blue" />
      <Footer />
    </div>
  );
}

export default App;
```

## Props로 데이터 받는 방법은?

---

데이터를 넘겨주었으면 받는 방법도 알아야겠죠. 받는 방법은 `App()` 함수명 옆에 파라미터 칸에 `{}` 중괄호안에 데이터를 던져준 프로퍼티명을 넣어주면 됩니다. `name`으로 던져주었으면 `{name}`이렇게 말이죠.

```javascript
function Props({ name }) {
  return (
    <>
      <div>
        <p>그사람은 {name}이에요.</p>
      </div>
    </>
  );
}
```

개념은 이게 전부입니다. 이것만 아시면 데이터들을 하위 컴포넌트에 뿌릴 때 이런 `Props`으로 던져 줄 수 있습니다. 근데 다만 주의해야 할 점이 자식 컴포넌트로 `props` 전달하고 거기서 또 `props` 전달하고 이렇게 반복하다 보면 `depth`가 점점 깊어져 `Prop Drilling`을 유발할 수 있습니다. 이런경우는 뒤에가서 `Context API`나 전역상태관리 라이브러리를 사용합니다.
