import LoginAndSignUpComponent from "../Components/LoginAndSignUpComponent";

const LoginAndSignUpPage = ({ userError, registerPasskey, loginUser, signUpUser, formik }) => {

    return (
        <div>
            <LoginAndSignUpComponent userError={userError} formik={formik} registerPasskey={registerPasskey} loginUser={loginUser} signUpUser={signUpUser}/>
        </div>
    );

};

export default LoginAndSignUpPage;