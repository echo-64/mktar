export default function mktar(fileList: FileList, options?: {
    stream?: true;
    gzip?: false;
}): ReadableStream<Uint8Array<ArrayBuffer>>;
export default function mktar(fileList: FileList, options?: {
    stream: false;
    gzip?: false;
}): AsyncGenerator<Uint8Array<ArrayBuffer>>;
