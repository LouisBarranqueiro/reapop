import React from 'react'

Object.defineProperty(window, 'resizeTo', {
    value: function resizeTo(width: number, height: number) {
        Object.assign(this, {
            innerWidth: width,
            innerHeight: height,
            outerWidth: width,
            outerHeight: height,
        }).dispatchEvent(new this.Event('resize'))
    },
})
