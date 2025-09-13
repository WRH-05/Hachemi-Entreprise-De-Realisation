"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { calculateConstructionCost } from "@/lib/cost-calculator"
import { CostBreakdown } from "@/components/cost-breakdown"
import { FinancingCalculator } from "@/components/financing-calculator"
import { ContractorRequest } from "@/components/contractor-request"
import { Download, Calculator, Building, ArrowRight, Loader2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import jsPDF from "jspdf"

const formSchema = z.object({
  area: z.coerce
    .number()
    .min(10, "Area must be at least 10 square meters")
    .max(500, "Maximum area is 500 square meters"),
  floors: z.coerce.number().min(1, "Number of floors must be at least 1").max(3, "Maximum number of floors is 3"),
  constructionType: z.enum(["house", "villa", "building"]),
  structureType: z.enum(["reinforcedConcrete", "metalStructure", "traditionalBrick"]),
  foundationType: z.enum(["separateFootings", "concreteMasonry", "piles"]),
  flooringType: z.enum(["ceramic", "porcelain", "marble", "woodParquet", "epoxy"]),
  wallFinishType: z.enum(["basicPaint", "premiumPaint", "wallpaper", "gypsumDecor"]),
  windowType: z.enum(["aluminum", "doubleGlazed"]),
  exteriorFinishType: z.enum(["naturalStone", "ceramicTiles", "cementCoating"]),
  includeGarden: z.boolean().default(false),
  includeFence: z.boolean().default(false),
  elevator: z.boolean().default(false),
  thermalInsulation: z.boolean().default(false),
  financing: z.boolean().default(false),
})

export default function CostCalculatorPage() {
  const { translations: t } = useLanguage()
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("calculator")
  const [isPdfLoading, setIsPdfLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 100,
      floors: 1,
      constructionType: "house",
      structureType: "reinforcedConcrete",
      foundationType: "separateFootings",
      flooringType: "ceramic",
      wallFinishType: "basicPaint",
      windowType: "aluminum",
      exteriorFinishType: "cementCoating",
      includeGarden: false,
      includeFence: false,
      elevator: false,
      thermalInsulation: false,
      financing: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = calculateConstructionCost(values)
    setCalculationResult(result)
    if (values.financing) {
      setActiveTab("financing")
    } else {
      setActiveTab("results")
    }
  }

  const handleDownloadPDF = async () => {
    try {
      setIsPdfLoading(true)

      // Create a new PDF document
      const doc = new jsPDF()
      const formatter = new Intl.NumberFormat("fr-DZ", {
        style: "currency",
        currency: "DZD",
        maximumFractionDigits: 0,
      })

      // Add title and header
      doc.setFontSize(20)
      doc.setTextColor(21, 50, 118) // Primary color
      doc.text("Construction Cost Estimate", 105, 20, { align: "center" })

      doc.setFontSize(12)
      doc.setTextColor(100, 100, 100)
      doc.text("Generated on: " + new Date().toLocaleDateString(), 105, 30, { align: "center" })

      // Add total cost
      doc.setFontSize(16)
      doc.setTextColor(21, 50, 118)
      doc.text("Total Estimated Cost:", 20, 50)
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.text(formatter.format(calculationResult.totalCost), 105, 50)

      // Add project details
      doc.setFontSize(14)
      doc.setTextColor(21, 50, 118)
      doc.text("Project Details", 20, 70)

      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      doc.text(`Area: ${calculationResult.inputs.area} m²`, 20, 80)
      doc.text(`Floors: ${calculationResult.inputs.floors}`, 20, 90)
      doc.text(`Construction Type: ${calculationResult.inputs.constructionType}`, 20, 100)
      doc.text(`Structure Type: ${calculationResult.inputs.structureType}`, 20, 110)

      // Add cost breakdown
      doc.setFontSize(14)
      doc.setTextColor(21, 50, 118)
      doc.text("Cost Breakdown", 20, 130)

      doc.setFontSize(10)
      doc.setTextColor(0, 0, 0)
      let y = 140
      const breakdown = calculationResult.breakdown

      // Create a table-like structure for the breakdown
      const addBreakdownItem = (label, value) => {
        if (value > 0) {
          doc.text(label, 20, y)
          doc.text(formatter.format(value), 120, y, { align: "right" })
          y += 8
        }
      }

      addBreakdownItem("Base Construction", breakdown.baseConstructionCost)
      addBreakdownItem("Structure", breakdown.structureCost)
      addBreakdownItem("Foundation", breakdown.foundationCost)
      addBreakdownItem("Flooring", breakdown.flooringCost)
      addBreakdownItem("Wall Finish", breakdown.wallFinishCost)
      addBreakdownItem("Windows", breakdown.windowCost)
      addBreakdownItem("Exterior Finish", breakdown.exteriorFinishCost)
      addBreakdownItem("Elevator", breakdown.elevatorCost)
      addBreakdownItem("Thermal Insulation", breakdown.insulationCost)
      addBreakdownItem("Garden", breakdown.gardenCost)
      addBreakdownItem("Fence", breakdown.fenceCost)
      addBreakdownItem("Electrical Work", breakdown.electricalCost)
      addBreakdownItem("Plumbing Work", breakdown.plumbingCost)
      addBreakdownItem("License", breakdown.licenseCost)
      addBreakdownItem("Connection Fees", breakdown.connectionFees)
      addBreakdownItem("Insurance", breakdown.insuranceCost)

      // Add a separator line
      doc.setDrawColor(200, 200, 200)
      doc.line(20, y, 190, y)
      y += 10

      // Add total again at the bottom
      doc.setFontSize(12)
      doc.setTextColor(21, 50, 118)
      doc.text("Total Cost:", 20, y)
      doc.text(formatter.format(calculationResult.totalCost), 120, y, { align: "right" })

      // Add footer
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text("Generated by HER Construction Cost Calculator", 105, 280, { align: "center" })
      doc.text("For more information, contact us at hachemibat@gmail.com", 105, 285, { align: "center" })

      // Save the PDF
      doc.save("construction-cost-estimate.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsPdfLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-white">
              {t.calculator?.title || "Construction Cost Calculator"}
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
              {t.calculator?.subtitle ||
                "Get an accurate estimate of your construction project costs based on your specific requirements and preferences."}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                <Calculator className="h-3 w-3 md:h-4 md:w-4" />
                <span>{t.calculator?.tabs.calculator || "Calculator"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="results"
                disabled={!calculationResult}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <Building className="h-3 w-3 md:h-4 md:w-4" />
                <span>{t.calculator?.tabs.results || "Results"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="financing"
                disabled={!calculationResult}
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              >
                <Download className="h-3 w-3 md:h-4 md:w-4" />
                <span>{t.calculator?.tabs.financing || "Financing"}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl">
                    {t.calculator?.form.projectDetails || "Project Details"}
                  </CardTitle>
                  <CardDescription>
                    {t.calculator?.form.projectDetailsDesc ||
                      "Enter the details of your construction project to get a cost estimate."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.area || "Area (m²)"}</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="100" {...field} />
                              </FormControl>
                              <FormDescription className="text-xs">
                                {t.calculator?.form.areaDesc || "Total construction area in square meters (10-500)"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="floors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.floors || "Number of Floors"}</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="1" {...field} />
                              </FormControl>
                              <FormDescription className="text-xs">
                                {t.calculator?.form.floorsDesc || "Total number of floors (1-3)"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="my-3 md:my-4" />
                      <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                        {t.calculator?.form.constructionSpecs || "Construction Specifications"}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="constructionType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.constructionType || "Construction Type"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={
                                        t.calculator?.form.selectConstructionType || "Select construction type"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="house">
                                    {t.calculator?.options.house || "House (60,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="villa">
                                    {t.calculator?.options.villa || "Villa (80,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="building">
                                    {t.calculator?.options.building || "Building (100,000 DZD/m²)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.constructionTypeDesc || "Type of construction project"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="structureType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.structureType || "Structure Type"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectStructureType || "Select structure type"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="reinforcedConcrete">
                                    {t.calculator?.options.reinforcedConcrete || "Reinforced Concrete (70,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="metalStructure">
                                    {t.calculator?.options.metalStructure || "Metal Structure (85,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="traditionalBrick">
                                    {t.calculator?.options.traditionalBrick || "Traditional Brick (60,000 DZD/m²)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.structureTypeDesc || "Primary structure material"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="foundationType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.foundationType || "Foundation Type"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectFoundationType || "Select foundation type"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="separateFootings">
                                    {t.calculator?.options.separateFootings || "Separate Footings (12,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="concreteMasonry">
                                    {t.calculator?.options.concreteMasonry || "Concrete Masonry (18,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="piles">
                                    {t.calculator?.options.piles || "Piles (30,000 DZD/linear meter)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.foundationTypeDesc || "Type of foundation"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="thermalInsulation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  {t.calculator?.form.thermalInsulation || "Foundation Thermal Insulation"}
                                </FormLabel>
                                <FormDescription>
                                  {t.calculator?.form.thermalInsulationDesc || "Add thermal insulation (1,500 DZD/m²)"}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="my-4" />
                      <h3 className="text-lg font-medium mb-4">
                        {t.calculator?.form.finishingSpecs || "Finishing Specifications"}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="flooringType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.flooringType || "Flooring Type"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectFlooringType || "Select flooring type"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="ceramic">
                                    {t.calculator?.options.ceramic || "Ceramic (3,500-7,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="porcelain">
                                    {t.calculator?.options.porcelain || "Porcelain (8,000-15,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="marble">
                                    {t.calculator?.options.marble || "Marble (20,000-50,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="woodParquet">
                                    {t.calculator?.options.woodParquet || "Wooden Parquet (10,000-25,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="epoxy">
                                    {t.calculator?.options.epoxy || "Epoxy (15,000 DZD/m²)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.flooringTypeDesc || "Type of flooring material"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="wallFinishType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.wallFinishType || "Wall Finish"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectWallFinish || "Select wall finish"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="basicPaint">
                                    {t.calculator?.options.basicPaint || "Basic Paint (1,500-3,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="premiumPaint">
                                    {t.calculator?.options.premiumPaint || "Premium Paint (3,000-5,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="wallpaper">
                                    {t.calculator?.options.wallpaper || "Wallpaper (4,000-10,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="gypsumDecor">
                                    {t.calculator?.options.gypsumDecor || "Gypsum Decorations (8,000-20,000 DZD/m²)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.wallFinishTypeDesc || "Type of wall finishing"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="windowType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.windowType || "Window Type"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectWindowType || "Select window type"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="aluminum">
                                    {t.calculator?.options.aluminum || "Aluminum (40,000-120,000 DZD/window)"}
                                  </SelectItem>
                                  <SelectItem value="doubleGlazed">
                                    {t.calculator?.options.doubleGlazed || "Double-Glazed (80,000-200,000 DZD/window)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.windowTypeDesc || "Type of windows"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="exteriorFinishType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.calculator?.form.exteriorFinishType || "Exterior Finish"}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t.calculator?.form.selectExteriorFinish || "Select exterior finish"}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="naturalStone">
                                    {t.calculator?.options.naturalStone || "Natural Stone (20,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="ceramicTiles">
                                    {t.calculator?.options.ceramicTiles || "Ceramic Tiles (10,000 DZD/m²)"}
                                  </SelectItem>
                                  <SelectItem value="cementCoating">
                                    {t.calculator?.options.cementCoating || "Cement Coating (3,000 DZD/m²)"}
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                {t.calculator?.form.exteriorFinishTypeDesc || "Type of exterior facade finish"}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="my-4" />
                      <h3 className="text-lg font-medium mb-4">
                        {t.calculator?.form.additionalFeatures || "Additional Features"}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="elevator"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{t.calculator?.form.elevator || "Elevator"}</FormLabel>
                                <FormDescription>
                                  {t.calculator?.form.elevatorDesc || "Add elevator (1,500,000 DZD per floor)"}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="includeGarden"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{t.calculator?.form.garden || "Garden"}</FormLabel>
                                <FormDescription>
                                  {t.calculator?.form.gardenDesc || "Include garden landscaping (2,500 DZD/m²)"}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="includeFence"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>{t.calculator?.form.concreteFence || "Concrete Fence"}</FormLabel>
                                <FormDescription>
                                  {t.calculator?.form.concreteFenceDesc ||
                                    "Add concrete fence (15,000 DZD/linear meter)"}
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator className="my-4" />

                      <FormField
                        control={form.control}
                        name="financing"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                {t.calculator?.form.financingOptions || "I'm interested in bank financing options"}
                              </FormLabel>
                              <FormDescription>
                                {t.calculator?.form.financingOptionsDesc ||
                                  "We'll show you available financing options based on your project cost"}
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        {t.calculator?.form.calculate || "Calculate Cost"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              {calculationResult && (
                <div className="space-y-6 md:space-y-8">
                  <Card>
                    <CardHeader className="p-4 md:p-6">
                      <CardTitle className="text-xl md:text-2xl">
                        {t.calculator?.results.title || "Cost Estimate Results"}
                      </CardTitle>
                      <CardDescription>
                        {t.calculator?.results.subtitle ||
                          "Based on your inputs, here's the estimated cost for your construction project"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                      <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">
                          {new Intl.NumberFormat("fr-DZ", {
                            style: "currency",
                            currency: "DZD",
                            maximumFractionDigits: 0,
                          }).format(calculationResult.totalCost)}
                        </h2>
                        <p className="text-gray-500">{t.calculator?.results.totalCost || "Total Estimated Cost"}</p>
                      </div>

                      <CostBreakdown result={calculationResult} />
                    </CardContent>
                    <CardFooter className="p-4 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-4 justify-between">
                      <Button
                        variant="outline"
                        onClick={handleDownloadPDF}
                        className="w-full sm:w-auto"
                        disabled={isPdfLoading}
                      >
                        {isPdfLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating PDF...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            {t.calculator?.results.downloadPDF || "Download PDF Report"}
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setActiveTab("financing")}
                        className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                      >
                        {t.calculator?.results.exploreFinancing || "Explore Financing Options"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>

                  <ContractorRequest projectDetails={form.getValues()} estimatedCost={calculationResult.totalCost} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="financing">
              {calculationResult && <FinancingCalculator totalCost={calculationResult.totalCost} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
