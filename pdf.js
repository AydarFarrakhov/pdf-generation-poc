function highlightError(page, rect) {
  this.addAnnot({
    page: page,
    type: "Square",
    rect: rect,
    contents: "Needs Data",
    author: "Intelage",
    strokeColor: color.red
  });
}

var annotate = [];

for (var fieldNumber = 0; fieldNumber < numFields; fieldNumber++) {
  var field = getField(getNthFieldName(fieldNumber));
  field.value = field.value + '';
  if (field.value === "needs data") {
    annotate.push({ page: field.page, rect: field.rect});
  }
}

for (var annotateInd = 0; annotateInd < annotate.length ; annotateInd++) {
  var annotation = annotate[annotateInd];
  highlightError(annotation.page, annotation.rect);
}
