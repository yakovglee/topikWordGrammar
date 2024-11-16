import axios from "axios";
import { TWordData } from "../../widget/CardWord/data/types";

export const getData = async (
    pos: string,
    level: number,
    wordcount: number
): Promise<TWordData[]> => {
    const apiURL = `https://thejustiks.pythonanywhere.com`;

    try {
        const response = await axios.get(apiURL, {
            params: {
                pos,
                level,
                wordcount,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
