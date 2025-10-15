class Take {
  #argument: string | number | Uint8Array;

  constructor(argument: string | number) {
    this.#argument = argument;
  }

  encode(): Take;
  encode(eof: '\0'): Uint8Array<ArrayBuffer>;
  encode(eof?: undefined | '\0'): Take | Uint8Array<ArrayBuffer> {
    const action = new TextEncoder().encode(this.#argument as string);
    return eof == '\0' ? action : ((this.#argument = action), this);
  }

  octal(): Take;
  octal(eof: '\0'): string;
  octal(eof?: undefined | '\0'): Take | string {
    const action = Number.prototype.toString.call(this.#argument as number, 8);
    return eof == '\0' ? action : ((this.#argument = action), this);
  }

  pad(maxLength: number): Take;
  pad(maxLength: number, eof: '\0'): string;
  pad(maxLength: number, eof?: undefined | '\0'): Take | string {
    const action =
      String.prototype.padStart.call(this.#argument, maxLength - 1, '0') + '\0';

    return eof == '\0' ? action : ((this.#argument = action), this);
  }
}

export default function take(arg: string | number) {
  return new Take(arg);
}
