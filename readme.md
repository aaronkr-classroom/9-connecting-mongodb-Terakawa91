[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=14942238)
# MongoDB 데이터베이스 연결

이번 과제에서는 MongoDB 데이터베이스에 연결하고 데이터를 읽고 쓰는 방법을 배웁니다.

이 과제는 3 부분으로 나뉩니다.

1. 'MongoDB 데이터베이스 셋업' (13장)
2. 'Mongoose를 사용한 모델 제작' (14장)
3. '컨트롤러와 모델과의 연결' (15장)

---

## 1. MongoDB 데이터베이스 셋업

### 1.1 MongoDB 설치

Download and install the following software:<br>
다음 소프트웨어를 다운로드하고 설치합니다.

- [MongoDB Community Server](https://www.mongodb.com/download-center/community)
- [MongoDB Compass](https://www.mongodb.com/download-center/compass) (Commuity Server 설치 시 자동으로 설치됩니다.)
- [MongoDB Shell](https://www.mongodb.com/try/download/shell)

Unzip the MongoDB Shell into the MongoDB installation directory (e.g. C:\Program Files\MongoDB\Server\6.0\bin). Then add _both_ the MongoDB `bin` and the MongoDB Shell `bin` directories to your PATH environment variables (e.g. C:\Program Files\MongoDB\Server\6.0\bin;C:\Program Files\MongoDB\mongosh-1.8.0-win32-x64\bin).<br>
MongoDB Shell을 MongoDB 설치 디렉토리에 압축 해제합니다 (예: C:\Program Files\MongoDB\Server\6.0\bin). 그런 다음 MongoDB `bin`과 MongoDB Shell `bin` 디렉토리 _둘 다_ PATH 환경 변수에 추가합니다 (예: C:\Program Files\MongoDB\Server\6.0\bin;C:\Program Files\MongoDB\mongosh-1.8.0-win32-x64\bin).

### 1.2 MongoDB 서버 시작

Open a Git Bash terminal and run `mongod` to start the MongoDB server.<br>
Git Bash 터미널을 열고 `mongod`를 실행하여 MongoDB 서버를 시작합니다.

```bash
$ mongod
```

Alternatively, you may also start the MongoDB server from MongoDB Compass.<br>
또는 MongoDB Compass에서 MongoDB 서버를 시작할 수도 있습니다.

### 1.3 MongoDB Shell 실행

In a new Git Bash terminal, run `mongosh` to start the MongoDB Shell.<br>
새로운 Git Bash 터미널에서 `mongosh`를 실행하여 MongoDB Shell을 시작합니다.

```bash
$ mongosh
```

Run the following commands from section 13.2 in the book.<br>
책의 13.2 절에서 다음 명령을 실행합니다.

```bash
> db
> show dbs
> use recipe_db
> db
```

The `use <new_db_name>` command allows you to simultaneously create and use a new database of your choice (`recipe_db` is similar to what is used in the book, `ut-nodejs` is also a good choice).<br>
`use <new_db_name>` 명령을 사용하면 선택한 새 데이터베이스 (`recipe_db`는 책에서 사용하는 것과 유사하며 `ut-nodejs`도 좋은 선택입니다)를 동시에 만들고 사용할 수 있습니다.

### 1.4 Add new data in Shell / 셸에서 새 데이터 추가

Run the following commands from section 13.3 in the book to add data _to a new `contacts` collection_ in your database.<br>
책의 13.3 절에서 다음 명령을 실행하여 데이터베이스의 _새 `contacts` 컬렉션_ 에 데이터를 추가합니다.

```bash
> db.contacts.insert({name: "John", email: "me@email.com", phone: "123-456-7890"})
> db.contacts.find()
> db.contacts.find({_id: ObjectId("5e9f9b9b9b9b9b9b9b9b9b9b")}) # your ObjectId
```

### 1.5 Add MongoDB to your application / 애플리케이션에 MongoDB 추가

In `./lesson-13/main.js`, add the code in Listing 13.5 and 13.6 to connect to the database and insert a new record.<br>
`./lesson-13/main.js`에 13.5 및 13.6의 코드를 추가하여 데이터베이스에 연결하고 새 레코드를 삽입합니다.

**Note**
In Lesson 13, you will _not_ use Mongoose.<br>
13 장에서는 Mongoose를 _사용하지 않습니다_.

---

## 2. Mongoose를 사용한 모델 제작

For Lessons 14 and 15, require the `mongoose` module and connect to the database.
14, 15 장에서는 `mongoose` 모듈을 필요로 하고 데이터베이스에 연결합니다.

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ut-nodejs', {useNewUrlParser: true});
```

**Warning**
Mongoose no longer supports callback funtions. Therefore, we need to write all functions using Promises with `then()` and `catch()`.<br>
Mongoose는 더 이상 콜백 함수를 지원하지 않습니다. 따라서 모든 함수를 `then()` 및 `catch()`를 사용하여 Promise로 작성해야 합니다.

### 2.1 Lesson 14 / 14 장

- `main1.js`

In `./lesson-14/main1.js`, add the code in Listings 14.1-14.4 to (1) use Mongoose to connect to the database, (2) create a new `Subscriber` schema, and (3) create and save a new Subscriber record to the database.<br>
`./lesson-14/main1.js`에 14.1-14.4의 코드를 추가하여 (1) Mongoose를 사용하여 데이터베이스에 연결하고 (2) 새 `Subscriber` 스키마를 만들고 (3) 새 Subscriber 레코드를 데이터베이스에 생성 및 저장합니다.

- `main2.js`
- `models/subscriber.js`

Then, in `./lesson-14/main2.js`, add the code in Listing 14.6 to query the database to find a particular subscriber. AND _move_ your Subscriber schema to a separate module in the `./models` folder, as shown in Listing 14.5<br>
그런 다음 `./lesson-14/main2.js`에 14.6의 코드를 추가하여 특정 Subscriber를 찾기 위해 데이터베이스를 쿼리합니다. 그리고 Subscriber 스키마를 `./models` 폴더의 별도의 모듈로 _이동_ 합니다. 14.5의 코드를 참조하세요.

### 2.2 Lesson 15 / 15 장

- `subscriberController.js`
- `main.js`

In Lesson 15, we need to create a `subsriberController` for our Subscriber model. It will contain the following functions:<br>
15 장에서는 Subscriber 모델을 위한 `subsriberController`를 만들어야 합니다. 다음 함수가 포함됩니다.

- `getAllSubscribers()` - Listing 15.1, 15.7 (Promises)
- `getSubscriptionPage()` - Listing 15.6
- `saveSubscriber()` - Listing 15.6, 15.8 (Promises)

We will then need to call these functions from our `main.js` file.<br>
그런 다음 `main.js` 파일에서 이러한 함수를 호출해야 합니다.

- `subscribers.ejs` - Listing 15.3

We will also need to create a `subscribers.ejs` view to display the list of subscribers.<br>
또한 Subscriber 목록을 표시하는 `subscribers.ejs` 뷰를 만들어야 합니다.

- `seed.js` - Listing 15.9

Finally, we will need to create a `seed.js` file to populate our database with some initial data.<br>
마지막으로 초기 데이터로 데이터베이스를 채우는 `seed.js` 파일을 만들어야 합니다.

---

## 과제 파일

- **4-connecting-mongodb (NO TESTS) `(12/12)`** _(4월 21일까지)_
  - [lesson-13](./lesson-13) (MongoDB)
    - main.js `(2/2)`
  - [lesson-14](./lesson-14) (Mongoose)
    - main1.js `(2/2)`
    - <del>main2.js `(2/2)`</del>
    - /models/subscriber.js `(2/2)`
  - [lesson-15](./lesson-15) (Mongoose)
    - main.js `(2/2)`
    - /controllers/subscribersController.js `(2/2)`
    - subscribers.ejs `(2/2)`
    - <del>seed.js `(2/2)`</del>
