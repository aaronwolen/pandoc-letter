# A simple letter template for Pandoc

[![Build Status](https://travis-ci.org/aaronwolen/pandoc-letter.svg?branch=master)](https://travis-ci.org/aaronwolen/pandoc-letter)

This template allows you to write letters in Markdown and convert them to nice looking PDFs using [Pandoc][] and [LaTeX][]. It's basically just a copy of Pandoc's [default LaTeX template][latex-template], slightly modified to accept arguments used in the LaTeX letter class, including:

* opening
* closing
* address
* return-address
* postscript
* enclosures list
* carbon-copy list

All of which can be specified in a YAML metadata block. For example:

```yaml
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
```

Note that each address component should start with a hyphen. The provided example letter can be compiled with the following command:

```shell
pandoc --template=template-letter.tex example/letter.md -o example/letter.pdf
```

You can see the PDF output [here](https://github.com/aaronwolen/pandoc-letter/blob/master/example/letter.pdf).

## Features

The following can be set either as variables when executing `pandoc` or added to the YAML metadata.

`address`
:   Name and address of the recipient; takes a list for a multi-line address.

`author`
:   Writer of the letter; can take a list for a multi-line signature.

`blockquote`
:   Changes style of block quotations to match [bootstrap][].

`cc`
:   Recipients to be carbon-copied; can take a list for multiple recipients.

`closing`
:   Text for the complementary close.

`closing-indentation`
:   Amount for closing signature block to be intended from left margin.

`date`
:   Custom date (current date will be automatically inserted if not specified).

`encl`
:   List of enclosures.

`letterhead`
:   Image file to be used as letterhead (requires the [wallpaper][] package), applied only to the first page.

`opening`
:   Text for the salutation.

`ps`
:   Text to be added at the end of the letter as a postscript.

`return-address`
:   Address of the sender: takes a list to allow a multi-line address.

`signature`
:   Image file for a signature.

`signature-before`, `signature-after`
:   Allows adjustment of vertical space surrounding signature.

## License for `pandoc-templates`

Copyright (c) 2014, John MacFarlane

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

* Neither the name of John MacFarlane nor the names of other contributors may be used to endorse or promote products derived from this software without specific prior written permission.


THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[bootstrap]: http://getbootstrap.com/css/#type-blockquotes
[latex]: http://www.latex-project.org/
[latex-template]: https://github.com/jgm/pandoc-templates/blob/master/default.latex
[pandoc]: http://pandoc.org
[wallpaper]: https://www.ctan.org/pkg/wallpaper
