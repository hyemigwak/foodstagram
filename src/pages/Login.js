import React, {useState} from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import {actionCreators as userActions} from "../redux/modules/user";
import {useDispatch} from "react-redux";
import {Grid, Text, Input, Button} from "../elements";
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie";
import "../main.css";
import { emailCheck } from "../shared/common";


const Login = () => {
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const login = () => {

        if( id ==="" || pwd === ""){
            window.alert("모두 입력해주세요!")
            return;
        }

        if(!emailCheck(id)){
          window.alert("이메일 형식이 맞지 않습니다!")
          return;
        }
        dispatch(userActions.loginFB(id, pwd));
    }
    return(
        <React.Fragment>
        <Grid padding="16px">
          <Text size="32px" bold>
            로그인
          </Text>
  
          <Grid padding="16px 0px">
            <Input
              label="아이디"
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
  
          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              placeholder="패스워드 입력해주세요."
              type="password"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              value={pwd}
            />
          </Grid>
  
          <Button _onClick={() => {
              console.log("로그인체키라웃!")
              login();
            }} variant="outlined">로그인</Button>

        </Grid>
      </React.Fragment>
    )
}



export default Login;