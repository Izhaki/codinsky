const { ace } = window;

const editor = ace.edit('editor');
editor.setTheme('ace/theme/solarized_light');
editor.session.setMode('ace/mode/javascript');
editor.setShowFoldWidgets(false);
editor.renderer.setDisplayIndentGuides(false);
editor.setHighlightActiveLine(false);
editor.setHighlightSelectedWord(false);
editor.setShowPrintMargin(false);
editor.getSession().setUseWorker(false);

export default ({ code, onChange }) => {
  if (onChange) {
    editor.on('change', () => {
      onChange(editor.getValue());
    });
  }
  editor.setValue(code);
  editor.clearSelection();
};

export const setSelection = ({ start, end }) => {
  editor.selection.setSelectionRange(
    new ace.Range(start.line - 1, start.column, end.line - 1, end.column),
  );
};
