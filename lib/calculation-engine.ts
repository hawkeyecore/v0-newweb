"use client"

export function calculateTemplate(template: any, data: Record<string, any>) {
  // Clone the input data to avoid modifying the original
  const calculatedData = { ...data }

  try {
    // In a real implementation, you would use a proper Python-like interpreter
    // or transpiler to execute the calculation script. For this demo, we'll
    // simulate the calculation with a simple implementation.

    // Check if there's a calculation script
    if (template.scripts?.calculation) {
      // For demo purposes, we'll implement a few basic calculations
      // based on common patterns in the script

      // Example: Calculate subtotal from quantity and price
      if (calculatedData.quantity !== undefined && calculatedData.price !== undefined) {
        calculatedData.subtotal = calculatedData.quantity * calculatedData.price
      }

      // Example: Calculate tax
      if (calculatedData.subtotal !== undefined) {
        // Assume 8% tax rate as mentioned in the example script
        calculatedData.tax = calculatedData.subtotal * 0.08
      }

      // Example: Calculate total
      if (calculatedData.subtotal !== undefined && calculatedData.tax !== undefined) {
        calculatedData.total = calculatedData.subtotal + calculatedData.tax
      }

      // Example: Calculate discount
      if (calculatedData.subtotal !== undefined && calculatedData.discountRate !== undefined) {
        calculatedData.discount = calculatedData.subtotal * calculatedData.discountRate

        // Adjust total if it exists
        if (calculatedData.total !== undefined) {
          calculatedData.total -= calculatedData.discount
        }
      }
    }

    return calculatedData
  } catch (error) {
    console.error("Error in calculation engine:", error)
    return data // Return original data on error
  }
}
