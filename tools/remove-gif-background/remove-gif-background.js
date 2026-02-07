const input = document.getElementById("fileInput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    decodeGIF(reader.result);
  };

  reader.readAsArrayBuffer(file);
});

function decodeGIF(arrayBuffer) {
  // ✅ THESE come from gifuct-js
  const gif = parseGIF(arrayBuffer);
  const frames = decompressFrames(gif, true);

  console.log("Frames:", frames);

  // Draw first frame as test
  const frame = frames[0];

  canvas.width = frame.dims.width;
  canvas.height = frame.dims.height;

  const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);

  imageData.data.set(frame.patch);
  ctx.putImageData(imageData, 0, 0);
}
