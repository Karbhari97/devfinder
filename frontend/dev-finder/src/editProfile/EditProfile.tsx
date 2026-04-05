import EditProfileForm from './EditProfileForm'
import { useSelector } from 'react-redux'

const EditProfile = () => {
   const user= useSelector((store:any)=>store.user)
    return user?.user && (
        <div className='flex align-middle justify-center' >
            <EditProfileForm user={user.user}  />
        </div>
    )
}

export default EditProfile
