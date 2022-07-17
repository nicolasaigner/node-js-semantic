// =========================================================
// gulpfile.js
// =========================================================
const gulp = require('gulp');
const gitRev = require('git-rev-sync');
const git = require('gulp-git');
const exec = require('child_process').exec;


let versionPackage = require('./package.json').version;
let versionGit = null;

// Gulp Testing Message
gulp.task('message', async () => {
    console.log('It works!!');
});

// Gulp get version in package.json
gulp.task('version', async () => {
    console.log(`My Version in package.json is: ${versionPackage}`);
});

// Gulp get version in git repository
gulp.task('git-version', async () => {
    versionGit = gitRev.tag();
    console.log(`My Version in repository is: ${versionGit}`);
});

// Gulp exec git fetch --tags
gulp.task('git-fetch', async () => {
    return new Promise(async (resolve, reject) => {
        await git.fetch('', '', {args: '--all'}, (err) => {
            if (err) {
                console.log('ERROR git fetch', err);
                reject(err);
            } else {
                console.log('Git Fetch OK');
                resolve();
            }
        });
    });

});

// Gulp compare version and git-version and show result
gulp.task('compare', async () => {

    if (versionPackage === versionGit) {
        console.log('Versions are equal');
    } else {
        console.log('Versions are not equal');
    }
});

gulp.task('clean-tags-locally', async () => {
    // delete all git tags locally

    // git tag -l | xargs git tag -d

    await exec('git tag -l | xargs git tag -d', (err, stdout, stderr) => {
        if (err) {
            console.log('Error clean tags locally', err, stderr);
            return;
        }
        console.log('Clean tags locally', stdout);
    });
});

// Default task
gulp.task('default', gulp.series('message', ['git-fetch'], ['version', 'git-version'], ['git-version']));