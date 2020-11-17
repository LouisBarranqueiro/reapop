import {clone, isObject, Timer} from '../utils'

describe('Timer', () => {
    it('should init timer', (done) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let time = 0
        const spy = jest.fn()
        const timer = new Timer(40, spy)
        expect(timer.remainingTime).toEqual(40)

        // 1. start the timer
        timer.resume()

        // 2. stop the timer after 10ms
        setTimeout(() => {
            timer.pause()
            time = timer.remainingTime
        }, 10)

        // 3. check the time has stopped after 15ms
        setTimeout(() => {
            expect(timer.remainingTime).toEqual(time)
            // 4. restart timer
            timer.resume()

            setTimeout(() => {
                // 5. check that the callback has been called
                expect(spy).toHaveBeenNthCalledWith(1)
                done()
            }, time)
        }, 10)
    })
})

describe('clone()', () => {
    it('should clone object', () => {
        const objA = {
            a: [1, 3],
            d: '12',
            e: {f: '2'},
        }
        const clonedObj = clone(objA)

        expect(objA !== clonedObj).toBe(true)
        expect(objA.a !== clonedObj.a).toBe(true)
        expect(objA.e !== clonedObj.e).toBe(true)

        expect(objA).toEqual(clonedObj)
        expect(objA.a).toEqual(clonedObj.a)
        expect(objA.e).toEqual(clonedObj.e)
        expect(objA.d).toEqual(clonedObj.d)
    })
})

describe('isObject()', () => {
    it.each([
        [undefined, false],
        [null, false],
        ['', false],
        [1, false],
        [[], false],
        [{}, true],
    ])('should determine whether %s is an object', (value, expected) => {
        expect(isObject(value)).toEqual(expected)
    })
})
