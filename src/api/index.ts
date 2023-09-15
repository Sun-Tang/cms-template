import request from '../utils/request'

export const baseUrl = import.meta.env.VITE_APP_VIDEO_RUL
export const imgUploadLink = `${baseUrl}/api/v1/upload/localhost`
export const videoUploadLink = `${baseUrl}/api/v1/upload/vod`

export const login = (username: string, password: string) => {
  return request.post('/admin/login', {
    username,
    password
  })
}

export const getMenus = () => {
  return request.get('/admin/menus')
}
