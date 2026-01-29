import { ParameterInfo } from "./parametersInfo"

export type BlockInfo = {
    id: number
    title: string
    description: string
    typeView: string // v1, v2, v3
    priorityView: number
    media: string  
    params?: ParameterInfo[] 
}