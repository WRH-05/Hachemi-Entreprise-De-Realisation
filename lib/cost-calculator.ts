type ConstructionInputs = {
  area: number
  floors: number
  constructionType: string
  structureType: string
  foundationType: string
  flooringType: string
  wallFinishType: string
  windowType: string
  exteriorFinishType: string
  includeGarden: boolean
  includeFence: boolean
  elevator: boolean
  thermalInsulation: boolean
  financing: boolean
}

export function calculateConstructionCost(inputs: ConstructionInputs) {
  // Base costs per square meter based on construction type
  const constructionTypeCosts = {
    house: 60000, // 60,000 DZD/m²
    villa: 80000, // 80,000 DZD/m²
    building: 100000, // 100,000 DZD/m²
  }

  // Structure type costs
  const structureTypeCosts = {
    reinforcedConcrete: 70000, // 70,000 DZD/m²
    metalStructure: 85000, // 85,000 DZD/m²
    traditionalBrick: 60000, // 60,000 DZD/m²
  }

  // Foundation type costs
  const foundationTypeCosts = {
    separateFootings: 12000, // 12,000 DZD/m²
    concreteMasonry: 18000, // 18,000 DZD/m²
    piles: 30000, // 30,000 DZD per linear meter (approximated for area)
  }

  // Flooring costs per square meter
  const flooringCosts = {
    ceramic: 5000, // Average 5,000 DZD/m²
    porcelain: 12000, // Average 12,000 DZD/m²
    marble: 35000, // Average 35,000 DZD/m²
    woodParquet: 18000, // Average 18,000 DZD/m²
    epoxy: 15000, // 15,000 DZD/m²
  }

  // Wall finish costs per square meter
  const wallFinishCosts = {
    basicPaint: 2000, // Average 2,000 DZD/m²
    premiumPaint: 4000, // Average 4,000 DZD/m²
    wallpaper: 7000, // Average 7,000 DZD/m²
    gypsumDecor: 14000, // Average 14,000 DZD/m²
  }

  // Window costs (average per window, approximated for area)
  const windowCosts = {
    aluminum: 80000, // Average 80,000 DZD per window
    doubleGlazed: 140000, // Average 140,000 DZD per window
  }

  // Exterior finish costs per square meter
  const exteriorFinishCosts = {
    naturalStone: 20000, // 20,000 DZD/m²
    ceramicTiles: 10000, // 10,000 DZD/m²
    cementCoating: 3000, // 3,000 DZD/m²
  }

  // Calculate base construction cost
  const baseConstructionCost =
    constructionTypeCosts[inputs.constructionType as keyof typeof constructionTypeCosts] * inputs.area

  // Calculate structure cost
  const structureCost = structureTypeCosts[inputs.structureType as keyof typeof structureTypeCosts] * inputs.area

  // Calculate foundation cost
  const foundationCost = foundationTypeCosts[inputs.foundationType as keyof typeof foundationTypeCosts] * inputs.area

  // Calculate flooring cost
  const flooringCost = flooringCosts[inputs.flooringType as keyof typeof flooringCosts] * inputs.area

  // Calculate wall finish cost (assuming wall area is approximately 2.5 times floor area)
  const wallArea = inputs.area * 2.5
  const wallFinishCost = wallFinishCosts[inputs.wallFinishType as keyof typeof wallFinishCosts] * wallArea

  // Calculate window cost (assuming 1 window per 10 square meters)
  const numberOfWindows = Math.ceil(inputs.area / 10)
  const windowCost = windowCosts[inputs.windowType as keyof typeof windowCosts] * numberOfWindows

  // Calculate exterior finish cost (assuming exterior wall area is approximately equal to floor area)
  const exteriorWallArea = inputs.area
  const exteriorFinishCost =
    exteriorFinishCosts[inputs.exteriorFinishType as keyof typeof exteriorFinishCosts] * exteriorWallArea

  // Calculate additional costs
  const floorMultiplier = 1 + (inputs.floors - 1) * 0.1 // 10% increase for each additional floor
  const elevatorCost = inputs.elevator ? 1500000 * inputs.floors : 0 // 1,500,000 DZD per floor
  const insulationCost = inputs.thermalInsulation ? 1500 * inputs.area : 0 // 1,500 DZD/m²

  // Garden and fence costs (assuming garden area is 50% of building area and fence perimeter is 4 times square root of area)
  const gardenCost = inputs.includeGarden ? 2500 * (inputs.area * 0.5) : 0 // 2,500 DZD/m²
  const fenceLength = Math.ceil(4 * Math.sqrt(inputs.area))
  const fenceCost = inputs.includeFence ? 15000 * fenceLength : 0 // 15,000 DZD per linear meter

  // Electrical and plumbing costs (approximated)
  const electricalCost = 150000 * inputs.floors + 5000 * Math.ceil(inputs.area / 10) // 150,000 DZD per floor + outlets
  const plumbingCost = 500000 // Average 500,000 DZD

  // Administrative costs
  const licenseCost = 200000 + 800000 * (inputs.area / 500) // 200,000 to 1,000,000 DZD based on size
  const connectionFees = 200000 // Average 200,000 DZD
  const insuranceCost = 0.01 * (baseConstructionCost + structureCost + foundationCost) // 1% of structural costs

  // Calculate subtotal
  const subtotal =
    (baseConstructionCost +
      structureCost +
      foundationCost +
      flooringCost +
      wallFinishCost +
      windowCost +
      exteriorFinishCost +
      elevatorCost +
      insulationCost +
      gardenCost +
      fenceCost +
      electricalCost +
      plumbingCost +
      licenseCost +
      connectionFees +
      insuranceCost) *
    floorMultiplier

  // Return detailed breakdown
  return {
    totalCost: subtotal,
    breakdown: {
      baseConstructionCost,
      structureCost,
      foundationCost,
      flooringCost,
      wallFinishCost,
      windowCost,
      exteriorFinishCost,
      elevatorCost,
      insulationCost,
      gardenCost,
      fenceCost,
      electricalCost,
      plumbingCost,
      licenseCost,
      connectionFees,
      insuranceCost,
      floorAdjustment:
        subtotal -
        (baseConstructionCost +
          structureCost +
          foundationCost +
          flooringCost +
          wallFinishCost +
          windowCost +
          exteriorFinishCost +
          elevatorCost +
          insulationCost +
          gardenCost +
          fenceCost +
          electricalCost +
          plumbingCost +
          licenseCost +
          connectionFees +
          insuranceCost),
    },
    inputs,
    comparisons: {
      house: 60000 * inputs.area * floorMultiplier,
      villa: 80000 * inputs.area * floorMultiplier,
      building: 100000 * inputs.area * floorMultiplier,
    },
  }
}
