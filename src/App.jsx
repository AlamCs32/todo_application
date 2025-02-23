import { useEffect } from "react"
import { Toaster } from "./components/ui/toaster"
import { useToast } from "./helpers/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { resetToast, selectToastState } from "./stores/slices/toastSlice"
import AppNavigation from "./AppNavigation"

const App = () => {
  const { toast } = useToast()
  const toastData = useSelector(selectToastState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (toastData.isOpen) {
      toast({
        title: toastData.title,
        description: toastData.description,
        variant: toastData.variant,
      });

      // Reset toast after a short delay to prevent re-renders
      setTimeout(() => {
        dispatch(resetToast());
      }, 500);
    }
  }, [toastData, toast, dispatch]);

  return (
    <>
      <AppNavigation />
      <Toaster />
    </>
  )
}

export default App
