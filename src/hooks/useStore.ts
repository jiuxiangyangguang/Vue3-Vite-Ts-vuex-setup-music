import { useStore as SSS } from 'vuex'
import { State } from '@/store/store'

const useStore = () => {
  const { state, commit } = SSS<State>()
  return { state, commit }
}

export default useStore