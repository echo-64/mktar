# mktar

Generate a tar archive from a browser FileList, The module exposes an async generator that yields Uint8Array chunks and also provides a convenience ReadableStream

## Behavior & guarantees

- Designed for streaming from browser File objects
- Streams entries sequentially: minimal memory usage (no full-file buffering).
- Emits correct tar headers (padding to 512-byte blocks)
- Properly handles directories (writes header only).
- If gzip option enabled, output is GZIP-compressed stream.

## Usage

```js
import mktar from 'dist/mktar.es.js';

<head>
  <script src="dist/mktar.umd.js"></script>;
</head>;

document.querySelector('input').addEventListener('change', async e => {
  const list = e.target.files;

  if (list instanceof FileList) {
    // AsyncGenerator<Uint8Array<ArrayBuffer>>
    for await (const chunk of mktar(list)) {
      // push to a WritableStream, append to Blob parts, etc.
    }

    // ReadableStream<Uint8Array<ArrayBuffer>>
    const readable = mktar(list, { stream: true, gzip: true });
  }
});
```

## API Reference

### `mktar(fileList[, options])`

- `fileList` { FileList } FileList object.
- `options` { MkTarOptions } Optional configration object.
  - `stream` { boolean | undefined } stream option wraps tar bytes in ReadableStream
  - `gzip` { boolean | undefined } gzip option wraps tar bytes in GZIP stream
- Returns: { AsyncGenerator<Uint8Array<ArrayBuffer>> | ReadableStream<Uint8Array<ArrayBuffer>> }

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## License

[MIT License ©](./LICENSE)
