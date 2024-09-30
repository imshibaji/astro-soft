import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import houseDatas from "@/data/houses.json";
import planetData from "@/data/planets.json";
import rashiData from "@/data/rashis.json";

const datas = houseDatas.map((data) => {
    return {
        ...data,
        rashi: rashiData.find((rashi) => rashi.id === data.rashi_id)?.name,
        planet: planetData.find((planet) => planet.id === data.planet_id)?.name
    }
})

export default function Houses() {

    return (
        <Container>
            <DataTable title="Houses Data"
                url="/houses"
                // action={{
                //     create: false,
                // }}
                initLimit={12}
                limits={[12, 24]}
                items={datas}
                headers={["id","rashi","name", "planet", "description"]}
            />
        </Container>
    );
}