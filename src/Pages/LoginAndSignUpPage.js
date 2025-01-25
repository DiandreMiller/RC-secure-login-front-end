import LoginAndSignUpComponent from "../Components/LoginAndSignUpComponent";

const LoginAndSignUpPage = ({ userError, registerPasskey, loginUser, formik, isLogin , setIsLogin, signupUserMessage}) => {

    return (
        <div>
            <LoginAndSignUpComponent userError={userError} formik={formik} 
            registerPasskey={registerPasskey} loginUser={loginUser} 
            signupUserMessage={signupUserMessage}
            isLogin={isLogin} setIsLogin={setIsLogin}/>
        </div>
    );

};

export default LoginAndSignUpPage;