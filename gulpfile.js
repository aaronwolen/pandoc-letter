var gulp = require('gulp');
var shell = require('gulp-shell');
var cache = require('gulp-cached');
var clean = require('gulp-clean');
var frontMatter = require('gulp-front-matter');


//invoke pandoc and build the pdfs
gulp.task('pdf', function() {
    return gulp.src('_input/*.md', {
            verbose: false
        })
        .pipe(frontMatter({
      property: 'frontMatter', // property added to file object 
      remove: false // should we remove front-matter header? 
    }))
        .pipe(shell([
            'mkdir -p _build',
            'pandoc --latex-engine=xelatex --template=' + __dirname + '/template/<%= f(file.frontMatter.template) %>.tex -o _build/<%= f(file.relative) %> _input/<%= file.relative %>'
        ], {
            templateData: {
                f: function(s) {
                    return ("" + s).split('.md').join('.pdf')
                }
            }
        }))
})

// compress and optimize the pdf files with ghostscript
gulp.task('compress', ['pdf'], function() {
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

gulp.task('clean', function() {
    return gulp.src('_build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch('_input/*.md', ['pdf']);
});

//build and exit
gulp.task('build', ['pdf', 'compress']);

//watch for changes
gulp.task('default', ['pdf', 'watch', 'compress']);
