# A simple letter template for Pandoc

[![Build Status](https://travis-ci.org/aaronwolen/pandoc-letter.svg?branch=master)](https://travis-ci.org/aaronwolen/pandoc-letter)
[![Package-License](http://img.shields.io/badge/license-GPL--3-brightgreen.svg?style=flat)](http://www.gnu.org/licenses/gpl-3.0.html)

**Authors**: [Aaron Wolen][aaron] and [Andrew Dunning][andrew]

This template allows you to write letters in Markdown and convert them to nice looking PDFs using [Pandoc][] and [LaTeX][]. It accepts arguments used in the LaTeX letter class, including:

* opening
* closing
* address
* return-address
* postscript
* enclosures list
* carbon-copy list

All of which can be specified in a YAML metadata block. Additional [Pandoc/LaTex options][pandoc-latex-variables] can be configured directly in the metadata block. For example:

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

# ADDITIONAL ARGUMENTS
links-as-notes: true
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

`subject`
:   Subject of the letter.

`author`
:   Writer of the letter; can take a list for a multi-line signature.

`blockquote`
:   Changes style of block quotations to match [bootstrap][] (requires the [mdframed][] package).

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

`signature-width`
:   Specify width of signature image file.

## Running with Docker

This requires [Docker](https://www.docker.com/products/docker-desktop) to be installed. 

After cloning the repository build the container. `cd` to the cloned directory and run 

``` 
  docker build --tag=pandoc-letter .
```

This has to be executed only once per machine.

To create a letter run 

```
    docker run --volume <path_to_folder_with_letter.md>:/data pandoc-letter --template=template-letter.tex letter.md -o letter.pdf
```

Make sure you insert the full folder path where `letter.md` resides.

### Images, Attachments

To insert an image into the body of your letter:

```
![](lalune.jpg){ width=50% }
```

The curly brackets are optional.  This inserts the image into the
location of the command, above the signature.

The recommended way to attach images on a new page after the signature
is to compile a separate pdf file by other means than pandoc-letter,
and then attach the two pdf files with whatever utilities you are
familiar with.


## License

GPL-3 for pandoc-letter and the underlying [Pandoc template][latex-template].

[bootstrap]: http://getbootstrap.com/css/#type-blockquotes
[latex]: http://www.latex-project.org/
[latex-template]: https://github.com/jgm/pandoc-templates/blob/master/default.latex
[pandoc]: http://pandoc.org
[wallpaper]: https://www.ctan.org/pkg/wallpaper
[mdframed]: https://www.ctan.org/pkg/mdframed
[pandoc-latex-variables]: http://pandoc.org/MANUAL.html#variables-for-latex
[aaron]: http://aaronwolen.com
[andrew]: http://andrewdunning.ca
