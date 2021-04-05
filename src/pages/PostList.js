import React from "react";
import Post from "../components/Post";
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Permit from "../shared/Permit";
import { history } from "../redux/configureStore";
import {useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post"

const PostList = () => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);

    React.useEffect(()=>{
        if(post_list.length === 0){ //이미 목록리스트에 포스트가 있다면 새로 불러올 필요 없어! addPost만 할꺼얌 
            dispatch(postActions.getPostFB())
        }
    },[]);
    
    console.log(post_list);
    return (
        <React.Fragment>
            {post_list.map((p, idx) => {
                return <Post key={p.id} {...p}/>
            })}
            <Permit>
                    <Fab onClick={()=>{
                        history.push("/write")
                    }}style={{position:"absolute", left:"80%"}} color="secondary" aria-label="edit">
                    <EditIcon />
                    </Fab>
            </Permit>
        </React.Fragment>
    );
}




export default PostList;