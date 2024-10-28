import RegisterPasskeyComponent from "../Components/RegisterPasskeyComponent";

const RegisterPasskey = ({formik, registerPasskey, signUpUser, loginUser}) => {

    return (
        <div>
            <RegisterPasskeyComponent formik={formik} registerPasskey={registerPasskey} signUpUser={signUpUser} loginUser={loginUser} />
        </div>
    )
};

export default RegisterPasskey;