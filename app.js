function regenerate() {
  var maxNumber = $('#maxnumber').val();
  var problemCount = $('#problemcount').val();

  $('.problems').empty();
  var compiled = _.template('<section class="problem">' +
                            '<div class="topnumber number">' +
                            '<%- topNumber %></div>' +
                            '<div class="sign">+</div>' +
                            '<div class="bottomnumber number">' +
                            '<%- bottomNumber %></div>' +
                            '</section>');
  var seen = [];
  var topNumber, bottomNumber;
  var duped, tries;
  var zeroCount = 0, oneCount = 0;
  
  for (var index = 0; index < problemCount; index++) {
    duped = true;
    tries = 0;
    while (duped != null && tries < 10) {
      topNumber = _.random(0, maxNumber);
      bottomNumber = _.random(0, maxNumber - topNumber);
      // Dupe check - don't want to duplicate problems
      duped = _.result(_.find(seen, [topNumber, bottomNumber]), null);
      // Limit the number of problems that involve 0 or 1
      if (topNumber === 0 || bottomNumber === 0) {
        zeroCount++;
        if (zeroCount >= 3) {
          duped = true;
        }
      }
      if (topNumber === 1 || bottomNumber === 1) {
        oneCount++;
        if (oneCount >= 3) {
          duped = true;
        }
      }
      tries++;
    }
    seen.push([topNumber, bottomNumber]); 
    var compiledHTML = compiled({ 'topNumber': topNumber, 'bottomNumber': bottomNumber});
    $('.problems').append(compiledHTML);
  }
};

$( document ).ready(function() {
  regenerate();
});
