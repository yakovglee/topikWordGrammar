import axios from "axios";
import { TWordData } from "../../widget/CardWord/data/types";

export const getData = async (
    pos: string,
    lvl: number,
    wordcount: number
): Promise<TWordData[]> => {
    const apiURL = `https://thejustiks.pythonanywhere.com`;

    try {
        const response = await axios.get(apiURL, {
            params: {
                pos,
                lvl,
                wordcount,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
