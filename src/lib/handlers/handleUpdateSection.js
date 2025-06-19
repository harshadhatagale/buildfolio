import { useDispatch, useSelector } from "react-redux"

export const useUpdateSection=()=>{
    const dispatch= useDispatch()
    const sections= useSelector((state)=> state.portfolio.section)
    
}