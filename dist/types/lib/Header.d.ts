export interface Metadata {
    name: string;
    type?: 'directory' | 'file';
    data?: string | Uint8Array<ArrayBuffer>;
    mode?: number;
    uid?: number;
    gid?: number;
    size?: number;
    mtime?: number;
    linkname?: string;
    magic?: string;
    version?: string;
    uname?: string;
    gname?: string;
    devmajor?: number;
    devminor?: number;
    prefix?: string;
    padding?: string;
}
export declare class Header {
    #private;
    buffer: Uint8Array<ArrayBuffer>;
    positions: Position;
    name: string;
    data: Uint8Array<ArrayBuffer>;
    type: 'directory' | 'file';
    mode: number;
    uid: number;
    gid: number;
    size: number;
    mtime: number;
    typeflag: string;
    linkname: string;
    magic: string;
    version: string;
    uname: string;
    gname: string;
    devmajor: number;
    devminor: number;
    prefix: string;
    padding: string;
    checksum: number;
    constructor(metadata: Metadata);
}
type Position = {
    [Key in Field]: {
        bytes: Bytes[Key];
        startsAt: Positions[Key];
    };
};
interface Positions {
    name: 0;
    mode: 100;
    uid: 108;
    gid: 116;
    size: 124;
    mtime: 136;
    checksum: 148;
    typeflag: 156;
    linkname: 157;
    magic: 257;
    version: 263;
    uname: 265;
    gname: 297;
    devmajor: 329;
    devminor: 337;
    prefix: 345;
    padding: 500;
}
interface Bytes {
    name: 100;
    mode: 8;
    uid: 8;
    gid: 8;
    size: 12;
    mtime: 12;
    checksum: 8;
    typeflag: 1;
    linkname: 100;
    magic: 6;
    version: 2;
    uname: 32;
    gname: 2;
    devmajor: 8;
    devminor: 8;
    prefix: 155;
    padding: 12;
}
type Field = 'name' | 'mode' | 'uid' | 'gid' | 'size' | 'mtime' | 'checksum' | 'typeflag' | 'linkname' | 'magic' | 'version' | 'uname' | 'gname' | 'devmajor' | 'devminor' | 'prefix' | 'padding';
export {};
