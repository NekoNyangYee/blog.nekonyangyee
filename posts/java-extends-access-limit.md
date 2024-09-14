---
teaser: /java-thumbnail.jpg
category: JAVA
title: JAVA 상속, 접근 제한자, super()
date: 2024-09-14T00:00:00+00:00
time: 17:03
description: JAVA 상속, 접근 제한자, super()에 대해 알아봅니다.
---

안녕하세요. nekonyangyee입니다.

오늘은 자바 첫 게시물로 상속, 접근제한자, `super()`를 묶어 설명하겠습니다.

## 1. 상속

---

- 기존 상위 클래스의 특성들을 하위 클래스로 물려주는 행위이다.

- 기존 상위 클래스는 슈퍼클래스(`super class`)라고도 부른다. (상위 클래스 == 부모 클래스 == 슈퍼 클래스)

- 상속을 받는 하위 클래스는 서브 클래스 (`sub class`)라고 부른다. (하위 클래스 == 자식 클래스 == 슈퍼 클래스)

- 상속을 하게 되면 중복되는 코그를 줄여주고 효율성을 높일 수 있다.

### 상속 선언 예시

```java
public class Person {
...
}
public class Student extends Person { // Person을 상속받는 클래스 Student 선언
...
}
public class StudentWorker extends Student { // Student를 상속받는 StudentWorker 선언
...
}
```

### 자바의 상속 특징

1. 클래스 다중 상속이 불가능하다.

2. 한번에 다수 개의 클래스를 상속받지 못한다.

3. 상속 횟수는 무제한이다.

4. 상속의 최상위 클래스는 `java.lang.Object`이다.

5. 모든 클래스는 최상위 클래스로부터 상속받는다.

## 2. 접근 제한자

---

클래스를 설계할 때 외부 클래스에서 접근을 할 수 있게 하였는가 못하게 막았는가를 구분한다.

### 2-1. `default`

클래스를 선언할 때 앞에 아무것도 안붙이면 그 클래스는 자동으로 `default`제한자를 갖는다.

이 제한자는 같은 패키지의 클래스에서만 사용하고 외부 다른 클래스에서는 사용이 불가능하다.

### 2-2. `public`

자바를 하다 보면 많이 쓰이는 제한자 중 하나인 `public`을 앞에 붙이면 같은 패키지의 클래스 뿐만 아니라 다른 패키지의 클래스에도 접근이 가능하다.

### 2-3. `protected`

이 제한자는 같은 패키지 클래스에서는 사용 가능하지만 다른 패키지의 클래스에서는 사용이 불가능하다.

단, 다른 패키지의 클래스의 서브 클래스면 호출이 가능하다.

### 2-4. `private`

이 제한자는 같은 패키지 클래스, 다른 패키지 클래스 상관없이 생성자 자체를 호출하지 못한다. 즉, 클래스 외부에서 new 연산자로 객체 생성이 불가능하다.

오직 클래스 내부에서만 생성자를 호출할 수 있고, 객체도 생성 가능하다.

## 3. `super()`

---

- 서브 클래스에서 명시적으로 슈퍼 클래스의 생성자를 선택 호출할 때 사용한다.

- 부모 클래스의 멤버와 자식 클래싀 멤버가 이름이 같을 경우, `super`키워드로 구별 가능하다.

### `super()`예시

```java
class A {
    public A() {
        System.out.println("생성자 A");
    }
    public A(int x) {
        System.out.println("매개변수 생성자A" + x);
    }
}

class B extends A {
    public B() {
        System.out.println("생성자 B");
    }
    public B(int x) {
        super(x);
        System.out.println("매개변수 생성자 B" + x);
    }
}

public class Ex {
    public static void main(String[] args) {
        B b;
        b = new B(5);
    }
}
```

A 클래스 안에 기본 생성자 A, 매개변수를 가지고 있는 생성자 A가 있습니다.

B 클래스에서는 A 클래스를 상속 받고 있고 안에는 기본 생성자 B, 매개변수를 가지고 있는 생성자 B가 있습니다.

매개변수를 가지고 있는 생성자 B안에 `super(x);`를 호출하게 된다면 부모 클래스 A의 매개변수 생성자 `A(int x)` 호출하게 됩니다
