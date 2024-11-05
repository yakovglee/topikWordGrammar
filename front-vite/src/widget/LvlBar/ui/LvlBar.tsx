import { CustomTabs } from "../../../shared/CustomTabs";
import { tabsLvl } from "../data/data";
import "./LvlBar.scss";

export const LvlBar = () => {
    return <CustomTabs items={tabsLvl} styled_class_name="lvlbar-tabs" />;
};
