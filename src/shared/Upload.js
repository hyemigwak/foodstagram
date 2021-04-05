import React from "react";
import {Button} from "../elements";
import {storage} from "./firebase";
import {useDispatch, useSelector} from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);
    const fileInput = React.useRef();
    
    const selectFile = (e) => {
        console.log(e); 
        console.log(e.target); //input 자체
        console.log(e.target.files[0]); // input의 파일

        console.log(fileInput.current.files[0]); //업로드한 파일

        //프리뷰 만들기 위해 파일리더 사용
        const reader = new FileReader();
        const file = e.target.files[0];
        
        //내장함수/ 메소드 readAsDataURL
        reader.readAsDataURL(file);
        // 읽기가 끝났을때
        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    const uploadFB = () => {
        let image = fileInput.current.files[0];
            dispatch(imageActions.uploadImageFB(image));
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}

export default Upload;