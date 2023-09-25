declare module "@doctor_internet/interenv" {
    class env {
        constructor(envPath: object | boolean | string, literal: boolean = false)
        has(key: string): boolean
        raw(key: string): any
        int(key: string, radix: number = 0): ?number
        float(key: string): ?number
        list(key: string, sep: string = ","): string[]
        prefixed(key: string): env
    }

    export = env
}
