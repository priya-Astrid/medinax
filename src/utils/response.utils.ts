
export const DoctorProfileResponse = (user: any, doctor: any)=>{
    return {
        user:{
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
        },
        doctor,
    }
}