import React from "react";
import './App.css';
import { ConnectedRouter } from "connected-react-router";
import { Grid } from "../elements";
import { history } from "../redux/configureStore"; //히스토리 가져와야 여기서 쓸수있다!
import {Header, Post} from "../components";
import { Login, Signup, PostList, PostWrite } from "../pages";
import { Route } from "react-router-dom";
import {actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from "react-redux";
import {apiKey} from "./firebase";
import Permit from "./Permit";


function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  //APP.js가 가장 먼저 실행되니깐 로그인 여부를 최초 렌더링되는 여기서 체크
  React.useEffect(()=>{
    if(is_session){
      dispatch(userActions.loginCheckFB());
    }
  },[])

  return (
    <React.Fragment>
      <Grid>
        <ConnectedRouter history={history}>
          <Header></Header>
          {/* 아직 목록 페이지가 없으니, 루트 경로(/)는 Login을 엮어줄게요! */}
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
        </ConnectedRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
