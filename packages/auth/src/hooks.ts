import { useAuth } from './auth-provider'

// Re-export useAuth
export { useAuth }

// Additional auth hooks can be added here
export function useAuthUser() {
  const { user } = useAuth()
  return user
}

export function useAuthLoading() {
  const { loading } = useAuth()
  return loading
}

export function useBrand() {
  const { brand } = useAuth()
  return brand
}
