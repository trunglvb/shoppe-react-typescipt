import { IUser } from 'src/types/user.type'
import { ISuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

interface BodyUpdateProfile extends Omit<IUser, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const userApi = {
  getProfile() {
    return http.get<ISuccessResponseApi<IUser>>('me')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<ISuccessResponseApi<IUser>>('user', body)
  },
  uploadAvatar(body: FormData) {
    return http.post<ISuccessResponseApi<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
