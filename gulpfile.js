var gulp = require('gulp');
var shell = require('gulp-shell');
var cache = require('gulp-cached');
var clean = require('gulp-clean');

//invoke pandoc and build the pdfs
gulp.task('build-pdf', function() {
    return gulp.src('_input/*.md', {
            verbose: false
        })
        .pipe(shell([
            'mkdir -p _build',
            'pandoc --latex-engine=xelatex --template=' + __dirname + '/template/letter.tex -o _build/<%= f(file.relative) %> _input/<%= file.relative %>'
        ], {
            templateData: {
                f: function(s) {
                    return ("" + s).split('.md').join('.pdf')
                }
            }
        }))
})

// compress and optimize the pdf files with ghostscript
gulp.task('compress', ['build-pdf'], function() {
    return gulp.src('_build/*.pdf')
        .pipe(shell([
            'gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dDownsampleColorImages=true -dColorImageResolution=150 -dNOPAUSE  -dBATCH -sOutputFile=_build/<%= f(file.relative) %> _build/<%= file.relative %>',
            'rm _build/<%= file.relative %>',
            'mv _build/<%= f(file.relative) %> _build/<%= file.relative %>'
        ], {
            templateData: {
                f: function(s) {
                    return ("" + s).split('.pdf').join('.tmp')
                }
            },
            verbose: false,
            quiet: true
        }))
})

gulp.task('clean', function () {
    return gulp.src('_build', {read: false})
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('_input/*.md', ['build-pdf']);
});

//build and exit
gulp.task('build', ['build-pdf','compress']);

//watch for changes
gulp.task('default', ['build-pdf', 'watch', 'compress']);
