import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/src/constans/select-options";
import { useAuthStore } from "@/src/store/auth.store";
import { useIngridientStore } from "@/src/store/ingridient.store";
import { Button, Table, TableHeader, TableColumn, TableBody, TableCell, TableRow } from "@heroui/react";

const IngridientTable = () => {
	const {ingridients, removeIngridient, isLoading} = useIngridientStore();
	const {isAuth} = useAuthStore();

	const handleDelet = async(id: string) => {
		await removeIngridient(id)
	}

	const getCategoryLabel = (value: string) => {
		const option = CATEGORY_OPTIONS.find(opt => opt.value === value)
		return option ? option.label : value
	}

	const getUnitLabel = (value: string) => {
		const option = UNIT_OPTIONS.find(opt => opt.value === value)
		return option ? option.label : value
	}

	if (!isAuth) {
		return <p>Не авторизован</p>;
	}

	return !isLoading && isAuth ? (
		<>
			<Table
				aria-label="Список ингридиентов"
				classNames={{
					wrapper: "mt-4",
					table: "w-full",
					th: "text-black",
					td: "text-black"
				}}
			>
				<TableHeader>
					<TableColumn>Название</TableColumn>
					<TableColumn>Категория</TableColumn>
					<TableColumn>Ед. изм.</TableColumn>
					<TableColumn>Цена за единицу</TableColumn>
					<TableColumn>Описание</TableColumn>
					<TableColumn>Действия</TableColumn>
				</TableHeader>
				<TableBody>
					{ingridients.map(ingridient => (
						<TableRow key={ingridient.id}>
							<TableCell>{getCategoryLabel(ingridient.category)}</TableCell>
							<TableCell>{getUnitLabel(ingridient.unit)}</TableCell>
							<TableCell>{ingridient.name}</TableCell>
							<TableCell>
								{ingridient.pricePerUnit !== null
									? `${ingridient.pricePerUnit}P`
									: "-"
								}
							</TableCell>
							<TableCell>{ingridient.description || "-"}</TableCell>
							<TableCell>
								<Button
									color="danger"
									size="sm"
									onPress={() => handleDelet(ingridient.id)}
								>
									Удалить
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	) : <p className="mt-4">Загрузка...</p>
}

export default IngridientTable;
