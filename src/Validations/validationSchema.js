import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({

    username: Yup.string().when('isLogin', {
        is: true,
        then: Yup.string().required('Username is required'),
    }),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be at most 32 characters')
        .required('Password is required'),
    dateOfBirth: Yup.date().when('isLogin',{
        is: false, 
        then: Yup.date().required('Date of Birth is required').nullable(),
    })
})