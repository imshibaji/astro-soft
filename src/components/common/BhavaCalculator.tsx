import Checkbox from "@/components/ui/Checkbox";
import InputGroup from "@/components/ui/InputGroup";
import InputNumber from "@/components/ui/InputNumber";
export default function BhavaCalculator() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="flex space-x-2">
                  <InputNumber label="Day" type="number" placeholder="Day" size="2" />
                  <InputNumber label="Month" type="number" placeholder="Month" size="2" />
                  <InputNumber label="Year" type="number" placeholder="Year" size="4" />
                </div>
                <div className="flex space-x-2">
                  <InputNumber label="Hour" type="number" placeholder="Hour" size="2" />
                  <InputNumber label="Minute" type="number" placeholder="Minute" size="2" />
                </div>
                <div className="flex space-x-2">
                  <InputNumber label="TimeZoneHour" type="number" placeholder="Hour" size="2" />
                  <InputNumber label="TimeZoneMin" type="number" placeholder="Min" size="2" />
                  <Checkbox label="DST" />
                </div>
                <InputGroup label="Longitude" 
                  input1={{ type: "number", placeholder: "00", size: "4" }}
                  input2={{ type: "number", placeholder: "00", size: "4" }} 
                  checkBox={{ label: "East" }}
                />
                <InputGroup label="Latitude"
                  input1={{ type: "number", placeholder: "00", size: "4" }}
                  input2={{ type: "number", placeholder: "00", size: "4" }}
                  checkBox={{ label: "South" }}
                />
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400 focus:outline-none focus:border-teal-400 focus:text-teal-400 disabled:opacity-50 disabled:pointer-events-none">
                  Calculate Now
                </button>
            </div>
        </div>
    )
}