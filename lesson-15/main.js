// main.js
"use strict";

const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  app = express();

/**
 * Listing 14.1 (p. 205)
 * Mongoose를 사용한 MongoDB 연결
 */
const mongoose = require("mongoose"); // Mongoose 모듈의 요청

mongoose.Promise = global.Promise; // 필요 없을 것 같은데?

mongoose.connect(
  "mongodb+srv://krissvector58:LdOReXBPN87fODa6@ut-node.0qoahfe.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node/ut-node",
  { useNewUrlParser: true }
);

// 애플리케이션이 데이터베이스에 연결됐을 때 메시지 출력
const db = mongoose.connection; // db 변수에 데이터베이스 할당

/**
 * Listing 14.2 (p. 206)
 * 데이터베이스 연결 이벤트 처리
 */
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || port);
app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

/**
 * Listing 9.5 (p. 149)
 * 요청 본문으로부터 포스팅된 데이터 캡처
 */
app.use(
  express.urlencoded({
    extended: false,
  })
); // Express.js에 body-parser를 이용해 URL-encoded 데이터를 파싱하도록 요청
app.use(express.json());

app.get("/", homeController.getHomePage);
app.get("/name/:myName", homeController.respondWithName2);

/**
 * @TODO: Listing 15.2 (p. 216)
 * 구독자 컨트롤러 사용
 */


/**
 * @TODO: Listing 15.5 (p. 219-220)
 * 구독을 위한 라우트
 */
// 구독 페이지를 위한 GET 라우트
app.get("/subscribe", subscribersController.getSubscriptionPage);
// 구독 데이터 처리를 위한 POST 라우트
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers2);

/**
 * Listing 11.4 (p. 169)
 * 사용자 정의 메시지를 통한 에러와 없는 라우트 처리
 */
app.use(errorController.logErrors);
app.use(errorController.resNotFound); // main.js에 에러 처리 미들웨어 추가
app.use(errorController.resInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
