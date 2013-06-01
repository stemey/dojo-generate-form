define([ 
"dojo/_base/lang","./createStandardEditorFactory"],function(lang,createStandardEditorFactory) {
// module:
//		gform/registerStandardEditorFactory
// description:
//		register the global EditorFactory gform.ef.standard
			lang.setObject("gform.ef.standard",createStandardEditorFactory());
			return gform.ef.standard;
});
