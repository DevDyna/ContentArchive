import * as io from "./.methods/io.mjs";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//await delay(1000) /// waiting 1 second.	///only if async enable

main();

async function main() {
  let readme = "./README.md";
  await delay(100);
  console.log("Reading directories");
  await delay(100);
  let list = io.getAllFromDir("../ContentArchive/");

  let ContentFilter = (item) =>
    !(
      item.startsWith(".") ||
      item.endsWith(".md") ||
      item.endsWith(".mjs") ||
      item.endsWith(".bat") ||
      item.endsWith(".ini") ||
      item.endsWith(".png") ||
      item.endsWith(".gif")
    );
  let filtered = list.filter(
    (item) =>
      !(
        item.startsWith(".") ||
        item.endsWith(".md") ||
        item.endsWith(".mjs") ||
        item.endsWith(".bat") ||
        item.endsWith(".ini")
      )
  );
  await delay(100);
  let plus = "";
  if (filtered.length > 1) {
    plus = "s";
  }
  console.log(filtered.length + " Project" + plus + " founded");
  io.rawWrite(readme, "# ContentArchive\n");
  io.rawAppend(readme, "Archive for my public content creation\n");
  io.rawAppend(readme, "### Projects related :\n\n");
  await delay(100);
  filtered.forEach((projects) => {
    io.rawAppend(readme, "<details>\n");
    io.rawAppend(
      readme,
      "<summary><strong>" + projects + "</strong></summary>\n\n"
    );

    let subdir = io.getAllFromDir("../ContentArchive/" + projects + "/");
    if (subdir != []) {
      subdir.forEach((d) => {
        if (io.isFile("../ContentArchive/" + projects + "/"+d)) {
          io.rawAppend(
            readme,
            " - [" +
              d +
              "](https://github.com/DevDyna/ContentArchive/tree/main/" +
              projects.replace(/ /g, "%20") +
              "/" +
              d.replace(/ /g, "%20") +
              ")\n"
          );
        } else {
          let underdir = io.getAllFromDir(
            "../ContentArchive/" + projects + "/" + d + "/"
          );
          if (underdir != []) {
            io.rawAppend(readme, "   <details>\n");
            io.rawAppend(
                readme,
                "   <summary><strong>" + d + "</strong></summary>\n\n"
              );
            underdir.forEach((e) => {

                

              io.rawAppend(
                readme,
                "    - [" +
                  e +
                  "](https://github.com/DevDyna/ContentArchive/tree/main/" +
                  projects.replace(/ /g, "%20") +
                  "/" +
                  d.replace(/ /g, "%20") +
                  "/" +
                  e.replace(/ /g, "%20") +
                  ")\n\n"
              );
            });

            io.rawAppend(readme, "    </details>\n\n");
          }
        }
      });
    } else {
      io.rawAppend(readme, " \n");
    }

    io.rawAppend(readme, "</details>\n\n");
  });

  /*

<details>
   <summary><strong>Contributors (Traslations)</strong></summary>
</details>

*/
}
