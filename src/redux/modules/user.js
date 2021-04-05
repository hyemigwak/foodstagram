import {createAction, handleActions} from "redux-actions";
import { produce } from "immer";
import {setCookie, getCookie, deleteCookie} from "../../shared/Cookie";
import {auth} from "../../shared/firebase"; //로그인 필수
import firebase from "firebase/app";

//Action 생성하기
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

//Action creators 액션 생성 함수 만들기

const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));
const setUser = createAction(SET_USER, (user) => ({user}));


//initialState 만들기
const initialState = {
    user: null,
    is_login: false,
};

//user 객체 하나에 대한 state 필요해
const user_initial = {
    user_name: "amy",
}

//middleware actions (액션과 리듀서 사이)

const logoutFB = () => {
    return function (dispatch, getState, {history}) {
      auth.signOut().then(() => { //firebase 로그아웃 함수 = signOut()
        dispatch(logOut());
        history.replace("/");
      });
    };
  };


//로그인 여부 체크하기! 맞으면 유저정보를 넣어줄것!
const loginCheckFB = () => {
    return function (dispatch, getState, {history}){
      auth.onAuthStateChanged((user) => { //firebase docs에 있음,유저 여부 체크
        if(user){ //유저가 있으면 유저정보 넘김
          dispatch(
            setUser({
              user_name: user.displayName,
              user_profile: "",
              id: user.email,
              uid: user.uid,
            })
          );
        }else{ //유저정보 없으면 로그아웃시키자
          dispatch(logOut());
        }
      })
    }
}

const loginFB = (id,pwd) => {
    return function (dispatch, getState, {history}){
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
            auth
            .signInWithEmailAndPassword(id, pwd)
            .then((user) => {
                console.log(user);
                dispatch(setUser({user_name: user.user.displayName, id: id, user_profile:"",uid: user.user.id}));
                history.push("/");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
        })
    }
}


//user정보 받아서 firebase에 보내죠야해요!
const signupFB = (id,pwd,user_name) => {
    return function (dispatch, getState, {history}) {
        auth
        .createUserWithEmailAndPassword(id,pwd)
        .then((user) => {

            console.log(user);

            auth.currentUser.updateProfile({
                displayName: user_name,
            }).then(()=>{
                //닉넴까지 업뎃해주고 나면 드뎌 이제 로그인 시켜줘야한다! 
                //로그인할때 넘겨줄 정보는? 프로필/닉네임/id
                dispatch(setUser({user_name: user.user.displayName, id:id,user_profile: '', uid: user.user.uid}));
                history.push('/');
            }).catch((error)=>{
                console.log(error);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        
        console.log(errorCode, error);
        });
    }
} 

//reducer 연결하기
export default handleActions(
    {
        [SET_USER]: (state, action) => produce(state, (draft) => {
            setCookie("is_login", "success"); //name하고 value가 들어가야하는것 아닌갓?
            draft.user = action.payload.user;
            draft.is_login = true;
        }),

        [LOG_OUT]: (state, action) => produce(state, (draft) => {
           deleteCookie("is_login");
           draft.user = null;
           draft.is_login = false;
        }),
    
        [GET_USER]: (state, action) => produce(state, (draft) => {

        }),

    }, initialState
);


//actioncreators 보내주자 잘가라 친구들아 
const actionCreators = {
    setUser,
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export {actionCreators}
  