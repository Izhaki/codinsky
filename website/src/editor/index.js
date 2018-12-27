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

// eslint-disable-next-line import/prefer-default-export
export const setCode = text => {
  editor.setValue(text);
  editor.clearSelection();
};
