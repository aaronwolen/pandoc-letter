# A simple letter template for Pandoc

This template allows you to write letters in Markdown and convert them to nice looking PDFs using [Pandoc][] and [LaTeX][]. It's basically just a copy of Pandoc's [default LaTeX template][latex-template], slightly modified to accept arguments used in the LaTeX letter class, including:

* opening
* closing
* address
* return-address

All of which can be specified in a YAML metadata block. For example:

	---
	author: Aaron
	opening: To whom it may concern,
	closing: Sincerely,
	address: 
	 - 123 Street Rd
	 - Chicago, IL
	return-address: 
	 - My Home
	 - 456 Road St.
	 - New York, NY
	...

Note that each address component should start with a hyphen. The provided example letter can be compiled with the following command:

```
pandoc --template=template-letter.tex -V blockquote example/letter.md -o example/letter.pdf
```

You can see the PDF output [here](https://github.com/aaronwolen/pandoc-letter/blob/master/example/letter.pdf).

## Extra features

`-V blockquote`
:   Nice looking blockquotes à la [bootstrap][]

`-V date=CUSTOMDATE`
:    Insert a custom date in place of today's date


[Pandoc]: http://johnmacfarlane.net/pandoc/
[LaTeX]: http://www.latex-project.org/
[latex-template]: https://github.com/jgm/pandoc-templates
[bootstrap]: http://getbootstrap.com/css/#type-blockquotes