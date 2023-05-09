const o=[".xlog-header",".xlog-site-info",".xlog-user",".xlog-banner",".xlog-post-title",".xlog-post-meta",".xlog-post-summary","prose",".xlog-post-toc",".xlog-reactions",".xlog-comment"];class i{constructor(){this.theme="vs",this.loadEditor(()=>{this.attachWindowListeners(),this.initEditor(),this.injectSuggestion(),this.postMessage({type:"xlogMonacoIframeLoaded"})})}loadEditor(e){window.require.config({paths:{vs:browser.runtime.getURL("monaco-editor/iframe/node_modules/monaco-editor/min/vs")}}),window.require(["vs/editor/editor.main"],e)}initEditor(){const e=this.getContainer(),t=this.getEditorOptions();this.editor=window.monaco.editor.create(e,t),this.editor.onDidChangeModelContent(()=>{this.postMessage({css:this.editor.getValue(),type:"xlogMonacoIframeCssUpdated"})})}injectSuggestion(){const e=o.map(t=>({label:t,kind:window.monaco.languages.CompletionItemKind.Snippet,insertText:t,insertTextRules:window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet}));window.monaco.languages.registerCompletionItemProvider("css",{provideCompletionItems(){return{triggerCharacters:[".","#"],suggestions:e}}})}getContainer(){return document.getElementById("container")}getEditorOptions(){const e=this.getContainer(),t=Math.round(e.offsetWidth/8);return{value:"",tabSize:2,theme:this.theme,wordWrap:"bounded",wordWrapColumn:t,scrollBeyondLastLine:!1,language:"css",folding:!1,renderLineHighlight:"none",suggestOnTriggerCharacters:!1,cursorBlinking:"smooth",mouseWheelZoom:!1,lineNumbers:"off",minimap:{enabled:!1},hover:{enabled:!1},codeLens:!1}}postMessage(e){window.parent.postMessage(e,"*")}updateTheme(e){const t=e==="light"?"vs":"vs-dark";this.theme=t,window.monaco.editor.setTheme(t)}attachWindowListeners(){window.addEventListener("resize",()=>{this.editor.layout(),this.editor.updateOptions(this.getEditorOptions())}),window.addEventListener("message",e=>{e.data.type==="xlogCssInit"&&this.editor.setValue(e.data.css),e.data.type==="xlogThemeChange"&&this.updateTheme(e.data.theme)})}}new i;