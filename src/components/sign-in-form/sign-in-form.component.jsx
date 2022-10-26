import {useState} from 'react'

import FormInput from "../form-input/form-input.component"
import Button, {BUTTON_TYPES_CLASSES} from "../buttons/buttons.component";
import {
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormField)
    const {email, password} = formFields

    const resetFormField = () => {
        setFormFields(defaultFormField)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetFormField();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password or email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                    autoComplete='username'
                />

                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                    autoComplete='current-password'
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPES_CLASSES.google} type='button' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm