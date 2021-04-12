import React from "react";
import {Grid, Text, Image, Button} from "../elements";
import {actionCreators as postActions} from "../redux/modules/post";
import {actionCreators as likeActions} from "../redux/modules/like";
import {useDispatch, useSelector} from "react-redux";
import { history } from "../redux/configureStore";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Post = (props) => {
    const dispatch = useDispatch();
    const like_lists = useSelector((state) => state.like.like_list);
    console.log(like_lists);
    console.log(props.id);
    const is_login = useSelector((state) => state.user.is_login);

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Grid is_flex width="auto">
                    <Grid is_flex2>
                        <Image shape="circle" src={props.src} />
                        <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                
                    <Grid is_flex width="auto">
                        <Text>{props.insert_dt}</Text>
                    </Grid>
                </Grid>
                {props.is_me && (
                    <React.Fragment>
                    <Button
                        width="auto"
                        margin="4px"
                        padding="4px"
                        _onClick={(e) => {
                        //  이벤트 캡쳐링과 버블링을 막아요!
                        // 이벤트 캡쳐링, 버블링이 뭔지 검색해보기! :)
                        e.preventDefault();
                        e.stopPropagation();
                        history.push(`/write/${props.id}`);
                        }}
                    >
                        수정
                    </Button>
                    <Button
                        width="auto"
                        margin="4px"
                        padding="4px"
                        _onClick={(e) => {
                        //  이벤트 캡쳐링과 버블링을 막아요!
                        // 이벤트 캡쳐링, 버블링이 뭔지 검색해보기! :)
                        e.preventDefault();
                        e.stopPropagation();
    
                        // 게시글 삭제하기
                        // 여기에서는 window.confirm 등을 사용해서 진짜 지우냐고 한 번 더 물어봐주면 정말 좋겠죠!
                        dispatch(postActions.deletePostFB(props.id));
                        }}
                    >
                        삭제
                    </Button>
                    </React.Fragment>
                )}
            </Grid>
            <Grid padding="16px">
                <Text>{props.contents}</Text>
            </Grid>
            <Grid>
                <Image shape="rectangle" src={props.image_url} />
            </Grid>
        
            <Grid is_flex2 padding="16px">
                {
                    like_lists.findIndex((p) => p === props.id) >= 0 ? (
                        <FavoriteIcon onClick={()=>{
                            is_login?
                            dispatch(likeActions.deleteLikeFB(props.id))
                            :window.alert("로그인 해주세요!");
                        }}/>
                    ) : (
                        <FavoriteBorderIcon onClick={()=>{
                            is_login?
                            dispatch(likeActions.addLikeFB(props.id))
                            :window.alert("로그인 해주세요!");
                        }}/>
                    )
                    
                }
                
                <Text margin="0px 3px " bold>
                좋아요 {props.like_cnt}개
                </Text>
            </Grid>
        </React.Fragment>
    );
}
        
Post.defaultProps = {
    id: null,
    user_info: {
    user_id: "",
    user_name: "amy",
    user_profile: "https://blog.kakaocdn.net/dn/bpdmdy/btq1BxDx5g1/pxKH75KiAnsaDOQaKuRw00/img.jpg",
    },
    image_url: "https://blog.kakaocdn.net/dn/v9G6K/btq1Eolv2Uc/2wNpX15q7aU7gUo3oR6iK0/img.jpg",
    contents: "성수동 앤아더",
    like_cnt: 0,
    insert_dt: "2021-03-27 10:00:00",
    is_me: false,
    is_like: false,
};
    
export default Post;