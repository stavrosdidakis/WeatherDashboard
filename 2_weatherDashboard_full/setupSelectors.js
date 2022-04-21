//Function responsible for the settings of the selectors (city menus)
function setupSelectors(){
    citySelector1 = createSelect();
    citySelector1.position(10, 10);
    citySelector1.option('Select city');
    citySelector1.option('Shanghai');
    citySelector1.option('Athens');
    citySelector1.option('New York');
    citySelector1.option('London');
    citySelector1.option('Beijing');
    citySelector1.option('Los Angeles');
    citySelector1.option('Seoul');
    citySelector1.option('Berlin');
    citySelector1.option('Bangkok');
    citySelector1.option('Montreal');
    citySelector1.option('Buenos Aires');
    citySelector1.changed(citySelEvent1);

    citySelector2 = createSelect();
    citySelector2.position(width/3+10, 10);
    citySelector2.option('Select city');
    citySelector2.option('Shanghai');
    citySelector2.option('Athens');
    citySelector2.option('New York');
    citySelector2.option('London');
    citySelector2.option('Beijing');
    citySelector2.option('Los Angeles');
    citySelector2.option('Tokyo');
    citySelector2.option('Seoul');
    citySelector2.option('Berlin');
    citySelector2.option('Bangkok');
    citySelector2.option('Buenos Aires');
    citySelector2.changed(citySelEvent2);

    citySelector3 = createSelect();
    citySelector3.position((width-width/3)+10, 10);
    citySelector3.option('Select city');
    citySelector3.option('Shanghai');
    citySelector3.option('Athens');
    citySelector3.option('New York');
    citySelector3.option('London');
    citySelector3.option('Beijing');
    citySelector3.option('Los Angeles');
    citySelector3.option('Tokyo');
    citySelector3.option('Seoul');
    citySelector3.option('Berlin');
    citySelector3.option('Bangkok');
    citySelector3.option('Buenos Aires');
    citySelector3.changed(citySelEvent3);
  }
