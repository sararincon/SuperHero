(function ($) {
  $(".classForm").on("submit", function (e) {
    e.preventDefault();
    const superHero = parseInt($(".searchClass").val());
    // console.log(superHero);

    if (isNaN(superHero)) {
      return alert("Ingresa solo un número");
    }
    if (superHero < 1 || superHero > 731) {
      return alert("Ingresa un número del 1 al 731");
    }
    API(superHero);
    // $(".superHeroCard").html(cardHtml);
    // pieChart(hero);
    // $("#chartContainer").CanvasJSChart(options);
  });
})(jQuery);

function API(id) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: `https://superheroapi.com/api.php/106629905149807/${id}`,
    success: function (hero) {
      const cardHtml = ` <div class="card mb-3" style="max-width: 540px">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${
            hero.image.url
          }" class="img-fluid rounded-start" alt="SuperHero ${hero.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Nombre del SuperHero: ${hero.name}</h5>
            <p class="card-text">Conexiones:${
              hero.connections["group-affiliation"]
            }</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Publicado por: ${
                hero.biography.publisher
              }</li>
              <li class="list-group-item">Ocupación: ${
                hero.work.occupation
              }</li>
              <li class="list-group-item">Primera Aparición: ${
                hero.biography["first-appearance"]
              }</li>
              <li class="list-group-item">Altura: ${hero.appearance.height}</li>
              <li class="list-group-item">Peso: ${hero.appearance.weight}</li>
              <li class="list-group-item">Alianzas: ${hero.biography.aliases.join(
                " , "
              )}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
      $(".superHeroCard").html(cardHtml);
      pieChart(hero);
      // $("#chartContainer").CanvasJSChart(options);
      // console.log(dataAPI);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function pieChart(hero) {
  const powerStats = Object.keys(hero.powerstats).map((power) => ({
    label: power,
    y: parseInt(hero.powerstats[power]),
  }));

  const options = {
    title: {
      text: `Estadisticas de poder para ${hero.name}`,
    },
    data: [
      {
        type: "pie",
        startAngle: 45,
        showInLegend: "true",
        legendText: "{label}",
        indexLabel: "{label} ({y})",
        yValueFormatString: "#,##0.#" % "",
        dataPoints: powerStats,
      },
    ],
  };
  $("#chartContainer").CanvasJSChart(options);
}
