import { Header } from './lib/Header';

type MkTarOptions = { stream?: boolean; gzip?: boolean };

export default function mktar(
  fileList: FileList,
  options?: { stream?: true; gzip?: false }
): ReadableStream<Uint8Array<ArrayBuffer>>;

export default function mktar(
  fileList: FileList,
  options?: { stream: false; gzip?: false }
): AsyncGenerator<Uint8Array<ArrayBuffer>>;

export default function mktar(
  fileList: FileList,
  options?: MkTarOptions
):
  | ReadableStream<Uint8Array<ArrayBuffer>>
  | AsyncGenerator<Uint8Array<ArrayBuffer>> {
  if (options?.stream || options?.gzip) {
    const readable = new ReadableStream<Uint8Array<ArrayBuffer>>({
      async pull(controller) {
        for await (const chunk of tarGenerator(fileList)) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    if (options?.gzip) {
      return readable.pipeThrough(new CompressionStream('gzip'));
    }

    return readable;
  }

  return tarGenerator(fileList);
}

async function* tarGenerator(fileList: FileList) {
  for (const file of fileList) {
    yield new Header({
      name: file.webkitRelativePath || file.name,
      mtime: file.lastModified,
      size: file.size,
    }).buffer;

    for await (const chunk of file.stream()) {
      yield chunk;
    }

    yield new Uint8Array((512 - (file.size % 512)) % 512);
  }

  yield new Uint8Array(1024);
}
