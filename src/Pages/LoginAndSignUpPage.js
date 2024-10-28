import LoginAndSignUpComponent from "../Components/LoginAndSignUpComponent";

const LoginAndSignUpPage = ({ registerPasskey, loginUser, signUpUser, formik }) => {

    return (
        <div>
            <LoginAndSignUpComponent formik={formik} registerPasskey={registerPasskey} loginUser={loginUser} signUpUser={signUpUser}/>
        </div>
    );

};

export default LoginAndSignUpPage;