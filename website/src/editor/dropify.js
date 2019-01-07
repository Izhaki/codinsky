const terminateEvent = evt => {
  evt.stopPropagation();
  evt.preventDefault();
};

const fileReadingSupported = window.FileReader !== undefined;

const isFilesDrag = event => {
  const { types } = event.dataTransfer;
  return types && types.includes('Files');
};

const readFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    try {
      reader.readAsText(file);
    } catch (error) {
      reject(error);
    }
  });

const onDragOver = event => {
  if (isFilesDrag(event)) {
    terminateEvent(event);
    event.dataTransfer.dropEffect = 'copy';
  }
};

const onDrop = editor => async evt => {
  terminateEvent(evt);
  const file = evt.dataTransfer.files[0];
  const code = await readFile(file);
  editor.setValue(code);
  editor.clearSelection();
};

export default editor => {
  if (!fileReadingSupported) return;

  const { container } = editor;

  container.addEventListener('dragover', onDragOver, false);
  container.addEventListener('drop', onDrop(editor), false);
};
