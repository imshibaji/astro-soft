import { Container } from "@/components/ui/Container";
import { DataTable } from "@/components/ui/DataTable";
import houseLordMovesDatas from "@/data/house_lord_moves.json";
import rashiData from "@/data/rashis.json";
// import planetData from "@/data/planets.json";

const datas = houseLordMovesDatas.map((data) => {
    return {
        ...data,
        // house_lord: rashiData.find((rashi) => rashi.id === data.house_id)?.name + " - " + planetData.find((planet) => rashiData.find((rashi) => rashi.id === data.house_id)?.planet_id === planet.id)?.name,
        moved_house: rashiData.find((rashi) => rashi.id === data.move_id)?.id + '. ' + rashiData.find((rashi) => rashi.id === data.move_id)?.name
    }
})

export default function Houses() {
    return (
        <Container>
            <DataTable title="House Rashi Moves"
                url="/house-lord-moves"
                // action={{
                //     create: false,
                // }}
                initLimit={12}
                limits={[12, 24]}
                items={datas}
                headers={["name", "moved_house", "description"]}
            />
        </Container>
    );
}