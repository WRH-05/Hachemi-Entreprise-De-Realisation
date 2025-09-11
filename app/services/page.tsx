import { Building, PenTool, Hammer, Construction, Paintbrush, Wrench, Ruler, Shield } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Building,
      title: "Building Construction",
      description:
        "Specializing in residential and commercial construction projects, from modern homes to office complexes. Our team ensures precision in every detail, using premium materials and innovative building techniques.",
      features: ["Custom home construction", "Commercial buildings", "Industrial facilities", "Project management"],
    },
    {
      icon: PenTool,
      title: "Architectural Planning",
      description:
        "Comprehensive architectural planning services that transform your vision into detailed blueprints. We combine functionality with aesthetic appeal to create spaces that inspire.",
      features: ["3D modeling", "Blueprint development", "Site analysis", "Permit assistance"],
    },
    {
      icon: Hammer,
      title: "Demolition Services",
      description:
        "Professional demolition services with a focus on safety and efficiency. We handle projects of all sizes while ensuring minimal environmental impact.",
      features: ["Structural demolition", "Interior demolition", "Site clearing", "Waste management"],
    },
    {
      icon: Construction,
      title: "Concrete Works",
      description:
        "Expert concrete solutions for foundations, structures, and decorative elements. Our specialized team delivers durable and precise concrete work.",
      features: ["Foundation work", "Structural concrete", "Decorative concrete", "Repairs and restoration"],
    },
    {
      icon: Paintbrush,
      title: "Renovation",
      description:
        "Complete renovation services to modernize and enhance your property. We breathe new life into existing structures while maintaining their character.",
      features: ["Interior renovation", "Exterior updates", "Kitchen & bath remodeling", "Space optimization"],
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description:
        "Comprehensive maintenance services to keep your property in perfect condition. Regular upkeep prevents costly repairs and extends building life.",
      features: ["Preventive maintenance", "Emergency repairs", "System upgrades", "Regular inspections"],
    },
    {
      icon: Ruler,
      title: "Custom Projects",
      description:
        "Specialized construction projects tailored to your unique requirements. We handle complex and custom builds with expertise.",
      features: ["Custom designs", "Specialized structures", "Unique solutions", "Expert consultation"],
    },
    {
      icon: Shield,
      title: "Safety & Compliance",
      description:
        "Ensuring all construction work meets or exceeds safety standards and building codes. Your safety is our priority.",
      features: ["Code compliance", "Safety inspections", "Quality assurance", "Documentation"],
    },
  ]

  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Comprehensive construction solutions tailored to your needs. We bring expertise, innovation, and dedication to
          every project.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
