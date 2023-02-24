import axios, { AxiosRequestConfig } from 'axios'
import { getInLocalStorage, getValidationError, LocalStorageKeys } from '../utilities'
import { SnackbarUtilities } from '../utilities/snackbar-manager'

export const AxiosInterceptor = () => {
  const updateHeader = (request: AxiosRequestConfig): AxiosRequestConfig => {
    const user = getInLocalStorage(LocalStorageKeys.USER)
    const token = user.id
    const newHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    request.headers = newHeaders
    return request
  }

  axios.interceptors.request.use((request: any) => {
    if (request.url?.includes('assets')) return request
    return updateHeader(request)
  })

  axios.interceptors.response.use(
    (response) => {
      if (!(response.status == null)) {
        if (response.status !== 200) {
          SnackbarUtilities.error(response.data?.message)
          return Promise.reject(response)
        }
      }
      return response
    },
    (error) => {
      SnackbarUtilities.error(getValidationError(error.code))
      return Promise.reject(error)
    },
  )
}
