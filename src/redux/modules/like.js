import {createAction, handleActions} from "redux-actions";
import { produce } from "immer";
import firebase from "firebase/app";
import { firestore } from "../../shared/firebase";
import { actionCreators as postActions } from "./post";

//Action 생성하기

const GET_LIKE = "GET_LIKE"; //좋아요 불러오기
const ADD_LIKE = "ADD_LIKE"; // 좋아요 추가하기
const DELETE_LIKE = "DELETE_LIKE"; //좋아요 삭제하기

//Action creators 액션 생성 함수 만들기
//모 받아야하지??? 
const getLike = createAction(GET_LIKE, (like) => ({like}));
const addLike = createAction(ADD_LIKE, (post_id) => ({post_id}));
const deleteLike = createAction(DELETE_LIKE, (post_id) => ({post_id}));

//initialState 만들기
const initialState = {
    like_list: [],
}

//middleware actions (액션과 리듀서 사이)
//좋아요 리스트 가져오기....
const getLikeFB = (user_id) => {
    return function (dispatch, getState, { history }){
        const likeDB = firestore.collection("like");
        likeDB
        .doc(user_id)
        .get()
        .then((docs) => {
            console.log(docs.data());
            dispatch(getLike(docs.data().like_list));
            console.log(docs.data().like_list);
        })
        .catch((err) => {
            console.log("getLikeFB에 문제가 있슴다!!! 무야호~",err);
        })
    }
}


//좋아요 추가하기
const addLikeFB = (post_id) => {
    return function (dispatch, getState, { history }){
        const likeDB = firestore.collection("like")
        const user_info = getState().user.user; //유저정보 리덕스에서 가져오기 맞쥬?
        //유저 정보 없으면 의미없다!
        console.log(user_info.uid)
        if(!user_info.uid === null){
            return;
        }
        // 문서에 배열 필드가 포함되어 있으면 arrayUnion()를 사용해 요소를 추가
        const likeRef = likeDB.doc(user_info.uid);
        likeRef.update({
            like_list: firebase.firestore.FieldValue.arrayUnion(`${post_id}`)
        }).then(()=>{
        })

        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const increment =  firebase.firestore.FieldValue.increment(1)

        postDB
        .doc(post_id)
        .update({like_cnt: increment})
        .then((_post) => {
            dispatch(addLike(post_id));
        })
        //포스트가 있다면 리덕스에서도 정보 수정해주기! +1 해주기
        if(post){
            dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt) + 1}));
        }
    }
}

//좋아요 삭제하기
const deleteLikeFB = (post_id) => {
    return function (dispatch, getState, { history }){
        const likeDB = firestore.collection("like");
        const user_info = getState().user.user;

        //유저 정보 없으면 의미없다!
        if(!user_info.uid){
            return;
        }

        //문서에 배열 필드가 포함되어 있으면 arrayRemove()를 사용해 요소를 삭제할 수 있다
        const likeRef = firestore.collection("like").doc(user_info.uid);
        likeRef.update({
            like_list: firebase.firestore.FieldValue.arrayRemove(`${post_id}`)
        }).then(()=>{
        })

        const postDB = firestore.collection("post");
        const post = getState().post.list.find((l) => l.id === post_id);
        const increment =  firebase.firestore.FieldValue.increment(-1);

        postDB
        .doc(post_id)
        .update({like_cnt: increment})
        .then((_post) => {
            dispatch(deleteLike(post_id));
            console.log(_post);
        })

        //포스트가 있다면 리덕스에서도 정보 수정해주기! -1 해주기
        if(post){
            dispatch(postActions.editPost(post_id, {like_cnt: parseInt(post.like_cnt) - 1}));
        }
    }
}



//reducer 연결하기
export default handleActions(
    {
        [GET_LIKE]: (state, action) => produce(state, (draft) => {
          draft.like_list = action.payload.like;
        }),
        [ADD_LIKE]: (state, action) => produce(state, (draft) => {
            draft.like_list.push(action.payload.post_id);
        }),
        [DELETE_LIKE]: (state, action) => produce(state, (draft) => {
            draft.like_list = draft.like_list.filter((v) => v !== action.payload.post_id)
        }),


    }, initialState
);

//actioncreators 보내주자 
const actionCreators = {
    getLike,
    addLike,
    deleteLike,
    getLikeFB,
    addLikeFB,
    deleteLikeFB,
};

export {actionCreators}