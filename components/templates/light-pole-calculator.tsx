"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator } from "lucide-react"

export function LightPoleCalculator() {
  const [inputs, setInputs] = useState({
    // Step 1.A: Light Pole Geometry
    poleHeight: "60.00",
    armsEPA: "1.00",
    poleTopDiameter: "4.0",
    poleBottomDiameter: "4.0",
    luminairesCenterPressure: "26.10",
    armsCenterPressure: "26.00",
    baseHeight: "1.0",
    luminairesEPA: "2",
    baseDiameter: "12.0",

    // Step 2: Wind Force
    gFactor: "0.85",
    cfPole: "0.7",
    category: "B",
    cfArms: "1.0",
    cfLuminaires: "1.0",
    kzt: "1.0",
    kd: "1.0",
    velocity: "150.0",
    importance: "1.0",

    // Foundation
    soilPressure: "100",
    shape: "1.0",
  })

  const [results, setResults] = useState({
    baseShear: "411.98",
    baseMoment: "6132.33",
    foundationDepthNonConstrained: "10.00",
    foundationDepthConstrained: "7.39",
  })

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateResults = () => {
    // In a real application, this would contain the actual engineering calculations
    // For this demo, we'll just simulate updating the results
    setResults({
      baseShear: "411.98",
      baseMoment: "6132.33",
      foundationDepthNonConstrained: "10.00",
      foundationDepthConstrained: "7.39",
    })
  }

  return (
    <Card className="p-6 bg-white">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-4 mb-6 border-b pb-4">
        <div className="space-y-2">
          <div className="flex">
            <Label className="w-20">Project:</Label>
            <Input className="h-8" />
          </div>
          <div className="flex">
            <Label className="w-20">Project No.:</Label>
            <Input className="h-8" />
          </div>
          <div className="flex">
            <Label className="w-20">Description:</Label>
            <Input className="h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex">
            <Label className="w-20">Engineer:</Label>
            <Input className="h-8" />
          </div>
          <div className="flex">
            <Label className="w-20">Tab No.:</Label>
            <Input className="h-8" />
          </div>
          <div className="flex">
            <Label className="w-20">Sheet No.:</Label>
            <Input className="h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex">
            <Label className="w-20">Date:</Label>
            <Input className="h-8" type="date" />
          </div>
          <div className="flex">
            <Label className="w-20">Dwg. Ref.:</Label>
            <Input className="h-8" />
          </div>
        </div>
      </div>

      {/* Step 1.A: Light Pole Geometry */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 bg-gray-100 p-2">
          STEP 1.A: Light Pole Geometry (Input the data in yellow cells)
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="w-40">Top of Pole:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.poleHeight}
                onChange={(e) => handleInputChange("poleHeight", e.target.value)}
              />
              <span className="ml-2">ft</span>
            </div>

            <div className="flex items-center">
              <Label className="w-40">Arms E.P.A:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.armsEPA}
                onChange={(e) => handleInputChange("armsEPA", e.target.value)}
              />
              <span className="ml-2">ft²</span>
            </div>

            <div className="flex items-center">
              <Label className="w-40">Pole Top Diameter:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.poleTopDiameter}
                onChange={(e) => handleInputChange("poleTopDiameter", e.target.value)}
              />
              <span className="ml-2">in</span>
            </div>

            <div className="flex items-center">
              <Label className="w-40">Pole Bottom Diameter:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.poleBottomDiameter}
                onChange={(e) => handleInputChange("poleBottomDiameter", e.target.value)}
              />
              <span className="ml-2">in</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="w-64">Center of Pressure on Luminaires:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.luminairesCenterPressure}
                onChange={(e) => handleInputChange("luminairesCenterPressure", e.target.value)}
              />
              <span className="ml-2">ft</span>
            </div>

            <div className="flex items-center">
              <Label className="w-64">Center of Pressure on Arms:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.armsCenterPressure}
                onChange={(e) => handleInputChange("armsCenterPressure", e.target.value)}
              />
              <span className="ml-2">ft</span>
            </div>

            <div className="flex items-center">
              <Label className="w-64">Base Height:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.baseHeight}
                onChange={(e) => handleInputChange("baseHeight", e.target.value)}
              />
              <span className="ml-2">ft</span>
            </div>

            <div className="flex items-center">
              <Label className="w-64">Luminaires E.P.A = A×B =</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.luminairesEPA}
                onChange={(e) => handleInputChange("luminairesEPA", e.target.value)}
              />
              <span className="ml-2">ft²</span>
            </div>

            <div className="flex items-center">
              <Label className="w-64">Base Diameter/Width:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.baseDiameter}
                onChange={(e) => handleInputChange("baseDiameter", e.target.value)}
              />
              <span className="ml-2">in</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Wind Force */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 bg-gray-100 p-2">
          Step 2: Wind Force (Input the data in yellow cells) P = qz*G*Cf*Af (ASCE 7-05 Eq. 6-28)
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="w-24">G:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.gFactor}
                onChange={(e) => handleInputChange("gFactor", e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Label className="w-24">Cf (Pole):</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.cfPole}
                onChange={(e) => handleInputChange("cfPole", e.target.value)}
              />
              <span className="ml-2 text-sm">(different for round or square)</span>
            </div>

            <div className="flex items-center">
              <Label className="w-24">Cf (Arms):</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.cfArms}
                onChange={(e) => handleInputChange("cfArms", e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Label className="w-24">Cf (Luminaires):</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.cfLuminaires}
                onChange={(e) => handleInputChange("cfLuminaires", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Label className="w-40">Category:</Label>
              <Select value={inputs.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="w-24 h-8 bg-yellow-100">
                  <SelectValue placeholder="B" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <Label className="w-40">Exposure Category:</Label>
              <Select value={inputs.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="w-24 h-8 bg-yellow-100">
                  <SelectValue placeholder="B" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center">
              <Label className="w-40">Kzt:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.kzt}
                onChange={(e) => handleInputChange("kzt", e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Label className="w-40">Kd:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.kd}
                onChange={(e) => handleInputChange("kd", e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Label className="w-40">V:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.velocity}
                onChange={(e) => handleInputChange("velocity", e.target.value)}
              />
              <span className="ml-2">mph</span>
            </div>

            <div className="flex items-center">
              <Label className="w-40">I:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.importance}
                onChange={(e) => handleInputChange("importance", e.target.value)}
              />
              <span className="ml-2 text-sm">Table 6-1A</span>
            </div>
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="font-bold mb-2">Height vs Kz Table</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 border">Height</th>
                  <th className="p-1 border">Kz</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1 border">15</td>
                  <td className="p-1 border">0.70</td>
                </tr>
                <tr>
                  <td className="p-1 border">20</td>
                  <td className="p-1 border">0.70</td>
                </tr>
                <tr>
                  <td className="p-1 border">25</td>
                  <td className="p-1 border">0.70</td>
                </tr>
                <tr>
                  <td className="p-1 border">30</td>
                  <td className="p-1 border">0.70</td>
                </tr>
                <tr>
                  <td className="p-1 border">40</td>
                  <td className="p-1 border">0.76</td>
                </tr>
                <tr>
                  <td className="p-1 border">50</td>
                  <td className="p-1 border">0.81</td>
                </tr>
                <tr>
                  <td className="p-1 border">60</td>
                  <td className="p-1 border">0.85</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Foundation Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4 bg-gray-100 p-2">Foundation Depth</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="mb-2 text-sm">
              d₂ = 0.5A{"{1+[1+(4.36h/A)]¹/²}"} (IB 203 Eq. 18-1 for nonconstrained condition)
            </p>
            <p className="mb-4 text-sm">d₂ = 4.25*Mg/(S₃*b) (IB 2003 Eq. 18-2 for nonconstrained condition)</p>

            <div className="flex items-center mb-4">
              <Label className="w-40">S:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.soilPressure}
                onChange={(e) => handleInputChange("soilPressure", e.target.value)}
              />
              <span className="ml-2">psf/ft</span>
            </div>

            <div className="flex items-center mb-4">
              <Label className="w-40">Shape:</Label>
              <Input
                className="w-24 h-8 bg-yellow-100"
                value={inputs.shape}
                onChange={(e) => handleInputChange("shape", e.target.value)}
              />
              <span className="ml-2 text-sm">enter 1 for round, 2 for square</span>
            </div>
          </div>

          <div className="border p-4 rounded-md">
            <h3 className="font-bold mb-4">Calculation Results</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Label className="w-32">BASE SHEAR:</Label>
                <Input className="w-24 h-8 bg-gray-100" value={results.baseShear} readOnly />
                <span className="ml-2">(lbs)</span>
              </div>

              <div className="flex items-center">
                <Label className="w-32">BASE MOMENT:</Label>
                <Input className="w-24 h-8 bg-gray-100" value={results.baseMoment} readOnly />
                <span className="ml-2">(ft-lbs)</span>
              </div>
            </div>

            <h4 className="font-bold mt-4 mb-2">Foundation Depth:</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Label className="w-32">Nonconstrained:</Label>
                <Input className="w-24 h-8 bg-gray-100" value={results.foundationDepthNonConstrained} readOnly />
                <span className="ml-2">ft</span>
              </div>

              <div className="flex items-center">
                <Label className="w-32">Constrained:</Label>
                <Input className="w-24 h-8 bg-gray-100" value={results.foundationDepthConstrained} readOnly />
                <span className="ml-2">ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wind Force Calculation Table */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Wind Force Calculation Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-1 border">Height</th>
                <th className="p-1 border">Kz</th>
                <th className="p-1 border">qz</th>
                <th className="p-1 border">Ppole</th>
                <th className="p-1 border">Pluminaires</th>
                <th className="p-1 border">D*sqrt(qz)</th>
                <th className="p-1 border">cf(Effective)</th>
                <th className="p-1 border">Area</th>
                <th className="p-1 border">Force</th>
                <th className="p-1 border">Moment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-1 border">15.00</td>
                <td className="p-1 border">0.70</td>
                <td className="p-1 border">38.30</td>
                <td className="p-1 border">39.07</td>
                <td className="p-1 border">2.06</td>
                <td className="p-1 border">1.2</td>
                <td className="p-1 border">4.00</td>
                <td className="p-1 border">4.75</td>
                <td className="p-1 border">185.58</td>
                <td className="p-1 border">1461.47</td>
              </tr>
              <tr>
                <td className="p-1 border">20.00</td>
                <td className="p-1 border">0.70</td>
                <td className="p-1 border">38.30</td>
                <td className="p-1 border">39.07</td>
                <td className="p-1 border">2.06</td>
                <td className="p-1 border">1.2</td>
                <td className="p-1 border">4.00</td>
                <td className="p-1 border">1.67</td>
                <td className="p-1 border">65.12</td>
                <td className="p-1 border">1139.54</td>
              </tr>
              <tr>
                <td className="p-1 border">25.00</td>
                <td className="p-1 border">0.70</td>
                <td className="p-1 border">38.30</td>
                <td className="p-1 border">39.07</td>
                <td className="p-1 border">2.06</td>
                <td className="p-1 border">1.2</td>
                <td className="p-1 border">4.00</td>
                <td className="p-1 border">1.67</td>
                <td className="p-1 border">65.12</td>
                <td className="p-1 border">1465.13</td>
              </tr>
              <tr>
                <td className="p-1 border">30.00</td>
                <td className="p-1 border">0.70</td>
                <td className="p-1 border">38.30</td>
                <td className="p-1 border">39.07</td>
                <td className="p-1 border">0.00</td>
                <td className="p-1 border">1.2</td>
                <td className="p-1 border">0.00</td>
                <td className="p-1 border">0.00</td>
                <td className="p-1 border">0.00</td>
                <td className="p-1 border">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center mt-8">
        <Button className="gap-2 px-8 py-2" onClick={calculateResults}>
          <Calculator className="h-4 w-4" />
          Calculate Results
        </Button>
      </div>
    </Card>
  )
}
