import take from './Take';
// @ts-ignore
import path from '@chainner/node-path';

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
};

export class Header {
  public buffer: Uint8Array<ArrayBuffer>;
  public positions: Position;
  public name: string;
  public data: Uint8Array<ArrayBuffer>;
  public type: 'directory' | 'file';
  public mode: number;
  public uid: number;
  public gid: number;
  public size: number;
  public mtime: number;
  public typeflag: string;
  public linkname: string;
  public magic: string;
  public version: string;
  public uname: string;
  public gname: string;
  public devmajor: number;
  public devminor: number;
  public prefix: string;
  public padding: string;
  public checksum: number;

  constructor(metadata: Metadata) {
    this.buffer = new Uint8Array(512);

    this.positions = {
      name: { startsAt: 0, bytes: 100 },
      mode: { startsAt: 100, bytes: 8 },
      uid: { startsAt: 108, bytes: 8 },
      gid: { startsAt: 116, bytes: 8 },
      size: { startsAt: 124, bytes: 12 },
      mtime: { startsAt: 136, bytes: 12 },
      checksum: { startsAt: 148, bytes: 8 },
      typeflag: { startsAt: 156, bytes: 1 },
      linkname: { startsAt: 157, bytes: 100 },
      magic: { startsAt: 257, bytes: 6 },
      version: { startsAt: 263, bytes: 2 },
      uname: { startsAt: 265, bytes: 32 },
      gname: { startsAt: 297, bytes: 2 },
      devmajor: { startsAt: 329, bytes: 8 },
      devminor: { startsAt: 337, bytes: 8 },
      prefix: { startsAt: 345, bytes: 155 },
      padding: { startsAt: 500, bytes: 12 },
    };

    !metadata?.name && this.#error(
      "Can't process, plesae provide the header name"
    );

    const { base, dir } = path.parse(metadata.name);

    this.name = base;
    this.type = metadata.type ||= metadata.name.endsWith('/') ? 'directory' : 'file';
    this.mode = metadata.mode ||= this.type == 'directory' ? 0o755 : 0o644;
    this.uid = metadata.uid ||= 0;
    this.gid = metadata.gid ||= 0;
    this.mtime = metadata.mtime ||= Math.floor(Date.now() / 1000);
    this.typeflag = this.type === 'directory' ? '5' : '0';
    this.linkname = metadata.linkname ||= '';
    this.magic = metadata.magic ||= 'ustar';
    this.version = metadata.version ||= '00';
    this.uname = metadata.uname ||= '';
    this.gname = metadata.gname ||= '';
    this.devmajor = metadata.devmajor ||= 0;
    this.devminor = metadata.devminor ||= 0;
    this.prefix = dir || '';
    this.padding = metadata.padding ||= '';
    this.checksum = 0;

    if (this.type === 'directory') {
      this.data = new Uint8Array(0);
      this.size = 0;
    } else {
      this.data =
        metadata.data instanceof Uint8Array
          ? metadata.data
          : typeof metadata.data === 'string'
          ? take(metadata.data).encode('\0')
          : take('').encode('\0');

      this.size =
        this.data.byteLength > 0
          ? this.data.byteLength
          : typeof metadata.size === "number"
          ? metadata.size
          : 0;

      if (this.data.byteLength > 0 && typeof metadata.size === "number") {
        console.warn(
          'header size gets calculated automatically when data is present'
        );
      }
    }

    this.#writeField('name', 'string');
    this.#writeField('mode', 'numric');
    this.#writeField('uid', 'numric');
    this.#writeField('gid', 'numric');
    this.#writeField('size', 'numric');
    this.#writeField('mtime', 'numric');
    this.#writeField('typeflag', 'string');
    this.buffer[this.positions.typeflag.startsAt] =
      take(this.typeflag).encode('\0')[0]!;
    this.#writeField('linkname', 'string');
    this.#writeField('magic', 'string');
    this.#writeField('version', 'string');
    this.#writeField('uname', 'string');
    this.#writeField('gname', 'string');
    this.#writeField('devmajor', 'numric');
    this.#writeField('devminor', 'numric');
    this.#writeField('prefix', 'string');
    this.#writeField('padding', 'string');

    const space: number = take(' ').encode('\0')[0]!;

    for (let i = 0; i < this.buffer.length; i++) {
      if (
        i >= this.positions.checksum.startsAt &&
        i < this.positions.checksum.startsAt + this.positions.checksum.bytes
      ) {
        this.checksum += space;
      } else {
        this.checksum += this.buffer[i]!;
      }
    }

    this.#writeField('checksum', 'numric');

    return this;
  }

  #writeField(key: Field, type: 'string' | 'numric'): void {
    const field = this.positions[key];

    switch (type) {
      case 'string': {
        this.#writeBuffer(
          take(this[key]).encode('\0'),
          field.bytes,
          field.startsAt
        );
        break;
      }
      case 'numric': {
        this.#writeBuffer(
          take(this[key]).octal().pad(field.bytes).encode('\0'),
          field.bytes,
          field.startsAt
        );
        break
      }
      default: {
        this.#error(`Unknown field type: ${type}`);
      }
    }
  }

  #writeBuffer(buffer: Uint8Array<ArrayBuffer>, bytes: number, begin: number): void {
    const end: number = Math.min(buffer.length, bytes - 1);

    this.buffer.set(buffer.subarray(0, end), begin);

    if (end < buffer.length) {
      this.buffer[begin + end] = 0;
    }
  }

  #error(msg: string): void {
    throw new Error(msg);
  }
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
};

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
};

type Field =
  | 'name'
  | 'mode'
  | 'uid'
  | 'gid'
  | 'size'
  | 'mtime'
  | 'checksum'
  | 'typeflag'
  | 'linkname'
  | 'magic'
  | 'version'
  | 'uname'
  | 'gname'
  | 'devmajor'
  | 'devminor'
  | 'prefix'
  | 'padding';
