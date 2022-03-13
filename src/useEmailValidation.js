import useInterval from './useInterval';

function useEmailValidation(seconds) {
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const [emailValid, setEmailValid] = useState(false)
    const emailReducer = (state, action) => {
        const isEmailValid = validateEmail(action)
        setEmailValid(isEmailValid)
        return action
    }

    const [email, setEmail] = useReducer(emailReducer, '')

    const maxSeconds = 30
    const [count, setCount] = useState(maxSeconds)

    useInterval(() =>{
        setCount(count - 1)
    }, 1000)

    const refObject = { setEmail, count, email, emailValid, setCount }
    return refObject
}

export default useEmailValidation