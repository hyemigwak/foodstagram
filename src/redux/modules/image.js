import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import {storage} from "../../shared/firebase";


const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";


const uploading = createAction(UPLOADING, (uploading) => ({uploading}))
const uploadImage = createAction(UPLOAD_IMAGE, (image_url)=>({image_url}))
const setPreview = createAction(SET_PREVIEW, (preview) => ({preview}))

const initialState = {
    image_url:"",
    uploading: false,
    preview: null,
}

const uploadImageFB = (image) => {
    return function(dispatch, getState, {history}){

        //업로딩 시작
        dispatch(uploading(true));
        const _upload = storage.ref(`images/${image.name}`).put(image);

        _upload.then((snapshot) => {
            console.log(snapshot);
            snapshot.ref.getDownloadURL().then((url)=>{
                dispatch(uploadImage(url));
                console.log(url);
            })
        })
    }

}


//리듀서생성
export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state,(draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false; //위에서 디스패치 한번 더 안하게 업로드하면 업로딩을 false로 바꿔준다.
    }),

    [UPLOADING]: (state, action) => produce(state,(draft) => {
        draft.uploading = action.payload.uploading;
    }),

    [SET_PREVIEW]: (state, action) => produce(state,(draft) => {
        draft.preview = action.payload.preview;
    })

}, initialState);


const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
}

export {actionCreators};
