export  const host = process.env.BACKEND_URL;
export const registerRoute = `${host}/api/auth/register`
export const loginRoute = `${host}/api/auth/login`
export const setAvatarRoute = `${host}/api/auth/setAvatar`
export const allUsersRoute = `${host}/api/auth/getUsers`
export const sendMessageRoute = `${host}/api/messages/addmsg`
export const getMessageRoute = `${host}/api/messages/getmsg`;
export const chatCheck = `${host}/api/chatcheck`

