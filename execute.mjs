import * as io from './.methods/io.mjs';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//await delay(1000) /// waiting 1 second.	///only if async enable


main()

async function main() {
    let readme = './README.md'
        await delay(100)
        console.log('Reading directories')
        await delay(100)
        let list = io.getAllFromDir('../ContentArchive/')
        let filtered = list.filter(item => !(item.startsWith('.') || item.endsWith('.md') || item.endsWith('.mjs') || item.endsWith('.bat') || item.endsWith('.ini')));
    await delay(100)
    let plus = ''
        if (filtered.length > 1) {
            plus = 's'
        }
        console.log(filtered.length + ' Project' + plus + ' founded')
        io.rawWrite(readme, '# ContentArchive\n')
        io.rawAppend(readme, 'Archive for my public content creation\n')
        io.rawAppend(readme, '### Projects related :\n\n')
        await delay(100)
        filtered.forEach(projects => {//let modifiedString = originalString.replace(/ /g, "%20");
            io.rawAppend(readme, '[`' + projects + '`](https://github.com/DevDyna/ContentArchive/tree/main/'+projects.replace(/ /g, "%20")+')\n')
            console.log('+ '+projects)
        })

}
