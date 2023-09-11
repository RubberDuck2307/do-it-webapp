import { Sticker } from '../components/sticker/Sticker'
import { EventCreateDTO, EventModifyDTO, GetFullEventDTO } from './event/EventDTOs'
import { TaskCreateDTO, TaskGetDTO, TaskModifyDTO } from './task/TaskDTOs'
import { StickerModifyDTO } from './sticker/StickerDTOs'
import { EventListCreateDTO, EventListDeleteDTO } from './event_list/EventListDTOS'
import axios, { AxiosResponse } from 'axios'
import { ACCESS_URLS } from '../routes/router'


const url = "https://doitapi-lhylpg4l6q-lz.a.run.app/api/v1/"

const api = axios.create({
  baseURL: url
})


api.interceptors.response.use((response) => response, (error) => {

  if (error.response?.status === 403  && !ACCESS_URLS.includes(window.location.pathname)) {
    window.location.href = "/login"
  }

  if(error.message === "Network Error" && !ACCESS_URLS.includes(window.location.pathname)){  //For some reason axios returns just a generic network error when recieves a 403 response without a body.
    window.location.href = "/login"
  }

  throw error;
});


export const getTasksRequest = () => api.get<TaskGetDTO[]>(`${url}task/`, { withCredentials: true })

export const createTaskRequest = (task: TaskCreateDTO) => api.post(`${url}task/`, task, { withCredentials: true })

export const modifyTaskRequest = (task: TaskModifyDTO) => api.put(`${url}task/`, task, { withCredentials: true })

export const toggleFinishedTaskRequest = async (taskId: number) => api.put(`${url}task/state/${taskId}`, {}, { withCredentials: true })

export const deleteTaskRequest = (taskId: number) => api.delete(`${url}task/${taskId}`, { withCredentials: true })

export const createStickerRequest = (color?: string): Promise<AxiosResponse<Sticker>> => api.post(`${url}sticker/`, { color }, { withCredentials: true })

export const getStickersRequest = () => api.get<Sticker[]>(`${url}sticker/`, { withCredentials: true })

export const modifyStickerRequest = (sticker: StickerModifyDTO) => api.put(`${url}sticker/${sticker.id}`, sticker, { withCredentials: true })

export const deleteStickerRequest = (stickerId: number) => api.delete(`${url}sticker/${stickerId}`, { withCredentials: true })

export const getEventsRequest = () => api.get(`${url}event/`, { withCredentials: true })

export const getFullEventsRequest = (id: number) => api.get(`${url}event/${id}`, { withCredentials: true })

export const getTodaysEventsRequest = () => api.get(`${url}event/today`, { withCredentials: true })

export const createEventRequest = (event: EventCreateDTO) => api.post(`${url}event/`, event, { withCredentials: true })

export const deleteEventRequest = (eventId: number) => api.delete(`${url}event/${eventId}`, { withCredentials: true })

export const modifyEventRequest = (event: EventModifyDTO) => api.put(`${url}event/${event.id}`, event, { withCredentials: true })

export const getThisWeekEvents = () => api.get(`${url}event/week`)

export const getWeekEvents = (date: Date): Promise<AxiosResponse<GetFullEventDTO[]>> => api.get(`${url}event/week/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, { withCredentials: true })

export const getEventsByDate = (date: Date): Promise<AxiosResponse<GetFullEventDTO[]>> => api.get(`${url}event/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, { withCredentials: true })

export const getEventsByMonth = (date: Date): Promise<AxiosResponse<GetFullEventDTO[]>> => api.get(`${url}event/month/${date.getMonth() + 1}/${date.getFullYear()}`, { withCredentials: true })

export const loginRequest = (email: string, password: string) => api.post(`${url}access/login`, { email, password }, { withCredentials: true })

export const logOutRequest = () => api.get(`${url}access/logout`, { withCredentials: true })

export const checkAuthRequest = () => api.get(`${url}access/`, { withCredentials: true })

export const registerRequest = (email: string, password: string) => api.post(`${url}access/registration`, { email, password }, { withCredentials: true })

export const confirmEmailRequest = (token: string) => api.get(`${url}access/email/confirmation?token=${token}`, { withCredentials: true })

export const resendEmailRequest = (token: string) => api.post(`${url}access/email/confirmation/resend`, { token })

export const resendEmailRequestByEmail = (email: string) => api.post(`${url}access/email/confirmation/resend`, { email })

export const sendChangePasswordEmailRequest = (email: string) => api.post(`${url}access/password/reset/request`, { email })

export const changePasswordRequest = (token: string, password: string) => api.post(`${url}access/password/reset`, { password, token })

export const googleLoginRequest = (code: string) => api.post(`${url}access/oauth/google`, { code: code }, { withCredentials: true })

export const getAllEventListsRequest = () => api.get(`${url}eventList/`, { withCredentials: true })

export const createEventListRequest = (list: EventListCreateDTO) => api.post(`${url}eventList/`, list, { withCredentials: true })

export const deleteEventListsRequest = (dto: EventListDeleteDTO) => api.delete(`${url}eventList/`, { data: dto, withCredentials: true })

export const getEventsInYearRangeRequest = (date: Date): Promise<AxiosResponse<GetFullEventDTO[]>> => api.get(`${url}event/year/range/${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`, { withCredentials: true })

export const GOOGLE_OAUTH = "https://accounts.google.com/o/oauth2/v2/auth?client_id=429841849052-6hemmrud9ekkdhee7tqt0susj7mppjls.apps.googleusercontent.com&redirect_uri=https://doit-react-lhylpg4l6q-lz.a.run.app/oauth2/callback/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email"

