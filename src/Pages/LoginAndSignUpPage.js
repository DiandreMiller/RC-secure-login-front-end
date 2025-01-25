import LoginAndSignUpComponent from "../Components/LoginAndSignUpComponent";

const LoginAndSignUpPage = ({ userError, registerPasskey, loginUser, formik, isLogin , setIsLogin}) => {

    return (
        <div>
            <LoginAndSignUpComponent userError={userError} formik={formik} 
            registerPasskey={registerPasskey} loginUser={loginUser} 
            isLogin={isLogin} setIsLogin={setIsLogin}/>
        </div>
    );

};

export default LoginAndSignUpPage;