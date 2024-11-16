import { CustomTabs } from "../../../shared/CustomTabs";
import { tabsLvl } from "../data/data";
import "./LvlBar.scss";

interface LvlBarProps {
    onChange: (lvl: string) => void;
}

export const LvlBar = ({ onChange }: LvlBarProps) => {
    return (
        <CustomTabs
            items={tabsLvl}
            styled_class_name="lvlbar-tabs"
            onChange={onChange}
        />
    );
};
