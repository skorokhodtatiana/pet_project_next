import { create } from 'zustand';
import { IIngridient } from "../types/ingridient";
import { createIngridient, deleteIngridient, getIngridients } from "../actions/ingridiens";

interface IngridientState {
	ingridients: IIngridient[];
	isLoading: boolean;
	error: string | null;
	loadIngridient: () => Promise<void>;
	addIngridient: (formData: FormData) => Promise<void>;
	removeIngridient: (id: string) => Promise<void>;
}

export const useIngridientStore = create<IngridientState>((set) => ({
	ingridients: [],
	isLoading: false,
	error: null,
	loadIngridient: async() => {
		set({isLoading: true, error: null});

		try {
			const result = await getIngridients();

			if (result.success) {
				set({ingridients: result.ingridients, isLoading: false})
			} else {
				set({error: result.error, isLoading: false})
			}
		} catch (error) {
			console.log('error', error);
			set({error: 'Ошибка при загрузке ингридиентов', isLoading: false})
		}
	},
	addIngridient: async(formdata: FormData) => {
		set({isLoading: true, error: null});

		try {
			const result = await createIngridient(formdata);
			if (result.success) {
				set((state) => ({
					ingridients: [...state.ingridients, result.ingridient],
					isLoading: false
				}))
			} else {
				set({error: result.error, isLoading: false})
			}
		} catch (error) {
			console.log('error', error);
			set({error: 'Ошибка при добавлении ингридиента', isLoading: false})
		}
	},
	removeIngridient: async(id: string) => {
		set({isLoading: true, error: null});

		try {
			const result = await deleteIngridient(id);

			if (result.success) {
				set((state) => ({
					ingridients: state.ingridients.filter(el => (
						el.id ! == id
					)),
					isLoading: false
				}))
			} else {
				set({error: result.error, isLoading: false})
			}
		} catch (error) {
			console.log('error', error);
			set({error: 'Ошибка при удалении ингридиента', isLoading: false})
		}
	}
}))
