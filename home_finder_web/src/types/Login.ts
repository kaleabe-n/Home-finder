interface Login{
    username:string,
    password:string
}

interface LoginResponse{
    refresh:string,
    access:string
}

export default Login
export {LoginResponse}