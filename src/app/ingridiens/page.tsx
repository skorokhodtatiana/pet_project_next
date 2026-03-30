'use client'

import IngridientTable from "@/src/components/UI/tables/ingridiets";
//import PageContent from "@/src/components/common/page-content";
import IngridientForm from "@/src/forms/ingridient.form";

const Ingridiens = () => {
	return (
		<div>
			{/* <PageContent></PageContent> */}
			<IngridientForm></IngridientForm>
			<IngridientTable></IngridientTable>
		</div>
	)
}

export default Ingridiens;
