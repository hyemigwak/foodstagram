//쿠키 가져오고, 쿠키 만들고, 쿠키 삭제하는 함수 만들기

const getCookie = (name) => {
    // 쿠키 값을 가져옵니다.
    let value = "; " + document.cookie;
    // 키 값을 기준으로 파싱합니다. user_id=
    let parts = value.split(`; ${name}=`);
    // value를 return! pop으로 마지막꺼 반환해서 줌, ;로 쪼개고, 맨 앞에꺼를 반환해서 줌 = 밸류값 추출 aa=xx ; bbb; =cc 일때 bbb 겟
    if (parts.length === 2) {
          return parts.pop().split(";").shift();
      }
  };
  
  // 쿠키에 저장하는 함수, exp 기본값을 미리 주었음
  const setCookie = (name, value, exp = 5) => {
    let date = new Date();
    // 날짜를 만들어줍니다.(자바스크립트 기본 함수)
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000); //5일이 됨
    // 저장!
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};path=/`;
  };
  
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  const deleteCookie = (name) => {
      let date = new Date("2020-01-01").toUTCString();
      console.log(date);
    document.cookie = name + "=; expires="+date;
  }
  
  export { getCookie, setCookie, deleteCookie };