It's hard to write easy understandable and readable documentation, so you can find file with examples of usage.
And your know, really full documentation at sources.

For what it is?
===
- $4 is collection of functions for DOM manipulation, that can be used if you don't want to use jQuery or something else.
- Cr() - library for creating parts of DOM instead of using innerHTML (and other methods to prevent concatenation html code at js).
- V() - my notes about how d3.js can be made.

Example:

```
this.co = {}; // collect references on DOM nodes
iframe.contentDocument.body.appendChild(Cr.fr(
 	Cr('div', 'cp_bubble').alias('bubble', this.co).add(
 		Cr('div', 'cp_close').alias('close', this.co).prop('onclick', function(){
 			this.close();
 		}.bind(this)),
		Cr('h1', 'cp_title', chrome.i18n.getMessage('ctx_please_wait')).alias('title', this.co),
 		Cr('div').alias('wrap', this.co).prop('className', 'cp_wrap').add(
 			Cr('table', 'cp_table').add(
 				Cr('tbody', 'cp_content').alias('content', this.co)
 			)
 		),
 		Cr('i', 'cp_logo').alias('logo', this.co)
 	),
 	Cr('span', 'cp_arrow').alias('arrow', this.co),
 	Cr('span', 'cp_arrow-inner').alias('arrowInner', this.co)
));
```