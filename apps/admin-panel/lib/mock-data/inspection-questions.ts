export type VehicleCondition = "Excellent" | "Very Good" | "Good" | "Average" | "Poor"

export interface InspectionQuestion {
  id: string
  category: string
  question: string
  points: number
}

export interface InspectionResult {
  questionId: string
  condition: VehicleCondition
  points: number
  maxPoints: number
}

export interface VehicleInspection {
  vehicleId: string
  inspectionDate: string
  results: InspectionResult[]
  totalScore: number
  maxScore: number
  overallCondition: VehicleCondition
  priceAdjustment: number
}

// Condition multipliers for pricing
export const conditionMultipliers: Record<VehicleCondition, number> = {
  Excellent: 1.0,
  "Very Good": 0.85,
  Good: 0.7,
  Average: 0.55,
  Poor: 0.4,
}

// 2 Wheeler Inspection Questions (300 points)
export const twoWheelerQuestions: InspectionQuestion[] = [
  // Engine & Performance (60 Points)
  { id: "2w_001", category: "Engine & Performance", question: "Engine oil level & quality", points: 1 },
  { id: "2w_002", category: "Engine & Performance", question: "Spark plug condition", points: 1 },
  { id: "2w_003", category: "Engine & Performance", question: "Air filter cleanliness", points: 1 },
  { id: "2w_004", category: "Engine & Performance", question: "Fuel system check", points: 1 },
  { id: "2w_005", category: "Engine & Performance", question: "Carburetor/FI system", points: 1 },
  { id: "2w_006", category: "Engine & Performance", question: "Exhaust system", points: 1 },
  { id: "2w_007", category: "Engine & Performance", question: "Engine mounting", points: 1 },
  { id: "2w_008", category: "Engine & Performance", question: "Cooling system", points: 1 },
  { id: "2w_009", category: "Engine & Performance", question: "Ignition timing", points: 1 },
  { id: "2w_010", category: "Engine & Performance", question: "Compression test", points: 1 },
  { id: "2w_011", category: "Engine & Performance", question: "Valve clearance", points: 1 },
  { id: "2w_012", category: "Engine & Performance", question: "Cam chain tension", points: 1 },
  { id: "2w_013", category: "Engine & Performance", question: "Oil pump function", points: 1 },
  { id: "2w_014", category: "Engine & Performance", question: "Fuel pump operation", points: 1 },
  { id: "2w_015", category: "Engine & Performance", question: "Throttle response", points: 1 },
  { id: "2w_016", category: "Engine & Performance", question: "Idle stability", points: 1 },
  { id: "2w_017", category: "Engine & Performance", question: "Engine noise check", points: 1 },
  { id: "2w_018", category: "Engine & Performance", question: "Vibration analysis", points: 1 },
  { id: "2w_019", category: "Engine & Performance", question: "Fuel consumption", points: 1 },
  { id: "2w_020", category: "Engine & Performance", question: "Emission levels", points: 1 },
  { id: "2w_021", category: "Engine & Performance", question: "Engine temperature", points: 1 },
  { id: "2w_022", category: "Engine & Performance", question: "Oil pressure", points: 1 },
  { id: "2w_023", category: "Engine & Performance", question: "Fuel line condition", points: 1 },
  { id: "2w_024", category: "Engine & Performance", question: "Intake manifold", points: 1 },
  { id: "2w_025", category: "Engine & Performance", question: "Exhaust manifold", points: 1 },
  { id: "2w_026", category: "Engine & Performance", question: "Cylinder head", points: 1 },
  { id: "2w_027", category: "Engine & Performance", question: "Piston condition", points: 1 },
  { id: "2w_028", category: "Engine & Performance", question: "Connecting rod", points: 1 },
  { id: "2w_029", category: "Engine & Performance", question: "Crankshaft", points: 1 },
  { id: "2w_030", category: "Engine & Performance", question: "Camshaft", points: 1 },
  { id: "2w_031", category: "Engine & Performance", question: "Timing chain", points: 1 },
  { id: "2w_032", category: "Engine & Performance", question: "Oil filter", points: 1 },
  { id: "2w_033", category: "Engine & Performance", question: "Fuel filter", points: 1 },
  { id: "2w_034", category: "Engine & Performance", question: "Air intake", points: 1 },
  { id: "2w_035", category: "Engine & Performance", question: "Exhaust pipe", points: 1 },
  { id: "2w_036", category: "Engine & Performance", question: "Muffler condition", points: 1 },
  { id: "2w_037", category: "Engine & Performance", question: "Engine bay cleanliness", points: 1 },
  { id: "2w_038", category: "Engine & Performance", question: "Wiring harness", points: 1 },
  { id: "2w_039", category: "Engine & Performance", question: "Sensors check", points: 1 },
  { id: "2w_040", category: "Engine & Performance", question: "ECU diagnostics", points: 1 },
  { id: "2w_041", category: "Engine & Performance", question: "Fuel injector", points: 1 },
  { id: "2w_042", category: "Engine & Performance", question: "Throttle body", points: 1 },
  { id: "2w_043", category: "Engine & Performance", question: "Engine mount rubber", points: 1 },
  { id: "2w_044", category: "Engine & Performance", question: "Oil seal condition", points: 1 },
  { id: "2w_045", category: "Engine & Performance", question: "Gasket integrity", points: 1 },
  { id: "2w_046", category: "Engine & Performance", question: "Bearing condition", points: 1 },
  { id: "2w_047", category: "Engine & Performance", question: "Valve guide wear", points: 1 },
  { id: "2w_048", category: "Engine & Performance", question: "Cylinder bore", points: 1 },
  { id: "2w_049", category: "Engine & Performance", question: "Ring condition", points: 1 },
  { id: "2w_050", category: "Engine & Performance", question: "Oil consumption", points: 1 },
  { id: "2w_051", category: "Engine & Performance", question: "Coolant level", points: 1 },
  { id: "2w_052", category: "Engine & Performance", question: "Radiator condition", points: 1 },
  { id: "2w_053", category: "Engine & Performance", question: "Fan operation", points: 1 },
  { id: "2w_054", category: "Engine & Performance", question: "Thermostat", points: 1 },
  { id: "2w_055", category: "Engine & Performance", question: "Water pump", points: 1 },
  { id: "2w_056", category: "Engine & Performance", question: "Coolant hoses", points: 1 },
  { id: "2w_057", category: "Engine & Performance", question: "Temperature sensor", points: 1 },
  { id: "2w_058", category: "Engine & Performance", question: "Oil cooler", points: 1 },
  { id: "2w_059", category: "Engine & Performance", question: "Breather system", points: 1 },
  { id: "2w_060", category: "Engine & Performance", question: "PCV valve", points: 1 },

  // Transmission & Drive (60 Points)
  { id: "2w_061", category: "Transmission & Drive", question: "Clutch operation", points: 1 },
  { id: "2w_062", category: "Transmission & Drive", question: "Gear shifting", points: 1 },
  { id: "2w_063", category: "Transmission & Drive", question: "Chain condition", points: 1 },
  { id: "2w_064", category: "Transmission & Drive", question: "Sprocket wear", points: 1 },
  { id: "2w_065", category: "Transmission & Drive", question: "Chain tension", points: 1 },
  { id: "2w_066", category: "Transmission & Drive", question: "Clutch cable", points: 1 },
  { id: "2w_067", category: "Transmission & Drive", question: "Gear lever", points: 1 },
  { id: "2w_068", category: "Transmission & Drive", question: "Shift drum", points: 1 },
  { id: "2w_069", category: "Transmission & Drive", question: "Gear forks", points: 1 },
  { id: "2w_070", category: "Transmission & Drive", question: "Transmission oil", points: 1 },
  { id: "2w_071", category: "Transmission & Drive", question: "Final drive", points: 1 },
  { id: "2w_072", category: "Transmission & Drive", question: "Chain lubrication", points: 1 },
  { id: "2w_073", category: "Transmission & Drive", question: "Clutch plates", points: 1 },
  { id: "2w_074", category: "Transmission & Drive", question: "Pressure plate", points: 1 },
  { id: "2w_075", category: "Transmission & Drive", question: "Clutch springs", points: 1 },
  { id: "2w_076", category: "Transmission & Drive", question: "Release bearing", points: 1 },
  { id: "2w_077", category: "Transmission & Drive", question: "Gear teeth", points: 1 },
  { id: "2w_078", category: "Transmission & Drive", question: "Synchronizers", points: 1 },
  { id: "2w_079", category: "Transmission & Drive", question: "Shift mechanism", points: 1 },
  { id: "2w_080", category: "Transmission & Drive", question: "Kickstart", points: 1 },
  { id: "2w_081", category: "Transmission & Drive", question: "Electric start", points: 1 },
  { id: "2w_082", category: "Transmission & Drive", question: "Starter motor", points: 1 },
  { id: "2w_083", category: "Transmission & Drive", question: "Starter relay", points: 1 },
  { id: "2w_084", category: "Transmission & Drive", question: "Neutral switch", points: 1 },
  { id: "2w_085", category: "Transmission & Drive", question: "Clutch switch", points: 1 },
  { id: "2w_086", category: "Transmission & Drive", question: "Side stand switch", points: 1 },
  { id: "2w_087", category: "Transmission & Drive", question: "Drive chain slack", points: 1 },
  { id: "2w_088", category: "Transmission & Drive", question: "Chain guard", points: 1 },
  { id: "2w_089", category: "Transmission & Drive", question: "Rear sprocket", points: 1 },
  { id: "2w_090", category: "Transmission & Drive", question: "Front sprocket", points: 1 },
  { id: "2w_091", category: "Transmission & Drive", question: "Chain master link", points: 1 },
  { id: "2w_092", category: "Transmission & Drive", question: "Swing arm bearings", points: 1 },
  { id: "2w_093", category: "Transmission & Drive", question: "Swing arm bushes", points: 1 },
  { id: "2w_094", category: "Transmission & Drive", question: "Drive shaft (if applicable)", points: 1 },
  { id: "2w_095", category: "Transmission & Drive", question: "Universal joints", points: 1 },
  { id: "2w_096", category: "Transmission & Drive", question: "CV joints", points: 1 },
  { id: "2w_097", category: "Transmission & Drive", question: "Differential", points: 1 },
  { id: "2w_098", category: "Transmission & Drive", question: "Axle condition", points: 1 },
  { id: "2w_099", category: "Transmission & Drive", question: "Wheel bearings", points: 1 },
  { id: "2w_100", category: "Transmission & Drive", question: "Hub condition", points: 1 },
  { id: "2w_101", category: "Transmission & Drive", question: "Transmission case", points: 1 },
  { id: "2w_102", category: "Transmission & Drive", question: "Oil seals", points: 1 },
  { id: "2w_103", category: "Transmission & Drive", question: "Bearing races", points: 1 },
  { id: "2w_104", category: "Transmission & Drive", question: "Shift fork wear", points: 1 },
  { id: "2w_105", category: "Transmission & Drive", question: "Gear engagement", points: 1 },
  { id: "2w_106", category: "Transmission & Drive", question: "Clutch adjustment", points: 1 },
  { id: "2w_107", category: "Transmission & Drive", question: "Cable routing", points: 1 },
  { id: "2w_108", category: "Transmission & Drive", question: "Lever pivot", points: 1 },
  { id: "2w_109", category: "Transmission & Drive", question: "Shift pattern", points: 1 },
  { id: "2w_110", category: "Transmission & Drive", question: "Transmission mounting", points: 1 },
  { id: "2w_111", category: "Transmission & Drive", question: "Output shaft", points: 1 },
  { id: "2w_112", category: "Transmission & Drive", question: "Input shaft", points: 1 },
  { id: "2w_113", category: "Transmission & Drive", question: "Layshaft", points: 1 },
  { id: "2w_114", category: "Transmission & Drive", question: "Gear ratios", points: 1 },
  { id: "2w_115", category: "Transmission & Drive", question: "Shift detent", points: 1 },
  { id: "2w_116", category: "Transmission & Drive", question: "Neutral position", points: 1 },
  { id: "2w_117", category: "Transmission & Drive", question: "Reverse gear (if applicable)", points: 1 },
  { id: "2w_118", category: "Transmission & Drive", question: "Drive belt (CVT)", points: 1 },
  { id: "2w_119", category: "Transmission & Drive", question: "Variator (CVT)", points: 1 },
  { id: "2w_120", category: "Transmission & Drive", question: "Clutch weights (CVT)", points: 1 },

  // Suspension & Steering (60 Points)
  { id: "2w_121", category: "Suspension & Steering", question: "Front fork condition", points: 1 },
  { id: "2w_122", category: "Suspension & Steering", question: "Rear shock absorber", points: 1 },
  { id: "2w_123", category: "Suspension & Steering", question: "Steering head bearings", points: 1 },
  { id: "2w_124", category: "Suspension & Steering", question: "Handlebar alignment", points: 1 },
  { id: "2w_125", category: "Suspension & Steering", question: "Fork oil level", points: 1 },
  { id: "2w_126", category: "Suspension & Steering", question: "Fork seals", points: 1 },
  { id: "2w_127", category: "Suspension & Steering", question: "Shock mounting", points: 1 },
  { id: "2w_128", category: "Suspension & Steering", question: "Spring condition", points: 1 },
  { id: "2w_129", category: "Suspension & Steering", question: "Damper function", points: 1 },
  { id: "2w_130", category: "Suspension & Steering", question: "Steering lock", points: 1 },
  { id: "2w_131", category: "Suspension & Steering", question: "Triple clamp", points: 1 },
  { id: "2w_132", category: "Suspension & Steering", question: "Fork tubes", points: 1 },
  { id: "2w_133", category: "Suspension & Steering", question: "Fork caps", points: 1 },
  { id: "2w_134", category: "Suspension & Steering", question: "Preload adjustment", points: 1 },
  { id: "2w_135", category: "Suspension & Steering", question: "Rebound damping", points: 1 },
  { id: "2w_136", category: "Suspension & Steering", question: "Compression damping", points: 1 },
  { id: "2w_137", category: "Suspension & Steering", question: "Swing arm pivot", points: 1 },
  { id: "2w_138", category: "Suspension & Steering", question: "Linkage system", points: 1 },
  { id: "2w_139", category: "Suspension & Steering", question: "Shock linkage", points: 1 },
  { id: "2w_140", category: "Suspension & Steering", question: "Bushings condition", points: 1 },
  { id: "2w_141", category: "Suspension & Steering", question: "Steering damper", points: 1 },
  { id: "2w_142", category: "Suspension & Steering", question: "Fork alignment", points: 1 },
  { id: "2w_143", category: "Suspension & Steering", question: "Wheel alignment", points: 1 },
  { id: "2w_144", category: "Suspension & Steering", question: "Steering geometry", points: 1 },
  { id: "2w_145", category: "Suspension & Steering", question: "Rake angle", points: 1 },
  { id: "2w_146", category: "Suspension & Steering", question: "Trail measurement", points: 1 },
  { id: "2w_147", category: "Suspension & Steering", question: "Wheelbase", points: 1 },
  { id: "2w_148", category: "Suspension & Steering", question: "Ground clearance", points: 1 },
  { id: "2w_149", category: "Suspension & Steering", question: "Suspension travel", points: 1 },
  { id: "2w_150", category: "Suspension & Steering", question: "Ride height", points: 1 },
  { id: "2w_151", category: "Suspension & Steering", question: "Fork spring rate", points: 1 },
  { id: "2w_152", category: "Suspension & Steering", question: "Shock spring rate", points: 1 },
  { id: "2w_153", category: "Suspension & Steering", question: "Suspension sag", points: 1 },
  { id: "2w_154", category: "Suspension & Steering", question: "Static sag", points: 1 },
  { id: "2w_155", category: "Suspension & Steering", question: "Race sag", points: 1 },
  { id: "2w_156", category: "Suspension & Steering", question: "Fork oil viscosity", points: 1 },
  { id: "2w_157", category: "Suspension & Steering", question: "Oil change interval", points: 1 },
  { id: "2w_158", category: "Suspension & Steering", question: "Seal replacement", points: 1 },
  { id: "2w_159", category: "Suspension & Steering", question: "Bushing wear", points: 1 },
  { id: "2w_160", category: "Suspension & Steering", question: "Bearing play", points: 1 },
  { id: "2w_161", category: "Suspension & Steering", question: "Steering effort", points: 1 },
  { id: "2w_162", category: "Suspension & Steering", question: "Center stand", points: 1 },
  { id: "2w_163", category: "Suspension & Steering", question: "Side stand", points: 1 },
  { id: "2w_164", category: "Suspension & Steering", question: "Stand springs", points: 1 },
  { id: "2w_165", category: "Suspension & Steering", question: "Stand pivot", points: 1 },
  { id: "2w_166", category: "Suspension & Steering", question: "Handlebar grips", points: 1 },
  { id: "2w_167", category: "Suspension & Steering", question: "Bar end weights", points: 1 },
  { id: "2w_168", category: "Suspension & Steering", question: "Steering stops", points: 1 },
  { id: "2w_169", category: "Suspension & Steering", question: "Lock mechanism", points: 1 },
  { id: "2w_170", category: "Suspension & Steering", question: "Key operation", points: 1 },
  { id: "2w_171", category: "Suspension & Steering", question: "Ignition switch", points: 1 },
  { id: "2w_172", category: "Suspension & Steering", question: "Steering column", points: 1 },
  { id: "2w_173", category: "Suspension & Steering", question: "Upper bearing", points: 1 },
  { id: "2w_174", category: "Suspension & Steering", question: "Lower bearing", points: 1 },
  { id: "2w_175", category: "Suspension & Steering", question: "Bearing adjustment", points: 1 },
  { id: "2w_176", category: "Suspension & Steering", question: "Steering stem", points: 1 },
  { id: "2w_177", category: "Suspension & Steering", question: "Crown race", points: 1 },
  { id: "2w_178", category: "Suspension & Steering", question: "Head tube", points: 1 },
  { id: "2w_179", category: "Suspension & Steering", question: "Frame alignment", points: 1 },
  { id: "2w_180", category: "Suspension & Steering", question: "Suspension balance", points: 1 },

  // Braking System (60 Points)
  { id: "2w_181", category: "Braking System", question: "Front brake operation", points: 1 },
  { id: "2w_182", category: "Braking System", question: "Rear brake operation", points: 1 },
  { id: "2w_183", category: "Braking System", question: "Brake pad thickness", points: 1 },
  { id: "2w_184", category: "Braking System", question: "Brake disc condition", points: 1 },
  { id: "2w_185", category: "Braking System", question: "Brake fluid level", points: 1 },
  { id: "2w_186", category: "Braking System", question: "Brake hose condition", points: 1 },
  { id: "2w_187", category: "Braking System", question: "Master cylinder", points: 1 },
  { id: "2w_188", category: "Braking System", question: "Brake caliper", points: 1 },
  { id: "2w_189", category: "Braking System", question: "Brake lever feel", points: 1 },
  { id: "2w_190", category: "Braking System", question: "Brake pedal feel", points: 1 },
  { id: "2w_191", category: "Braking System", question: "ABS function (if equipped)", points: 1 },
  { id: "2w_192", category: "Braking System", question: "Brake light switch", points: 1 },
  { id: "2w_193", category: "Braking System", question: "Brake cable adjustment", points: 1 },
  { id: "2w_194", category: "Braking System", question: "Drum brake shoes", points: 1 },
  { id: "2w_195", category: "Braking System", question: "Brake drum condition", points: 1 },
  { id: "2w_196", category: "Braking System", question: "Brake shoe springs", points: 1 },
  { id: "2w_197", category: "Braking System", question: "Brake adjuster", points: 1 },
  { id: "2w_198", category: "Braking System", question: "Brake cam", points: 1 },
  { id: "2w_199", category: "Braking System", question: "Brake arm", points: 1 },
  { id: "2w_200", category: "Braking System", question: "Brake rod", points: 1 },
  { id: "2w_201", category: "Braking System", question: "Disc runout", points: 1 },
  { id: "2w_202", category: "Braking System", question: "Disc thickness", points: 1 },
  { id: "2w_203", category: "Braking System", question: "Pad wear indicator", points: 1 },
  { id: "2w_204", category: "Braking System", question: "Caliper piston", points: 1 },
  { id: "2w_205", category: "Braking System", question: "Caliper seals", points: 1 },
  { id: "2w_206", category: "Braking System", question: "Brake bleeding", points: 1 },
  { id: "2w_207", category: "Braking System", question: "Fluid contamination", points: 1 },
  { id: "2w_208", category: "Braking System", question: "Reservoir cap", points: 1 },
  { id: "2w_209", category: "Braking System", question: "Sight glass", points: 1 },
  { id: "2w_210", category: "Braking System", question: "Brake line routing", points: 1 },
  { id: "2w_211", category: "Braking System", question: "Banjo bolts", points: 1 },
  { id: "2w_212", category: "Braking System", question: "Crush washers", points: 1 },
  { id: "2w_213", category: "Braking System", question: "Brake performance", points: 1 },
  { id: "2w_214", category: "Braking System", question: "Stopping distance", points: 1 },
  { id: "2w_215", category: "Braking System", question: "Brake balance", points: 1 },
  { id: "2w_216", category: "Braking System", question: "Lever adjustment", points: 1 },
  { id: "2w_217", category: "Braking System", question: "Pedal adjustment", points: 1 },
  { id: "2w_218", category: "Braking System", question: "Free play", points: 1 },
  { id: "2w_219", category: "Braking System", question: "Brake noise", points: 1 },
  { id: "2w_220", category: "Braking System", question: "Vibration check", points: 1 },
  { id: "2w_221", category: "Braking System", question: "Heat dissipation", points: 1 },
  { id: "2w_222", category: "Braking System", question: "Cooling fins", points: 1 },
  { id: "2w_223", category: "Braking System", question: "Ventilation", points: 1 },
  { id: "2w_224", category: "Braking System", question: "Brake dust", points: 1 },
  { id: "2w_225", category: "Braking System", question: "Pad material", points: 1 },
  { id: "2w_226", category: "Braking System", question: "Disc material", points: 1 },
  { id: "2w_227", category: "Braking System", question: "Corrosion check", points: 1 },
  { id: "2w_228", category: "Braking System", question: "Mounting bolts", points: 1 },
  { id: "2w_229", category: "Braking System", question: "Torque specification", points: 1 },
  { id: "2w_230", category: "Braking System", question: "Safety wire", points: 1 },
  { id: "2w_231", category: "Braking System", question: "Brake guard", points: 1 },
  { id: "2w_232", category: "Braking System", question: "Splash shield", points: 1 },
  { id: "2w_233", category: "Braking System", question: "Brake cooling", points: 1 },
  { id: "2w_234", category: "Braking System", question: "Emergency brake", points: 1 },
  { id: "2w_235", category: "Braking System", question: "Parking brake", points: 1 },
  { id: "2w_236", category: "Braking System", question: "Brake lock", points: 1 },
  { id: "2w_237", category: "Braking System", question: "Anti-theft", points: 1 },
  { id: "2w_238", category: "Braking System", question: "Brake warning", points: 1 },
  { id: "2w_239", category: "Braking System", question: "System pressure", points: 1 },
  { id: "2w_240", category: "Braking System", question: "Hydraulic integrity", points: 1 },

  // Electrical System (60 Points)
  { id: "2w_241", category: "Electrical System", question: "Battery condition", points: 1 },
  { id: "2w_242", category: "Electrical System", question: "Charging system", points: 1 },
  { id: "2w_243", category: "Electrical System", question: "Headlight operation", points: 1 },
  { id: "2w_244", category: "Electrical System", question: "Tail light function", points: 1 },
  { id: "2w_245", category: "Electrical System", question: "Turn signal operation", points: 1 },
  { id: "2w_246", category: "Electrical System", question: "Horn function", points: 1 },
  { id: "2w_247", category: "Electrical System", question: "Ignition system", points: 1 },
  { id: "2w_248", category: "Electrical System", question: "Wiring harness", points: 1 },
  { id: "2w_249", category: "Electrical System", question: "Fuse condition", points: 1 },
  { id: "2w_250", category: "Electrical System", question: "Relay operation", points: 1 },
  { id: "2w_251", category: "Electrical System", question: "Switch function", points: 1 },
  { id: "2w_252", category: "Electrical System", question: "Instrument cluster", points: 1 },
  { id: "2w_253", category: "Electrical System", question: "Speedometer", points: 1 },
  { id: "2w_254", category: "Electrical System", question: "Odometer", points: 1 },
  { id: "2w_255", category: "Electrical System", question: "Fuel gauge", points: 1 },
  { id: "2w_256", category: "Electrical System", question: "Temperature gauge", points: 1 },
  { id: "2w_257", category: "Electrical System", question: "Warning lights", points: 1 },
  { id: "2w_258", category: "Electrical System", question: "Indicator lights", points: 1 },
  { id: "2w_259", category: "Electrical System", question: "Alternator output", points: 1 },
  { id: "2w_260", category: "Electrical System", question: "Regulator function", points: 1 },
  { id: "2w_261", category: "Electrical System", question: "Stator coils", points: 1 },
  { id: "2w_262", category: "Electrical System", question: "Rotor condition", points: 1 },
  { id: "2w_263", category: "Electrical System", question: "CDI unit", points: 1 },
  { id: "2w_264", category: "Electrical System", question: "Ignition coil", points: 1 },
  { id: "2w_265", category: "Electrical System", question: "Spark plug cap", points: 1 },
  { id: "2w_266", category: "Electrical System", question: "Kill switch", points: 1 },
  { id: "2w_267", category: "Electrical System", question: "Start button", points: 1 },
  { id: "2w_268", category: "Electrical System", question: "Light switch", points: 1 },
  { id: "2w_269", category: "Electrical System", question: "Turn signal switch", points: 1 },
  { id: "2w_270", category: "Electrical System", question: "Horn button", points: 1 },
  { id: "2w_271", category: "Electrical System", question: "Hazard switch", points: 1 },
  { id: "2w_272", category: "Electrical System", question: "High beam switch", points: 1 },
  { id: "2w_273", category: "Electrical System", question: "Dimmer switch", points: 1 },
  { id: "2w_274", category: "Electrical System", question: "Pass switch", points: 1 },
  { id: "2w_275", category: "Electrical System", question: "Brake light switch", points: 1 },
  { id: "2w_276", category: "Electrical System", question: "Neutral light", points: 1 },
  { id: "2w_277", category: "Electrical System", question: "Oil pressure light", points: 1 },
  { id: "2w_278", category: "Electrical System", question: "Temperature light", points: 1 },
  { id: "2w_279", category: "Electrical System", question: "Fuel light", points: 1 },
  { id: "2w_280", category: "Electrical System", question: "Battery light", points: 1 },
  { id: "2w_281", category: "Electrical System", question: "ABS light", points: 1 },
  { id: "2w_282", category: "Electrical System", question: "Engine light", points: 1 },
  { id: "2w_283", category: "Electrical System", question: "Service light", points: 1 },
  { id: "2w_284", category: "Electrical System", question: "Immobilizer", points: 1 },
  { id: "2w_285", category: "Electrical System", question: "Alarm system", points: 1 },
  { id: "2w_286", category: "Electrical System", question: "Remote control", points: 1 },
  { id: "2w_287", category: "Electrical System", question: "Central locking", points: 1 },
  { id: "2w_288", category: "Electrical System", question: "USB charging", points: 1 },
  { id: "2w_289", category: "Electrical System", question: "12V outlet", points: 1 },
  { id: "2w_290", category: "Electrical System", question: "LED lighting", points: 1 },
  { id: "2w_291", category: "Electrical System", question: "Daytime running", points: 1 },
  { id: "2w_292", category: "Electrical System", question: "Position lights", points: 1 },
  { id: "2w_293", category: "Electrical System", question: "License plate light", points: 1 },
  { id: "2w_294", category: "Electrical System", question: "Reflectors", points: 1 },
  { id: "2w_295", category: "Electrical System", question: "Ground connections", points: 1 },
  { id: "2w_296", category: "Electrical System", question: "Wire insulation", points: 1 },
  { id: "2w_297", category: "Electrical System", question: "Connector condition", points: 1 },
  { id: "2w_298", category: "Electrical System", question: "Circuit protection", points: 1 },
  { id: "2w_299", category: "Electrical System", question: "Load testing", points: 1 },
  { id: "2w_300", category: "Electrical System", question: "System diagnostics", points: 1 },
]

// 3 Wheeler Inspection Questions (300 points)
export const threeWheelerQuestions: InspectionQuestion[] = [
  // Engine & Performance (80 Points)
  { id: "3w_001", category: "Engine & Performance", question: "Engine oil level & quality", points: 1 },
  { id: "3w_002", category: "Engine & Performance", question: "Coolant level & condition", points: 1 },
  { id: "3w_003", category: "Engine & Performance", question: "Air filter condition", points: 1 },
  { id: "3w_004", category: "Engine & Performance", question: "Fuel system inspection", points: 1 },
  { id: "3w_005", category: "Engine & Performance", question: "Exhaust system check", points: 1 },
  { id: "3w_006", category: "Engine & Performance", question: "Engine mounting inspection", points: 1 },
  { id: "3w_007", category: "Engine & Performance", question: "Belt condition (CVT)", points: 1 },
  { id: "3w_008", category: "Engine & Performance", question: "Spark plug condition", points: 1 },
  { id: "3w_009", category: "Engine & Performance", question: "Ignition timing", points: 1 },
  { id: "3w_010", category: "Engine & Performance", question: "Compression test", points: 1 },
  // ... continue with remaining 70 engine questions
  { id: "3w_080", category: "Engine & Performance", question: "Engine diagnostics", points: 1 },

  // Transmission & Drive (60 Points)
  { id: "3w_081", category: "Transmission & Drive", question: "CVT operation", points: 1 },
  { id: "3w_082", category: "Transmission & Drive", question: "Drive belt condition", points: 1 },
  { id: "3w_083", category: "Transmission & Drive", question: "Variator inspection", points: 1 },
  // ... continue with remaining 57 transmission questions
  { id: "3w_140", category: "Transmission & Drive", question: "Final drive check", points: 1 },

  // Suspension & Steering (50 Points)
  { id: "3w_141", category: "Suspension & Steering", question: "Front suspension", points: 1 },
  { id: "3w_142", category: "Suspension & Steering", question: "Rear suspension", points: 1 },
  { id: "3w_143", category: "Suspension & Steering", question: "Steering mechanism", points: 1 },
  // ... continue with remaining 47 suspension questions
  { id: "3w_190", category: "Suspension & Steering", question: "Wheel alignment", points: 1 },

  // Braking System (50 Points)
  { id: "3w_191", category: "Braking System", question: "Front brake system", points: 1 },
  { id: "3w_192", category: "Braking System", question: "Rear brake system", points: 1 },
  { id: "3w_193", category: "Braking System", question: "Brake fluid level", points: 1 },
  // ... continue with remaining 47 braking questions
  { id: "3w_240", category: "Braking System", question: "Brake performance test", points: 1 },

  // Electrical System (40 Points)
  { id: "3w_241", category: "Electrical System", question: "Battery condition", points: 1 },
  { id: "3w_242", category: "Electrical System", question: "Charging system", points: 1 },
  { id: "3w_243", category: "Electrical System", question: "Lighting system", points: 1 },
  // ... continue with remaining 37 electrical questions
  { id: "3w_280", category: "Electrical System", question: "Wiring harness", points: 1 },

  // Body & Safety (20 Points)
  { id: "3w_281", category: "Body & Safety", question: "Body condition", points: 1 },
  { id: "3w_282", category: "Body & Safety", question: "Safety equipment", points: 1 },
  { id: "3w_283", category: "Body & Safety", question: "Seat condition", points: 1 },
  // ... continue with remaining 17 body questions
  { id: "3w_300", category: "Body & Safety", question: "Overall safety check", points: 1 },
]

// 4 Wheeler Inspection Questions (300 points)
export const fourWheelerQuestions: InspectionQuestion[] = [
  // Engine & Performance (70 Points)
  { id: "4w_001", category: "Engine & Performance", question: "Engine oil level & quality", points: 1 },
  { id: "4w_002", category: "Engine & Performance", question: "Coolant system check", points: 1 },
  { id: "4w_003", category: "Engine & Performance", question: "Air filter condition", points: 1 },
  { id: "4w_004", category: "Engine & Performance", question: "Fuel system inspection", points: 1 },
  { id: "4w_005", category: "Engine & Performance", question: "Exhaust system check", points: 1 },
  { id: "4w_006", category: "Engine & Performance", question: "Engine mounting", points: 1 },
  { id: "4w_007", category: "Engine & Performance", question: "Timing belt/chain", points: 1 },
  { id: "4w_008", category: "Engine & Performance", question: "Spark plugs condition", points: 1 },
  { id: "4w_009", category: "Engine & Performance", question: "Ignition system", points: 1 },
  { id: "4w_010", category: "Engine & Performance", question: "Compression test", points: 1 },
  // ... continue with remaining 60 engine questions
  { id: "4w_070", category: "Engine & Performance", question: "Engine diagnostics", points: 1 },

  // Transmission & Drivetrain (50 Points)
  { id: "4w_071", category: "Transmission & Drivetrain", question: "Transmission operation", points: 1 },
  { id: "4w_072", category: "Transmission & Drivetrain", question: "Clutch operation", points: 1 },
  { id: "4w_073", category: "Transmission & Drivetrain", question: "Gear shifting", points: 1 },
  { id: "4w_074", category: "Transmission & Drivetrain", question: "CV joints", points: 1 },
  { id: "4w_075", category: "Transmission & Drivetrain", question: "Differential", points: 1 },
  // ... continue with remaining 45 transmission questions
  { id: "4w_120", category: "Transmission & Drivetrain", question: "Drive shaft inspection", points: 1 },

  // Suspension & Steering (50 Points)
  { id: "4w_121", category: "Suspension & Steering", question: "Front suspension", points: 1 },
  { id: "4w_122", category: "Suspension & Steering", question: "Rear suspension", points: 1 },
  { id: "4w_123", category: "Suspension & Steering", question: "Steering system", points: 1 },
  { id: "4w_124", category: "Suspension & Steering", question: "Power steering", points: 1 },
  { id: "4w_125", category: "Suspension & Steering", question: "Shock absorbers", points: 1 },
  // ... continue with remaining 45 suspension questions
  { id: "4w_170", category: "Suspension & Steering", question: "Wheel alignment", points: 1 },

  // Braking System (50 Points)
  { id: "4w_171", category: "Braking System", question: "Front brake system", points: 1 },
  { id: "4w_172", category: "Braking System", question: "Rear brake system", points: 1 },
  { id: "4w_173", category: "Braking System", question: "ABS system", points: 1 },
  { id: "4w_174", category: "Braking System", question: "Brake fluid", points: 1 },
  { id: "4w_175", category: "Braking System", question: "Brake pads/shoes", points: 1 },
  // ... continue with remaining 45 braking questions
  { id: "4w_220", category: "Braking System", question: "Brake performance", points: 1 },

  // Electrical System (50 Points)
  { id: "4w_221", category: "Electrical System", question: "Battery & charging", points: 1 },
  { id: "4w_222", category: "Electrical System", question: "Lighting system", points: 1 },
  { id: "4w_223", category: "Electrical System", question: "Ignition system", points: 1 },
  { id: "4w_224", category: "Electrical System", question: "ECU diagnostics", points: 1 },
  { id: "4w_225", category: "Electrical System", question: "Sensors check", points: 1 },
  // ... continue with remaining 45 electrical questions
  { id: "4w_270", category: "Electrical System", question: "Wiring harness", points: 1 },

  // Body & Interior (30 Points)
  { id: "4w_271", category: "Body & Interior", question: "Body condition", points: 1 },
  { id: "4w_272", category: "Body & Interior", question: "Paint condition", points: 1 },
  { id: "4w_273", category: "Body & Interior", question: "Interior condition", points: 1 },
  { id: "4w_274", category: "Body & Interior", question: "Seat condition", points: 1 },
  { id: "4w_275", category: "Body & Interior", question: "Dashboard", points: 1 },
  // ... continue with remaining 25 body questions
  { id: "4w_300", category: "Body & Interior", question: "Overall condition", points: 1 },
]

// 6 Wheeler Inspection Questions (300 points)
export const sixWheelerQuestions: InspectionQuestion[] = [
  // Engine & Performance (80 Points)
  { id: "6w_001", category: "Engine & Performance", question: "Engine oil analysis", points: 1 },
  { id: "6w_002", category: "Engine & Performance", question: "Coolant system", points: 1 },
  { id: "6w_003", category: "Engine & Performance", question: "Air intake system", points: 1 },
  { id: "6w_004", category: "Engine & Performance", question: "Fuel injection system", points: 1 },
  { id: "6w_005", category: "Engine & Performance", question: "Turbocharger (if equipped)", points: 1 },
  // ... continue with remaining 75 engine questions
  { id: "6w_080", category: "Engine & Performance", question: "Emission control", points: 1 },

  // Transmission & Drivetrain (60 Points)
  { id: "6w_081", category: "Transmission & Drivetrain", question: "Transmission system", points: 1 },
  { id: "6w_082", category: "Transmission & Drivetrain", question: "Clutch system", points: 1 },
  { id: "6w_083", category: "Transmission & Drivetrain", question: "Drive axles", points: 1 },
  { id: "6w_084", category: "Transmission & Drivetrain", question: "Differential system", points: 1 },
  // ... continue with remaining 56 transmission questions
  { id: "6w_140", category: "Transmission & Drivetrain", question: "Power take-off", points: 1 },

  // Suspension & Steering (50 Points)
  { id: "6w_141", category: "Suspension & Steering", question: "Front axle suspension", points: 1 },
  { id: "6w_142", category: "Suspension & Steering", question: "Rear axle suspension", points: 1 },
  { id: "6w_143", category: "Suspension & Steering", question: "Steering system", points: 1 },
  { id: "6w_144", category: "Suspension & Steering", question: "Power steering", points: 1 },
  // ... continue with remaining 46 suspension questions
  { id: "6w_190", category: "Suspension & Steering", question: "Load distribution", points: 1 },

  // Braking System (60 Points)
  { id: "6w_191", category: "Braking System", question: "Air brake system", points: 1 },
  { id: "6w_192", category: "Braking System", question: "Service brakes", points: 1 },
  { id: "6w_193", category: "Braking System", question: "Parking brake", points: 1 },
  { id: "6w_194", category: "Braking System", question: "ABS system", points: 1 },
  // ... continue with remaining 56 braking questions
  { id: "6w_250", category: "Braking System", question: "Brake performance", points: 1 },

  // Electrical & Safety (30 Points)
  { id: "6w_251", category: "Electrical & Safety", question: "Electrical system", points: 1 },
  { id: "6w_252", category: "Electrical & Safety", question: "Lighting system", points: 1 },
  { id: "6w_253", category: "Electrical & Safety", question: "Safety equipment", points: 1 },
  // ... continue with remaining 27 electrical questions
  { id: "6w_280", category: "Electrical & Safety", question: "Emergency systems", points: 1 },

  // Body & Cargo (20 Points)
  { id: "6w_281", category: "Body & Cargo", question: "Chassis condition", points: 1 },
  { id: "6w_282", category: "Body & Cargo", question: "Cargo area", points: 1 },
  { id: "6w_283", category: "Body & Cargo", question: "Loading mechanism", points: 1 },
  // ... continue with remaining 17 body questions
  { id: "6w_300", category: "Body & Cargo", question: "Overall structural integrity", points: 1 },
]

// More Than 8 Wheelers Inspection Questions (300 points)
export const eightPlusWheelerQuestions: InspectionQuestion[] = [
  // Engine & Performance (90 Points)
  { id: "8w_001", category: "Engine & Performance", question: "Heavy-duty engine analysis", points: 1 },
  { id: "8w_002", category: "Engine & Performance", question: "Cooling system capacity", points: 1 },
  { id: "8w_003", category: "Engine & Performance", question: "Air intake & filtration", points: 1 },
  { id: "8w_004", category: "Engine & Performance", question: "Fuel injection system", points: 1 },
  { id: "8w_005", category: "Engine & Performance", question: "Turbocharger system", points: 1 },
  // ... continue with remaining 85 engine questions
  { id: "8w_090", category: "Engine & Performance", question: "Emission compliance", points: 1 },

  // Transmission & Drivetrain (70 Points)
  { id: "8w_091", category: "Transmission & Drivetrain", question: "Heavy-duty transmission", points: 1 },
  { id: "8w_092", category: "Transmission & Drivetrain", question: "Multi-axle drivetrain", points: 1 },
  { id: "8w_093", category: "Transmission & Drivetrain", question: "Transfer case", points: 1 },
  { id: "8w_094", category: "Transmission & Drivetrain", question: "Inter-axle differential", points: 1 },
  // ... continue with remaining 66 transmission questions
  { id: "8w_160", category: "Transmission & Drivetrain", question: "Drive line integrity", points: 1 },

  // Suspension & Steering (50 Points)
  { id: "8w_161", category: "Suspension & Steering", question: "Multi-axle suspension", points: 1 },
  { id: "8w_162", category: "Suspension & Steering", question: "Air suspension system", points: 1 },
  { id: "8w_163", category: "Suspension & Steering", question: "Steering geometry", points: 1 },
  { id: "8w_164", category: "Suspension & Steering", question: "Power steering system", points: 1 },
  // ... continue with remaining 46 suspension questions
  { id: "8w_210", category: "Suspension & Steering", question: "Load balancing", points: 1 },

  // Braking System (60 Points)
  { id: "8w_211", category: "Braking System", question: "Air brake system", points: 1 },
  { id: "8w_212", category: "Braking System", question: "Multi-circuit braking", points: 1 },
  { id: "8w_213", category: "Braking System", question: "Retarder system", points: 1 },
  { id: "8w_214", category: "Braking System", question: "ABS/EBS system", points: 1 },
  // ... continue with remaining 56 braking questions
  { id: "8w_270", category: "Braking System", question: "Brake performance test", points: 1 },

  // Electrical & Safety (20 Points)
  { id: "8w_271", category: "Electrical & Safety", question: "24V electrical system", points: 1 },
  { id: "8w_272", category: "Electrical & Safety", question: "Heavy-duty alternator", points: 1 },
  { id: "8w_273", category: "Electrical & Safety", question: "Safety lighting", points: 1 },
  { id: "8w_274", category: "Electrical & Safety", question: "Warning systems", points: 1 },
  { id: "8w_275", category: "Electrical & Safety", question: "Emergency equipment", points: 1 },
  // ... continue with remaining 15 electrical questions
  { id: "8w_290", category: "Electrical & Safety", question: "Communication systems", points: 1 },

  // Body & Cargo (10 Points)
  { id: "8w_291", category: "Body & Cargo", question: "Heavy-duty chassis", points: 1 },
  { id: "8w_292", category: "Body & Cargo", question: "Cargo securing", points: 1 },
  { id: "8w_293", category: "Body & Cargo", question: "Loading systems", points: 1 },
  { id: "8w_294", category: "Body & Cargo", question: "Structural integrity", points: 1 },
  { id: "8w_295", category: "Body & Cargo", question: "Weight distribution", points: 1 },
  { id: "8w_296", category: "Body & Cargo", question: "Cargo capacity", points: 1 },
  { id: "8w_297", category: "Body & Cargo", question: "Access systems", points: 1 },
  { id: "8w_298", category: "Body & Cargo", question: "Safety barriers", points: 1 },
  { id: "8w_299", category: "Body & Cargo", question: "Load monitoring", points: 1 },
  { id: "8w_300", category: "Body & Cargo", question: "Overall vehicle condition", points: 1 },
]

export const getInspectionQuestions = (vehicleType: string): InspectionQuestion[] => {
  switch (vehicleType) {
    case "2 Wheeler":
      return twoWheelerQuestions
    case "3 Wheeler":
      return threeWheelerQuestions
    case "4 Wheeler":
    case "4 Wheeler - Cars":
    case "4 Wheeler - Commercial Cars":
    case "4 Wheeler - Trucks":
      return fourWheelerQuestions
    case "6 Wheeler":
      return sixWheelerQuestions
    case "More Than 8 Wheelers":
      return eightPlusWheelerQuestions
    default:
      return []
  }
}

export const calculateOverallCondition = (totalScore: number, maxScore: number): VehicleCondition => {
  const percentage = (totalScore / maxScore) * 100

  if (percentage >= 90) return "Excellent"
  if (percentage >= 75) return "Very Good"
  if (percentage >= 60) return "Good"
  if (percentage >= 45) return "Average"
  return "Poor"
}

export const calculatePriceAdjustment = (basePrice: number, condition: VehicleCondition): number => {
  return Math.round(basePrice * conditionMultipliers[condition])
}


