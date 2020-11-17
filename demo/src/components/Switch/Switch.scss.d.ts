declare namespace SwitchScssNamespace {
    export interface ISwitchScss {
        onoffswitch: string
        'onoffswitch-checkbox': string
        'onoffswitch-inner': string
        'onoffswitch-label': string
        'onoffswitch-switch': string
    }
}

declare const SwitchScssModule: SwitchScssNamespace.ISwitchScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: SwitchScssNamespace.ISwitchScss
}

export = SwitchScssModule
