import { createFromRoot } from "codama";
import { renderVisitor as renderJavaScriptVisitor } from "@codama/renderers-js";
import * as Bun from "bun";
import path from "node:path";
import { rootNodeFromAnchor } from "@codama/nodes-from-anchor";

const projects = [
  {
    name: "meteora-vp",
    idl: "./idl/meteora-vp.json",
  },
  {
    name: "dynamic-amm",
    idl: "./idl/dynamic-amm.json",
  },
  {
    name: "dynamic-vault",
    idl: "./idl/dynamic-vault.json",
  },
];

for (const project of projects) {
  const idlFile = Bun.file(project.idl);
  const idl = await idlFile.json();
  const codama = createFromRoot(rootNodeFromAnchor(idl));

  // Render JavaScript.
  const jsClient = `./sdk/${project.name}/js`;
  codama.accept(
    renderJavaScriptVisitor(path.join(jsClient, "src", "generated")),
  );
}
