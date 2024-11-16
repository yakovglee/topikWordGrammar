import { Tabs, ConfigProvider } from "antd";
import type { TabsProps } from "antd";

interface CustomTabsProps {
    items: TabsProps["items"];
    styled_class_name?: string;
    onChange?: (key: string) => void;
}

export const CustomTabs = ({
    items,
    styled_class_name = "tabs",
    onChange,
}: CustomTabsProps) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemSelectedColor: "#FFFFFF",
                        horizontalItemGutter: 8,
                    },
                },
            }}
        >
            <Tabs
                className={styled_class_name}
                tabPosition="top"
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </ConfigProvider>
    );
};
