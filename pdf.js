function highlighError(page, quads) {
  this.addAnnot({
    page: page,
    type: "Underline",
    quads: quads,
    contents: "Needs Data",
    author: "Intelage",
    strokeColor: color.red
  });
}

for (var p = 0; p < this.numPages; p++) {
  for (var n = 0; n < this.getPageNumWords(p) - 1; n++) {
    var first = this.getPageNthWord(p, n);
    var second = this.getPageNthWord(p, n + 1);
    if (first === "needs" && second === "data") {
      var quadsNeeds = this.getPageNthWordQuads(p, n);
      var quadsData = this.getPageNthWordQuads(p, n + 1);
      highlighError(p, quadsNeeds);
      highlighError(p, quadsData);
    }
  }
}
