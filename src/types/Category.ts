export interface Category {
    id: number
    name: string
    parentId: number
    children: Children[]
}

export interface Children {
    id: number
    name: string
    parentId: number
    children: Children[]
}