import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import nakDatas from "@/data/nakshatras.json";
import planetData from "@/data/planets.json";

export default function Nakshatras(){
    const datas = nakDatas.map((data) => {
        return {
            ...data,
            lord_planet: planetData.find((planet) => planet.id === data.planet_id)?.name
        }
    })
    return (
        <Container>
            <DataTable title="Nakshatras Data"
                // action={{
                //     create: false,
                //     view: false,
                //     edit: false,
                //     delete: false
                // }}
                url="/nakshatras"
                items={datas}
                headers={["name", "lord_planet", "first_pada", "second_pada", "third_pada", "fourth_pada"]}
            />
        </Container>
    )
}