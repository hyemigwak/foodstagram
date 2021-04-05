import React from "react";
import styled from "styled-components";

const Grid = (props) => {
    const {is_flex, width, padding, margin, bg, children, is_flex2, is_flex3, screenCenter, center} = props; //props로 설정해준 값 가져오기!! 

    const styles = {
        is_flex: is_flex,
        is_flex2: is_flex2,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        is_flex3: is_flex3,
        screenCenter: screenCenter,
        center:center,
    };
    return(
        <React.Fragment>
            <GridBox {...styles}>{children}</GridBox>
        </React.Fragment>
    );
};

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: "100%",
    padding: false,
    margin: false,
    bg: false,
    is_flex2: false,
    is_flex3: false,
    screenCenter: false,
    center:false,
}
//props로 넘어오는 것들
//패딩을 넓이에 포함하겠니(box-sizing) / ok -> border-box
const GridBox = styled.div`
    width: ${(props) => props.width}; 
    height: 100%;
    box-sizing: border-box; 
    ${(props) => (props.padding? `padding: ${props.padding};` : "")};
    ${(props) => (props.margin? `margin: ${props.margin};` : "")};
    ${(props) => (props.bg? `background-color: ${props.bg};` : "")};
    ${(props) => props.is_flex? `display: flex; align-items: center; justify-content: space-between;`: ""}
    ${(props) => props.is_flex2? `display: flex; align-items: center; justify-content: flex-start;` : ""}
    ${(props) => props.is_flex3? `display: flex; align-items: center; justify-content: center;` : ""}
    ${(props) => props.screenCenter? `position: absolute; top:30%;` : ""}
    ${(props) => props.center? `text-align: center` : ""}
`;



export default Grid;