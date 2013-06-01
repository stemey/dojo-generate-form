define([ 
"dojo/_base/lang","./createLayoutEditorFactory"],function(lang,createLayoutEditorFactory) {
// module:
//		gform/registerLayoutEditorFactory

// ef:
//		register the global EditorFactory gform.ef.standard
			var ef = createLayoutEditorFactory();
			lang.setObject("gform.ef.layout",ef);
			return gform.ef.layout;
});
