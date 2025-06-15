type UserAnswers = {
  meatMealsPerWeek: number;
  dairyMealsPerWeek: number;
  localVegMealsPerWeek: number;
  importedVegMealsPerWeek: number;

  carKmPerWeek: number;
  carIsElectric: boolean;
  publicTransportKmPerWeek: number;
  bicycleKmPerWeek: number;
  flightHoursPerYear: number;

  electricityKWhPerMonth: number;
  gasM3PerMonth: number;
  solarPanels: boolean;
  housingSize: number;
  numberOfPeopleInHouse: number;

  clothesPerMonth: number;
  electronicsPerYear: number;
  shoppingScore: number;

  recycles: boolean;
  composts: boolean;
  reusesItems: boolean;

  waterLitersPerDay: number;

  streamingHoursPerWeek: number;
  cloudStorageGB: number;
};

export type FootprintResult = {
  co2KgPerYear: number;
  gha: number;
  planets: number;
  breakdownByCategory: {
    "Еда": number,
    "Транспорт": number,
    "Энергия и жилье": number,
    "Потребление": number,
    "Цифровое поведение": number,
  };
};

export function calculateFootprint(data: UserAnswers): FootprintResult {
  const co2 = {

    meat: data.meatMealsPerWeek * 52 * 5.4,
    dairy: data.dairyMealsPerWeek * 52 * 2.0,
    localVeg: data.localVegMealsPerWeek * 52 * 0.4,
    importedVeg: data.importedVegMealsPerWeek * 52 * 1.2,

    car: data.carKmPerWeek * 52 * (data.carIsElectric ? 0.05 : 0.19),
    publicTransport: data.publicTransportKmPerWeek * 52 * 0.1,
    bike: 0, 
    flight: data.flightHoursPerYear * 90,

    electricity: data.electricityKWhPerMonth * 12 * (data.solarPanels ? 0.1 : 0.4),
    
    gas: data.gasM3PerMonth * 12 * 2.0,

    housing: (data.housingSize * 10) / data.numberOfPeopleInHouse,

    clothes: data.clothesPerMonth * 12 * 30,
    electronics: data.electronicsPerYear * 200, 
    streaming: data.streamingHoursPerWeek * 52 * 0.05, 
    cloud: data.cloudStorageGB * 0.002 * 365
  };

  const totalCO2 = Object.values(co2).reduce((sum, v) => sum + v, 0);
  console.log(data.solarPanels)


  let gha = 0;
  gha += (data.meatMealsPerWeek / 7) * 0.6;
  gha += (data.dairyMealsPerWeek / 7) * 0.3;
  gha += (data.importedVegMealsPerWeek / 7) * 0.2;
  gha += (data.carKmPerWeek / 100) * 0.3;
  gha += (data.publicTransportKmPerWeek / 100) * 0.1;
  gha += (data.flightHoursPerYear / 10) * 0.3;
  gha += (data.electricityKWhPerMonth / 100) * (data.solarPanels ? 0.05 : 0.15);
  gha += (data.gasM3PerMonth / 100) * 0.2;
  gha += (data.housingSize / 50) * 0.1;
  gha += data.shoppingScore * 0.3;
  gha += data.clothesPerMonth * 0.05;
  gha += data.electronicsPerYear * 0.3;
  gha += data.waterLitersPerDay / 100 * 0.1;

  if (!data.recycles) gha += 0.2;
  if (!data.composts) gha += 0.1;
  if (!data.reusesItems) gha += 0.1;

  const planets = gha / 1.6;

  return {
    co2KgPerYear: Math.round(totalCO2),
    gha: parseFloat(gha.toFixed(2)),
    planets: parseFloat(planets.toFixed(2)),
    breakdownByCategory: {
    "Еда": Math.round(co2.meat + co2.dairy + co2.localVeg + co2.importedVeg),
    "Транспорт": Math.round(co2.car + co2.publicTransport + co2.flight),
    "Энергия и жилье": Math.round(co2.electricity + co2.gas + co2.housing),
    "Потребление": Math.round(co2.clothes + co2.electronics),
    "Цифровое поведение": Math.round(co2.streaming + co2.cloud),
  },
  };
}
