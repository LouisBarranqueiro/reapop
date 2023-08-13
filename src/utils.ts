type TimeoutId = ReturnType<typeof setTimeout>

export class Timer {
    private timerId: TimeoutId | undefined
    private start: Date | undefined
    private callback: (...args: unknown[]) => unknown
    remainingTime: number

    constructor(delay: number, callback: (...args: unknown[]) => unknown) {
        this.remainingTime = delay
        this.callback = callback
    }

    pause() {
        clearTimeout(<TimeoutId>this.timerId)
        this.remainingTime -= new Date().getTime() - (<Date>this.start).getTime()
    }

    resume() {
        this.start = new Date()
        clearTimeout(<TimeoutId>this.timerId)
        this.timerId = setTimeout(this.callback, this.remainingTime) as unknown as TimeoutId
    }
}

export const clone = <T>(origObject: T): T => {
    if (typeof origObject !== 'object' || origObject === null) {
        return origObject
    }

    if (Array.isArray(origObject)) {
        return origObject.map((value) => clone(value)) as unknown as T
    }

    const newObject: Record<string, unknown> = {}
    for (const key in origObject) {
        newObject[key] = clone(origObject[key])
    }

    return newObject as T
}

export const isObject = (value: unknown) =>
    !!value && (value as string | number | Record<string, unknown>).constructor === Object

export const noop = () => {
    // noop
}
