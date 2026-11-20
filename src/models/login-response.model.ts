

export interface User {
    userId : number
    username : string
    roles : Set<any>
    enabled : boolean
    failedAttempts : number
    lockedUntil : Date
    mfaEnabled : boolean
    mfaSecretEncrypted : boolean
}

export interface LoginResponse {
    accessToken : string
    tokenType : string
    expiresIn : string
    user : User
}