import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";


// 리듀서를 가져올거예요.
import User from "./modules/user";
import Post from "./modules/post";
import Image from "./modules/image";
import Like from "./modules/like";
import Comment from "./modules/comment";

// 브라우저 히스토리를 만듭니다.
export const history = createBrowserHistory();

// 가져온 리듀서를 루트 리듀서로 묶어줍니다. and 라우터+히스토리 연결하기
const rootReducer = combineReducers({
  user: User,
  post: Post,
  image: Image,
  like: Like,
  comment: Comment,
  router: connectRouter(history),
});

// 사용할 미들웨어를 여기에 넣어줍니다. 더 있으면 여기에 넣어준다.
// thunk에는 history를 넣어줄거예요. (중간 다리 역할을 하는 미들웨어에서도 페이지 이동을 할 수 있게 하려고!)
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ... 우리는 개발!)
const env = process.env.NODE_ENV;

// 개발환경이라면? require = 패키지 가져와 / 로거라는 걸 하나만 더 써볼게요.
// 로거(이전/이후 데이터 보여줌) but 개발환경에서만 보여야 고객이 볼 수 없겠지?
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// redux devtools 익스텐션 사용 설정 // 데브툴스 사용을 위함
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기(미들웨어+리듀서)
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
