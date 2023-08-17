import { Schema, model, } from 'mongoose';

interface ITerm {
    name: string,
}

const searchTermSchema = new Schema<ITerm>({
    name: { type: String, required: true },
});

export const SearchTerm = model<ITerm>('SearchTerm', searchTermSchema);
