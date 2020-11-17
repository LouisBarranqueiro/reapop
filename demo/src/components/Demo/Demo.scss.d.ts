declare namespace DemoScssNamespace {
    export interface IDemoScss {
        background: string
        description: string
        logo: string
        'logo-container': string
        sidebar: string
    }
}

declare const DemoScssModule: DemoScssNamespace.IDemoScss & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DemoScssNamespace.IDemoScss
}

export = DemoScssModule
