"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRight, Calculator, Building } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLanguage } from "@/contexts/language-context"

interface FinancingCalculatorProps {
  totalCost: number
}

export function FinancingCalculator({ totalCost }: FinancingCalculatorProps) {
  const { translations: t } = useLanguage()
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [loanTerm, setLoanTerm] = useState(15)
  const [interestRate, setInterestRate] = useState(5.5)

  const formatter = new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 0,
  })

  const downPaymentAmount = (totalCost * downPaymentPercent) / 100
  const loanAmount = totalCost - downPaymentAmount

  // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n - 1]
  // where P is the monthly payment, L is the loan amount, c is the monthly interest rate, and n is the number of payments
  const monthlyInterestRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12
  const monthlyPayment =
    (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

  const totalInterest = monthlyPayment * numberOfPayments - loanAmount
  const totalPayment = loanAmount + totalInterest

  // Generate amortization data for the chart
  const generateAmortizationData = () => {
    let balance = loanAmount
    const monthlyData = []

    for (let year = 1; year <= loanTerm; year++) {
      let yearlyPrincipal = 0
      let yearlyInterest = 0

      for (let month = 1; month <= 12; month++) {
        const interestPayment = balance * monthlyInterestRate
        const principalPayment = monthlyPayment - interestPayment

        yearlyPrincipal += principalPayment
        yearlyInterest += interestPayment
        balance -= principalPayment
      }

      monthlyData.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(0, balance),
      })
    }

    return monthlyData
  }

  const amortizationData = generateAmortizationData()

  // Updated with the specific Algerian banks mentioned in the document
  const banks = [
    {
      name: "Local Development Bank (BDL)",
      description:
        "Offers construction loans with competitive rates and flexible terms for residential and commercial projects.",
      interestRate: "5.0% - 7.0%",
      term: "Up to 30 years",
      website: "bdl.dz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bdl-logo-RdDzUO3mPJ6b6XPVrFk0KNnXjv0GbR.png",
    },
    {
      name: "Agriculture and Rural Development Bank (BADR)",
      description:
        "Provides financing for construction projects in rural areas with special rates for agricultural-related buildings.",
      interestRate: "5.0% - 6.5%",
      term: "Up to 25 years",
      website: "badr-bank.dz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/badr-logo-0KnSBRo3m7E6XLXLZYX4DWkR4n6wPf.png",
    },
    {
      name: "National Bank of Algeria (BNA)",
      description:
        "Offers comprehensive construction financing solutions with options for both residential and commercial projects.",
      interestRate: "5.5% - 7.0%",
      term: "10 - 30 years",
      website: "bna.dz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bna-logo-WqgC03hLZDOW7hqtW2c6ZtFUC9OfAp.png",
    },
    {
      name: "Crédit Populaire d'Algerie (CPA)",
      description:
        "Provides a real estate loan to finance the construction or expansion of an individual home, covering up to 90% of the construction cost.",
      interestRate: "5.5% - 7.5%",
      term: "Up to 25 years",
      website: "cpa-bank.dz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpa-logo-T3cYOk8wUU6fESGKmNWDlIFr8JnNMX.png",
    },
    {
      name: "Gulf Bank of Algeria (AGB)",
      description:
        "Offers Islamic financing options for construction projects with competitive rates and Sharia-compliant terms.",
      interestRate: "6.0% - 7.5%",
      term: "Up to 20 years",
      website: "agb.dz",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agb-logo-pQ53JuNdZzv0I6BKNC8OCT2RkQ0ZXb.png",
    },
  ]

  return (
    <div className="space-y-6 md:space-y-8">
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-xl md:text-2xl">{t.calculator?.financing.title || "Financing Options"}</CardTitle>
          <CardDescription>
            {t.calculator?.financing.subtitle ||
              "Calculate your monthly payments and explore financing options for your construction project"}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <Tabs defaultValue="calculator">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculator" className="text-xs md:text-sm">
                {t.calculator?.financing.loanCalculator || "Loan Calculator"}
              </TabsTrigger>
              <TabsTrigger value="banks" className="text-xs md:text-sm">
                {t.calculator?.financing.bankOptions || "Bank Options"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-4 md:space-y-6 pt-3 md:pt-4">
              <div className="grid gap-3 md:gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs md:text-sm">
                      {t.calculator?.financing.downPayment || "Down Payment"}: {downPaymentPercent}%
                    </Label>
                    <span className="text-xs md:text-sm text-gray-500">{formatter.format(downPaymentAmount)}</span>
                  </div>
                  <Slider
                    value={[downPaymentPercent]}
                    min={10}
                    max={50}
                    step={5}
                    onValueChange={(value) => setDownPaymentPercent(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs md:text-sm">
                      {t.calculator?.financing.loanTerm || "Loan Term"}: {loanTerm} years
                    </Label>
                  </div>
                  <Slider
                    value={[loanTerm]}
                    min={5}
                    max={30}
                    step={1}
                    onValueChange={(value) => setLoanTerm(value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-xs md:text-sm">
                      {t.calculator?.financing.interestRate || "Interest Rate"}: {interestRate}%
                    </Label>
                  </div>
                  <Slider
                    value={[interestRate]}
                    min={5}
                    max={7.5}
                    step={0.5}
                    onValueChange={(value) => setInterestRate(value[0])}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-2 md:pt-4">
                <Card>
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="text-xs md:text-sm font-medium">
                      {t.calculator?.financing.loanAmount || "Loan Amount"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0 md:pt-0">
                    <div className="text-lg md:text-2xl font-bold">{formatter.format(loanAmount)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="text-xs md:text-sm font-medium">
                      {t.calculator?.financing.monthlyPayment || "Monthly Payment"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0 md:pt-0">
                    <div className="text-lg md:text-2xl font-bold">{formatter.format(monthlyPayment)}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-3 md:p-4">
                    <CardTitle className="text-xs md:text-sm font-medium">
                      {t.calculator?.financing.totalInterest || "Total Interest"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 md:p-4 pt-0 md:pt-0">
                    <div className="text-lg md:text-2xl font-bold">{formatter.format(totalInterest)}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-2 md:pt-4">
                <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">
                  {t.calculator?.financing.amortizationSchedule || "Amortization Schedule"}
                </h3>
                <div className="h-[250px] md:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={amortizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="year"
                        label={{
                          value: t.calculator?.financing.years || "Years",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis tickFormatter={(value) => formatter.format(value).split(".")[0]} />
                      <Tooltip formatter={(value) => formatter.format(value as number)} />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#153276"
                        name={t.calculator?.financing.remainingBalance || "Remaining Balance"}
                      />
                      <Line
                        type="monotone"
                        dataKey="principal"
                        stroke="#3b82f6"
                        name={t.calculator?.financing.principalPaid || "Principal Paid"}
                      />
                      <Line
                        type="monotone"
                        dataKey="interest"
                        stroke="#60a5fa"
                        name={t.calculator?.financing.interestPaid || "Interest Paid"}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="banks" className="space-y-3 md:space-y-4 pt-3 md:pt-4">
              <div className="space-y-3 md:space-y-4">
                {banks.map((bank, index) => (
                  <Card key={index}>
                    <CardHeader className="p-3 md:p-4 pb-1 md:pb-2 flex flex-row items-center gap-3">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 bg-white rounded-md flex items-center justify-center p-1 border">
                        {bank.logo ? (
                          <img
                            src={bank.logo || "/placeholder.svg"}
                            alt={`${bank.name} logo`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <Building className="h-8 w-8 text-primary opacity-70" />
                        )}
                      </div>
                      <CardTitle className="text-base md:text-lg">{bank.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 md:p-4 pb-1 md:pb-2">
                      <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{bank.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                        <div>
                          <span className="font-medium">Interest Rate:</span> {bank.interestRate}
                        </div>
                        <div>
                          <span className="font-medium">Term:</span> {bank.term}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 md:p-4">
                      <Button variant="outline" size="sm" className="w-full text-xs md:text-sm" asChild>
                        <a href={`https://${bank.website}`} target="_blank" rel="noopener noreferrer">
                          {t.calculator?.financing.visitWebsite || "Visit Website"}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="bg-primary/10 p-3 md:p-4 rounded-lg">
                <p className="text-xs md:text-sm">
                  <strong>
                    {t.calculator?.financing.bankNote ? t.calculator?.financing.bankNote.split(":")[0] : "Note"}:
                  </strong>
                  {t.calculator?.financing.bankNote
                    ? ` ${t.calculator?.financing.bankNote.split(":")[1]}`
                    : ` For a loan amount of ${formatter.format(loanAmount)}, your expected monthly installment would be approximately ${formatter.format(monthlyPayment)}. Actual rates and terms may vary based on your credit profile and the bank's current offerings.`}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="p-4 md:p-6 flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button variant="outline" className="w-full sm:w-auto text-xs md:text-sm">
            <Calculator className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            {t.calculator?.financing.recalculate || "Recalculate"}
          </Button>
          <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-xs md:text-sm">
            {t.calculator?.financing.applyFinancing || "Apply for Financing"}
            <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

