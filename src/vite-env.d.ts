/// <reference types="vite/client" />

declare interface Window {
	savePosition: Function
	jsonpCallback: Function
}

declare type ITable<T> = {
	total: number
	list: T[]
}

declare interface IPage {
	page: number
	size: number
}

declare module "jsnes"
