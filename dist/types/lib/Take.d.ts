declare class Take {
    #private;
    constructor(argument: string | number);
    encode(): Take;
    encode(eof: '\0'): Uint8Array<ArrayBuffer>;
    octal(): Take;
    octal(eof: '\0'): string;
    pad(maxLength: number): Take;
    pad(maxLength: number, eof: '\0'): string;
}
export default function take(arg: string | number): Take;
export {};
