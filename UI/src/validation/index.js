export const emailFormatValidation = (email) => {
    if(!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
        return false;
    }
    return true;
}
export const mobileNumberPatternValidation = (mobile) => {
    const mobliePattern = /^[0-9\b]+$/;
    if(!mobliePattern.test(mobile)) {
        return false
    }
    return true;
}
export const mobileLengthChecking = (mobile) => {
    if(mobile.length !== 11) {
        return false;
    }
    return true;
}
export const emptyValidationCheck = (data) => {
    if(data === ""){
        return  false;
    }
    return true;
}