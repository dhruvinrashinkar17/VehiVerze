import { Card } from "@vehiverze/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@vehiverze/ui/select"
import { Button } from "@vehiverze/ui/button"

const creditAmounts = [10000, 15000, 20000]

export default function CreditsPage() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Buy Credits</h1>

          <div className="space-y-4">
            <h2 className="text-2xl">Select Your amount to be paid</h2>

            <Select>
              <SelectTrigger className="w-full h-14 text-lg">
                <SelectValue placeholder="Select Preferred Amount" />
              </SelectTrigger>
              <SelectContent>
                {creditAmounts.map((amount) => (
                  <SelectItem key={amount} value={amount.toString()} className="text-lg">
                    ₹{amount.toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="w-full h-14 text-xl hover:bg-green-700 bg-blue-600">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}


