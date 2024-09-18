interface User{
    first_name: string | undefined | null,
    last_name: string | undefined | null,
    username:string,
    email:string,
    password:string|null,
    is_superuser:boolean,
    is_verified:boolean,
    access:string,
    refresh:string,
    profile:string|null
    phone:string|null
}
interface UserToken{
    token_type: string, 
    exp: number, 
    iat: number, 
    jti: string, 
    username: string, 
    email: string, 
    is_verified: boolean, 
    is_superuser: boolean, 
    profile: string|null, 
    phone: string|null,
    first_name: string | undefined | null,
    last_name: string | undefined | null,
}

export default User
export {UserToken}