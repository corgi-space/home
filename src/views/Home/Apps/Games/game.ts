import { addZero } from "@/utils"
import jsnes from "jsnes"

let SCREEN_WIDTH = 256
let SCREEN_HEIGHT = 240
let FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT

let canvas_ctx: CanvasRenderingContext2D, image: ImageData
let framebuffer_u8: ArrayLike<number>, framebuffer_u32

let audio_ctx: AudioContext, script_processor: ScriptProcessorNode

let AUDIO_BUFFERING = 512
let SAMPLE_COUNT = 4 * 1024
let SAMPLE_MASK = SAMPLE_COUNT - 1
let audio_samples_L = new Float32Array(SAMPLE_COUNT)
let audio_samples_R = new Float32Array(SAMPLE_COUNT)
let audio_write_cursor = 0,
	audio_read_cursor = 0
let status = false

/**
 * 按键映射
 */
const NeskeyMap = {
	1: {
		BUTTON_UP: 87, // up  -> W
		BUTTON_DOWN: 83, // Down -> S
		BUTTON_LEFT: 65, // Left -> D
		BUTTON_RIGHT: 68, // Right -> A
		BUTTON_A: 75, // A -> J
		BUTTON_B: 74, // B -> k
		BUTTON_SELECT: 9, // Select -> Tab
		BUTTON_START: 13 // Enter -> Enter
	},
	2: {
		BUTTON_UP: 38, // up -> up
		BUTTON_DOWN: 40, // Down -> Down
		BUTTON_LEFT: 37, // Left -> Left
		BUTTON_RIGHT: 39, // Right -> Right
		BUTTON_A: 98, // A -> 1
		BUTTON_B: 97 // B -> 2
	}
} as const

function reduceNeskeyMap(obj: Record<string, number>, player: number) {
	return Object.keys(obj).reduce((pre, key) => {
		const cur = obj[key]
		pre[cur] = [player, key]
		return pre
	}, {} as Record<number, [number, string]>)
}

const NeskeyMapHandle = {
	...reduceNeskeyMap(NeskeyMap[1], 1),
	...reduceNeskeyMap(NeskeyMap[2], 2)
}

let nes = new jsnes.NES({
	onFrame: function (framebuffer_24: number[]) {
		for (let i = 0; i < FRAMEBUFFER_SIZE; i++)
			framebuffer_u32[i] = 0xff000000 | framebuffer_24[i]
	},
	onAudioSample: function (l: number, r: number) {
		audio_samples_L[audio_write_cursor] = l
		audio_samples_R[audio_write_cursor] = r
		audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK
	},
	moyu: true
})

function onAnimationFrame() {
	if (status) {
		window.requestAnimationFrame(onAnimationFrame)

		image.data.set(framebuffer_u8)
		canvas_ctx.putImageData(image, 0, 0)
	}
}

function audio_remain() {
	return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function audio_callback(event: { outputBuffer: any }) {
	let dst = event.outputBuffer
	let len = dst.length
	if (!status) return
	// Attempt to avoid buffer underruns.
	if (audio_remain() < AUDIO_BUFFERING) nes.frame()

	let dst_l = dst.getChannelData(0)
	let dst_r = dst.getChannelData(1)
	for (let i = 0; i < len; i++) {
		let src_idx = (audio_read_cursor + i) & SAMPLE_MASK
		dst_l[i] = audio_samples_L[src_idx]
		dst_r[i] = audio_samples_R[src_idx]
	}

	audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK
}

function keyboard(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	callback: (arg0: number, arg1: any) => void,
	event: KeyboardEvent
) {
	if (event.keyCode in NeskeyMapHandle) {
		const cur = NeskeyMapHandle[event.keyCode]
		callback(cur[0], jsnes.Controller[cur[1]])
	}
}

export function init(
	canvas_id: string,
	width = SCREEN_WIDTH,
	height = SCREEN_HEIGHT
) {
	let canvas = document.getElementById(canvas_id) as HTMLCanvasElement
	canvas_ctx = canvas.getContext("2d")!
	image = canvas_ctx.getImageData(0, 0, width, height)

	let num = 0,
		numRut = true
	/**
	 * 待机状态
	 */
	const standby = () => {
		canvas_ctx.fillStyle = "black"
		canvas_ctx.fillRect(0, 0, width, height)
		canvas_ctx.fillStyle = "#ffffff" + addZero(numRut ? num++ : (num -= 2))

		if (num == 98) {
			numRut = false
		} else if (num == 20) {
			numRut = true
		}
		canvas_ctx.font = "14px Arial"
		canvas_ctx.textAlign = "center"
		canvas_ctx.textBaseline = "top"
		canvas_ctx.fillText("👈左侧选择游戏", width / 2, height / 2 - 10)
		if (!status) {
			window.requestAnimationFrame(standby)
		}
	}

	window.requestAnimationFrame(standby)
}

function beginGame(content: string) {
	window.requestAnimationFrame(onAnimationFrame)

	// Allocate framebuffer array.
	let buffer = new ArrayBuffer(image.data.length)
	framebuffer_u8 = new Uint8ClampedArray(buffer)
	framebuffer_u32 = new Uint32Array(buffer)

	// Setup audio.
	audio_ctx = new window.AudioContext()
	script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2)
	script_processor.onaudioprocess = audio_callback
	script_processor.connect(audio_ctx.destination)
	nes.loadROM(content)
}

export function destroyed() {
	audio_ctx && audio_ctx.close()
	script_processor && script_processor.disconnect()
	status = false
}

export function start(path: string) {
	destroyed()
	fetch(path)
		.then(res => res.arrayBuffer())
		.then(res => {
			status = true
			const decoder = new TextDecoder("x-user-defined")
			const text = decoder.decode(res)
			beginGame(text)
		})
}

document.addEventListener("keydown", event => {
	keyboard(nes.buttonDown, event)
})
document.addEventListener("keyup", event => {
	keyboard(nes.buttonUp, event)
})
