import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ClassificationRequest {
  imageData: string;
  cropType?: string;
}

interface Resource {
  title: string;
  url: string;
}

interface Disease {
  name: string;
  confidence: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  recommendations: string[];
  causes: string[];
  resources: Resource[];
}

const mockDiseases: Disease[] = [
  {
    name: "Early Blight",
    confidence: 87.5,
    severity: "Medium",
    recommendations: [
      "Remove and destroy infected leaves immediately",
      "Apply copper-based fungicide every 7-10 days",
      "Ensure proper spacing between plants for air circulation",
      "Avoid overhead watering to reduce leaf wetness"
    ],
    causes: [
      "Fungus Alternaria solani thrives in warm, humid conditions",
      "Water splash from rain or irrigation spreads spores",
      "Poor air circulation around plants",
      "Stressed plants due to nutrient deficiency or drought"
    ],
    resources: [
      {
        title: "Copper Fungicide for Early Blight Control",
        url: "https://www.amazon.com/s?k=copper+fungicide"
      },
      {
        title: "Organic Neem Oil Spray",
        url: "https://www.amazon.com/s?k=neem+oil+spray"
      },
      {
        title: "Garden Pruning Shears for Leaf Removal",
        url: "https://www.amazon.com/s?k=pruning+shears"
      }
    ]
  },
  {
    name: "Late Blight",
    confidence: 92.3,
    severity: "Critical",
    recommendations: [
      "Apply fungicide containing chlorothalonil immediately",
      "Remove all infected plant parts and destroy them",
      "Avoid working with plants when wet",
      "Consider destroying severely infected plants",
      "Monitor weather conditions - disease spreads rapidly in cool, wet conditions"
    ],
    causes: [
      "Phytophthora infestans pathogen spreads through airborne spores",
      "Cool temperatures (60-70°F) combined with high humidity",
      "Infected seed tubers or transplants",
      "Wind-blown spores from neighboring infected crops"
    ],
    resources: [
      {
        title: "Chlorothalonil Fungicide",
        url: "https://www.amazon.com/s?k=chlorothalonil+fungicide"
      },
      {
        title: "Daconil Fungicide for Late Blight",
        url: "https://www.amazon.com/s?k=daconil+fungicide"
      },
      {
        title: "Heavy-Duty Garden Gloves",
        url: "https://www.amazon.com/s?k=garden+gloves"
      }
    ]
  },
  {
    name: "Leaf Spot",
    confidence: 78.9,
    severity: "Low",
    recommendations: [
      "Remove affected leaves to prevent spread",
      "Apply neem oil or copper fungicide",
      "Improve air circulation around plants",
      "Water at the base of plants, not overhead"
    ],
    causes: [
      "Various fungal pathogens (Septoria, Cercospora)",
      "Prolonged leaf wetness from dew, rain, or irrigation",
      "Overcrowded planting reducing air flow",
      "Infected plant debris left in the field"
    ],
    resources: [
      {
        title: "Organic Neem Oil Concentrate",
        url: "https://www.amazon.com/s?k=neem+oil+concentrate"
      },
      {
        title: "Copper-Based Fungicide Spray",
        url: "https://www.amazon.com/s?k=copper+spray+fungicide"
      },
      {
        title: "Drip Irrigation System Kit",
        url: "https://www.amazon.com/s?k=drip+irrigation+kit"
      }
    ]
  },
  {
    name: "Powdery Mildew",
    confidence: 85.2,
    severity: "Medium",
    recommendations: [
      "Spray with sulfur or potassium bicarbonate solution",
      "Increase spacing between plants",
      "Remove heavily infected leaves",
      "Ensure good air circulation and sunlight exposure"
    ],
    causes: [
      "Fungal pathogen thrives in moderate temperatures and dry conditions",
      "High humidity at night followed by dry, warm days",
      "Shaded areas with poor air circulation",
      "Stressed plants from water or nutrient deficiency"
    ],
    resources: [
      {
        title: "Sulfur Dust Fungicide for Powdery Mildew",
        url: "https://www.amazon.com/s?k=sulfur+dust+fungicide"
      },
      {
        title: "Potassium Bicarbonate Spray",
        url: "https://www.amazon.com/s?k=potassium+bicarbonate+spray"
      },
      {
        title: "Garden Spacing Stakes & Ties",
        url: "https://www.amazon.com/s?k=plant+spacing+stakes"
      }
    ]
  },
  {
    name: "Bacterial Wilt",
    confidence: 90.1,
    severity: "High",
    recommendations: [
      "Remove and destroy infected plants immediately",
      "Do not compost diseased material",
      "Disinfect tools after use",
      "Practice crop rotation with non-host plants",
      "Control cucumber beetles which spread the disease"
    ],
    causes: [
      "Erwinia tracheiphila bacteria spread by cucumber beetles",
      "Bacteria multiply and block water-conducting vessels",
      "Infected beetles feeding on healthy plants",
      "No cure once plant is infected"
    ],
    resources: [
      {
        title: "Cucumber Beetle Traps",
        url: "https://www.amazon.com/s?k=cucumber+beetle+trap"
      },
      {
        title: "Insecticidal Soap for Beetle Control",
        url: "https://www.amazon.com/s?k=insecticidal+soap"
      },
      {
        title: "Tool Disinfectant Spray",
        url: "https://www.amazon.com/s?k=garden+tool+disinfectant"
      }
    ]
  },
  {
    name: "Mosaic Virus",
    confidence: 83.7,
    severity: "High",
    recommendations: [
      "Remove and destroy infected plants",
      "Control aphids which transmit the virus",
      "Wash hands and tools after handling infected plants",
      "Plant resistant varieties in future seasons",
      "Remove weeds that may harbor the virus"
    ],
    causes: [
      "Viral infection transmitted by aphids and other insects",
      "Mechanical transmission through contaminated tools",
      "Infected seeds or transplants",
      "Weeds serving as virus reservoir hosts"
    ],
    resources: [
      {
        title: "Aphid Control Spray",
        url: "https://www.amazon.com/s?k=aphid+spray"
      },
      {
        title: "Yellow Sticky Traps for Aphids",
        url: "https://www.amazon.com/s?k=yellow+sticky+traps"
      },
      {
        title: "Disease-Resistant Seed Varieties",
        url: "https://www.amazon.com/s?k=disease+resistant+tomato+seeds"
      }
    ]
  },
  {
    name: "Healthy",
    confidence: 95.0,
    severity: "Low",
    recommendations: [
      "Continue current care practices",
      "Monitor plants regularly for any changes",
      "Maintain proper watering and fertilization",
      "Ensure good air circulation and sunlight"
    ],
    causes: [
      "No disease detected - plant appears healthy"
    ],
    resources: [
      {
        title: "All-Purpose Plant Fertilizer",
        url: "https://www.amazon.com/s?k=plant+fertilizer"
      },
      {
        title: "Soil pH Test Kit",
        url: "https://www.amazon.com/s?k=soil+ph+test+kit"
      },
      {
        title: "Garden Moisture Meter",
        url: "https://www.amazon.com/s?k=soil+moisture+meter"
      }
    ]
  }
];

function validateImageData(imageData: string): boolean {
  if (!imageData || typeof imageData !== 'string') return false;
  if (imageData.length < 100) return false;
  if (imageData.length > 10000000) return false;
  if (!imageData.startsWith('data:image/')) return false;
  return true;
}

function sanitizeCropType(cropType: string): string {
  const validCropTypes = ['Tomato', 'Potato', 'Pepper', 'Cucumber', 'Wheat', 'Rice', 'Corn', 'Bean', 'Other'];
  const sanitized = cropType.trim();
  return validCropTypes.includes(sanitized) ? sanitized : 'Other';
}

const CONFIDENCE_THRESHOLD = 70;
const HEALTHY_BIAS = 0.40;

function simulateDiseaseClassification(cropType: string): Disease | null {
  const randomValue = Math.random();

  if (randomValue < HEALTHY_BIAS) {
    const healthyDisease = mockDiseases[6];
    const confidenceVariation = (Math.random() * 10) - 3;
    const confidence = Math.min(96, Math.max(82, 88 + confidenceVariation));

    return {
      ...healthyDisease,
      confidence
    };
  }

  const cropSpecificWeights = {
    'Tomato': [0, 1, 2, 3],
    'Potato': [0, 1],
    'Pepper': [2, 3],
    'Cucumber': [2, 4],
    'default': [0, 1, 2, 3, 4, 5]
  };

  const weights = cropSpecificWeights[cropType as keyof typeof cropSpecificWeights] || cropSpecificWeights.default;
  const randomIndex = weights[Math.floor(Math.random() * weights.length)];
  const disease = mockDiseases[randomIndex];
  const confidenceVariation = (Math.random() * 16) - 8;
  let confidence = Math.min(93, Math.max(70, disease.confidence + confidenceVariation));

  if (confidence < CONFIDENCE_THRESHOLD) {
    return null;
  }

  return {
    ...disease,
    confidence
  };
}

async function checkRateLimit(supabase: any, sessionId: string): Promise<boolean> {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from('disease_classifications')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .gte('created_at', fiveMinutesAgo);

  return (count || 0) < 10;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    const { imageData, cropType = "Other", sessionId } = body as ClassificationRequest & { sessionId?: string };

    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "Image data is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!validateImageData(imageData)) {
      return new Response(
        JSON.stringify({ error: "Invalid image data format or size" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const sanitizedCropType = sanitizeCropType(cropType);

    if (sessionId) {
      const withinLimit = await checkRateLimit(supabase, sessionId);
      if (!withinLimit) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a few minutes." }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
    }

    const classification = simulateDiseaseClassification(sanitizedCropType);

    if (!classification) {
      return new Response(
        JSON.stringify({
          error: "Unable to classify with sufficient confidence. Please try with a clearer image of the affected plant part.",
          lowConfidence: true
        }),
        {
          status: 422,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const ipAddress = req.headers.get("x-forwarded-for") || "unknown";
    const ipHash = ipAddress !== "unknown"
      ? await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ipAddress))
        .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(''))
      : null;

    const { data, error } = await supabase
      .from("disease_classifications")
      .insert({
        crop_type: sanitizedCropType,
        disease_name: classification.name,
        confidence_level: classification.confidence,
        recommendations: classification.recommendations.join("\n"),
        severity: classification.severity,
        causes: classification.causes.join("\n"),
        resources: JSON.stringify(classification.resources),
        image_data: imageData.substring(0, 1000),
        session_id: sessionId || null,
        ip_hash: ipHash,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        id: data.id,
        disease: classification.name,
        confidence: classification.confidence,
        severity: classification.severity,
        recommendations: classification.recommendations,
        causes: classification.causes,
        resources: classification.resources,
        cropType: sanitizedCropType,
        timestamp: data.created_at
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
