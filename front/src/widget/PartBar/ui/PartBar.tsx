import { CustomTabs } from "../../../shared/CustomTabs";
import { tabsPart } from "../data/data";
import "./PartBar.scss";

export const PartBar = () => {
    return <CustomTabs items={tabsPart} styled_class_name="tabbar-tabs" />;
};
