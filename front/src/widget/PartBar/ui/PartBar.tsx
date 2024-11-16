import { CustomTabs } from "../../../shared/CustomTabs";
import { tabsPart } from "../data/data";
import "./PartBar.scss";

interface PartBarProps {
    onChange: (key: string) => void;
}

export const PartBar = ({ onChange }: PartBarProps) => {
    return (
        <CustomTabs
            items={tabsPart}
            styled_class_name="tabbar-tabs"
            onChange={onChange}
        />
    );
};
