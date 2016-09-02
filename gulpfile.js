var gulp = require('gulp');
var shell = require('gulp-shell');
var cache = require('gulp-cached');
var clean = require('gulp-clean');
var frontMatter = require('gulp-front-matter');
var changed = require('gulp-changed');
var print = require('gulp-print');


// invoke pandoc and build the pdfs
gulp.task('pdf', function() {
    return gulp.src('_input/*.md', {
            verbose: false
            })
        .pipe(changed('_build', {extension: '.pdf'})) //only changed pdf files
        .pipe(print())
        .pipe(frontMatter({
      property: 'frontMatter', // property added to file object 
      remove: false // should we remove front-matter header? 
    }))
        .pipe(shell([
            'mkdir -p _build',
            'pandoc --latex-engine=xelatex --template=' + __dirname + '/template/<%= file.frontMatter.template %>.tex -o _build/<%= file.relative.replace(".md", ".pdf") %> _input/<%= file.relative %>'
        ]))
})

// compress and optimize the pdf files with ghostscript
gulp.task('compress', ['pdf'], function() {
    return gulp.src('_build/*.pdf')
        .pipe(changed('_build/*.pdf')) //only changed pdf files
        .pipe(print())
        .pipe(shell([
            //optimize pdf and improve compatibility. check http://www.tjansson.dk/2012/04/compressing-pdfs-using-ghostscript-under-linux/
            'gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dColorImageResolution=150 -dNOPAUSE -dPDFSETTINGS=/printer -dQUIET -dBATCH -sOutputFile=_build/<%= file.relative.replace(".pdf",".tmp") %> _build/<%= file.relative %>',
            //remove old .pdf and rename .tmp to .pdf
            'rm _build/<%= file.relative %>',
            'mv _build/<%= file.relative.replace(".pdf",".tmp") %> _build/<%= file.relative %>'
        ], {
            verbose: false,
            quiet: true
        }))
})

// delete _input directory
gulp.task('clean', function() {
    return gulp.src('_build', {
            read: false
        })
        .pipe(clean());
});


// build and exit
gulp.task('build', ['pdf', 'compress']);

// watch markdown for changes 
gulp.task('watch', function() {
    gulp.watch('_input/*.md', ['build']);
});

// watch for changes
gulp.task('default', ['pdf', 'watch', 'compress']);
