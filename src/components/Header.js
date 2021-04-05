import React from "react";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Grid, Text, Button } from "../elements";
import {getCookie, deleteCookie} from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key)? true : false;

  console.log(sessionStorage.getItem(_session_key)); //세션이 있는지 체크함
  console.log(is_session)
  if(is_login && is_session){
      return (
          <React.Fragment>
            <Grid is_flex padding="4px 16px">
              <Grid>
                <FastfoodIcon/>
                <Text margin="0px" size="24px" bold>
                  먹스타그램
                </Text>
              </Grid>
    
              <Grid is_flex>
                <Button _onClick={()=>{
                  dispatch(userActions.logoutFB({}))
                  }}>
                  로그아웃
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        );
  }

  //   로그인 중이 아니라면 로그인 전 헤더를 보여줍니다.
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid is_flex2>
            <FastfoodIcon/>
            <Text margin="4px" size="24px" bold>
            먹스타그램
            </Text>
        </Grid>

        <Grid is_flex>
          <Button
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );

};

Header.defaultProps = {};

export default Header;
