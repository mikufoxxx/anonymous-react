import { create } from 'zustand'

const useStore = create((set) => ({
  currentStudent: null,
  setCurrentStudent: (currentStudent) => {
    set({
      currentStudent
    })
  }
}))
export default useStore;