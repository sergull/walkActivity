export default function (errorCode){
    switch (errorCode) {
        case "auth/email-already-exists":
            return "Kullanıcı zaten kayıtlı "

        case "auth/invalid-email":
            return "Geçersiz e-posta adresi"
          
        case "auth/user-not-found":
            return "Kullanıcı bulunamadı"    
    
        default:
            errorCode;
    }
}