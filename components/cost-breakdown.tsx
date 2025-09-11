"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { useLanguage } from "@/contexts/language-context"

interface CostBreakdownProps {
  result: any
}

export function CostBreakdown({ result }: CostBreakdownProps) {
  const { translations: t } = useLanguage()
  const { breakdown, totalCost, comparisons } = result

  const formatter = new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  })

  // Create pie chart data from the breakdown, filtering out zero values
  const pieData = [
    { name: "Base Construction", value: breakdown.baseConstructionCost, color: "#153276" },
    { name: "Structure", value: breakdown.structureCost, color: "#2563eb" },
    { name: "Foundation", value: breakdown.foundationCost, color: "#3b82f6" },
    { name: "Flooring", value: breakdown.flooringCost, color: "#60a5fa" },
    { name: "Wall Finish", value: breakdown.wallFinishCost, color: "#93c5fd" },
    { name: "Windows", value: breakdown.windowCost, color: "#bfdbfe" },
    { name: "Exterior Finish", value: breakdown.exteriorFinishCost, color: "#dbeafe" },
    { name: "Elevator", value: breakdown.elevatorCost, color: "#eff6ff" },
    { name: "Insulation", value: breakdown.insulationCost, color: "#1e40af" },
    { name: "Garden", value: breakdown.gardenCost, color: "#1d4ed8" },
    { name: "Fence", value: breakdown.fenceCost, color: "#2563eb" },
    { name: "Electrical", value: breakdown.electricalCost, color: "#3b82f6" },
    { name: "Plumbing", value: breakdown.plumbingCost, color: "#60a5fa" },
    { name: "License", value: breakdown.licenseCost, color: "#93c5fd" },
    { name: "Connection Fees", value: breakdown.connectionFees, color: "#bfdbfe" },
    { name: "Insurance", value: breakdown.insuranceCost, color: "#dbeafe" },
    { name: "Floor Adjustment", value: breakdown.floorAdjustment, color: "#eff6ff" },
  ].filter((item) => item.value > 0)

  const comparisonData = [
    { name: "House", value: comparisons.house },
    { name: "Villa", value: comparisons.villa },
    { name: "Building", value: comparisons.building },
  ]

  // Group costs into categories for better visualization
  const costCategories = [
    {
      title: "Structure & Foundation",
      items: [
        { label: "Base Construction", value: breakdown.baseConstructionCost },
        { label: "Structure", value: breakdown.structureCost },
        { label: "Foundation", value: breakdown.foundationCost },
      ],
    },
    {
      title: "Finishing",
      items: [
        { label: "Flooring", value: breakdown.flooringCost },
        { label: "Wall Finish", value: breakdown.wallFinishCost },
        { label: "Windows", value: breakdown.windowCost },
        { label: "Exterior Finish", value: breakdown.exteriorFinishCost },
      ],
    },
    {
      title: "Additional Features",
      items: [
        { label: "Elevator", value: breakdown.elevatorCost },
        { label: "Thermal Insulation", value: breakdown.insulationCost },
        { label: "Garden", value: breakdown.gardenCost },
        { label: "Fence", value: breakdown.fenceCost },
      ],
    },
    {
      title: "Utilities & Services",
      items: [
        { label: "Electrical Work", value: breakdown.electricalCost },
        { label: "Plumbing Work", value: breakdown.plumbingCost },
      ],
    },
    {
      title: "Administrative & Other",
      items: [
        { label: "Construction License", value: breakdown.licenseCost },
        { label: "Connection Fees", value: breakdown.connectionFees },
        { label: "Insurance", value: breakdown.insuranceCost },
        { label: "Floor Adjustment", value: breakdown.floorAdjustment },
      ],
    },
  ]

  return (
    <Tabs defaultValue="breakdown">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="breakdown" className="text-xs md:text-sm">
          {t.calculator?.breakdown.costBreakdown || "Cost Breakdown"}
        </TabsTrigger>
        <TabsTrigger value="chart" className="text-xs md:text-sm">
          {t.calculator?.breakdown.visualChart || "Visual Chart"}
        </TabsTrigger>
        <TabsTrigger value="comparison" className="text-xs md:text-sm">
          {t.calculator?.breakdown.typeComparison || "Type Comparison"}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="breakdown" className="space-y-3 md:space-y-4 pt-3 md:pt-4">
        {costCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-4 md:mb-6">
            <h3 className="font-medium text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
              {t.calculator?.breakdown[category.title.toLowerCase().replace(/\s+/g, "")] || category.title}
            </h3>
            {category.items.map((item, index) =>
              item.value > 0 ? (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs md:text-sm font-medium">
                      {t.calculator?.breakdown[item.label.toLowerCase().replace(/\s+/g, "")] || item.label}
                    </span>
                    <span className="text-xs md:text-sm font-medium">{formatter.format(item.value)}</span>
                  </div>
                  <Progress value={(item.value / totalCost) * 100} className="h-1.5 md:h-2" />
                </div>
              ) : null,
            )}
            {categoryIndex < costCategories.length - 1 && <Separator className="my-3 md:my-4" />}
          </div>
        ))}

        <Separator className="my-3 md:my-4" />

        <div className="flex justify-between font-bold">
          <span>{t.calculator?.breakdown.totalCost || "Total Cost"}</span>
          <span>{formatter.format(totalCost)}</span>
        </div>
      </TabsContent>

      <TabsContent value="chart" className="pt-3 md:pt-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="h-[300px] md:h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatter.format(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="comparison" className="pt-3 md:pt-4">
        <Card>
          <CardContent className="pt-4 md:pt-6">
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatter.format(value).split(".")[0]} />
                  <Tooltip formatter={(value) => formatter.format(value as number)} />
                  <Bar dataKey="value" fill="#153276" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs md:text-sm text-gray-500">
                {t.calculator?.breakdown.comparisonDesc ||
                  "This chart compares the total cost of your project with different construction types."}
              </p>
              <ul className="text-xs md:text-sm space-y-1">
                <li>
                  <span className="font-medium">House:</span>{" "}
                  {t.calculator?.breakdown.house || "Standard residential construction (60,000 DZD/m²)"}
                </li>
                <li>
                  <span className="font-medium">Villa:</span>{" "}
                  {t.calculator?.breakdown.villa || "Higher quality residential construction (80,000 DZD/m²)"}
                </li>
                <li>
                  <span className="font-medium">Building:</span>{" "}
                  {t.calculator?.breakdown.building || "Commercial or multi-unit construction (100,000 DZD/m²)"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
